"""Build listening audio for content/listening*.js with free, local TTS.

Engines (both run offline on CPU, no API, no cost):
  - Kokoro-82M (Apache-2.0) via kokoro-onnx: British (bf_/bm_) and American (af_/am_) voices
  - MeloTTS (MIT), English model, speaker EN-AU: Australian voice
Output: audio/listening/<id>.mp3 (mono, 24 kHz, 48 kbps) + content/listening-audio.js
(start time of every line, so the page can highlight lines and start from any line).

Usage: python tools/tts_build.py /path/to/listening.json /path/to/kokoro-v1.0.onnx /path/to/voices-v1.0.bin
"""
import json, re, subprocess, sys, os, tempfile
import numpy as np, soundfile as sf, librosa

SR = 24000
GAP_SAME, GAP_TURN, LEAD = 0.45, 0.6, 0.35

# accent per set; voice per speaker. AU = MeloTTS EN-AU (female); partner voices are Kokoro.
CAST = {
 # British
 'L01': ('GB', {'A':'bm_george','B':'bf_emma'}),   'L06': ('GB', {'A':'bm_fable','B':'bf_isabella'}),
 'L13': ('GB', {'A':'bf_emma','B':'bm_daniel'}),   'L19': ('GB', {'A':'bf_alice','B':'bm_george'}),
 'L03': ('GB', {'A':'bf_emma'}), 'L07': ('GB', {'A':'bm_george'}), 'L16': ('GB', {'A':'bm_fable'}), 'L22': ('GB', {'A':'bf_isabella'}),
 # Australian
 'L02': ('AU', {'A':'bm_daniel','B':'melo_au'}),   'L09': ('AU', {'A':'melo_au','B':'am_adam'}),
 'L14': ('AU', {'A':'melo_au','B':'bm_fable'}),    'L20': ('AU', {'A':'melo_au','B':'am_puck'}),
 'L04': ('AU', {'A':'melo_au'}), 'L10': ('AU', {'A':'melo_au'}), 'L17': ('AU', {'A':'melo_au'}), 'L23': ('AU', {'A':'melo_au'}),
 # American
 'L05': ('US', {'A':'af_heart','B':'am_puck'}),    'L11': ('US', {'A':'am_adam','B':'af_sarah'}),
 'L15': ('US', {'A':'am_fenrir','B':'af_heart'}),  'L21': ('US', {'A':'am_puck','B':'af_bella'}),
 'L08': ('US', {'A':'af_heart'}), 'L12': ('US', {'A':'am_adam'}), 'L18': ('US', {'A':'af_sarah'}), 'L24': ('US', {'A':'am_fenrir'}),
}
DIG = dict(zip('0123456789', ['oh','one','two','three','four','five','six','seven','eight','nine']))

def norm(t):
    """Spoken form only; on-screen text stays as written."""
    t = re.sub(r'\b((?:[A-Z]-){2,}[A-Z])\b', lambda m: ', '.join(m.group(1).split('-')), t)  # H-A-R-L-O-W
    t = re.sub(r'\b0\d{4} \d{3} \d{3}\b', lambda m: ', '.join(' '.join(DIG[c] for c in g) for g in m.group().split()), t)  # phone
    t = re.sub(r'\bLP(\d{4})\b', lambda m: 'L P, ' + ' '.join(DIG[c] for c in m.group(1)), t)
    t = re.sub(r'\bLP\b', 'L P', t)
    t = re.sub(r'\b(\d) (\d) (\d) (\d)\b', lambda m: ', '.join(DIG[c] for c in m.groups()), t)
    t = re.sub(r's\.chen88', 's dot chen, eight eight,', t)
    t = re.sub(r'\b3B\b', 'three B', t)
    t = re.sub(r'\bOK\b', 'okay', t)
    t = re.sub(r'£(\d+)', r'\1 pounds', t)
    t = t.replace('—', ', ').replace('–', ', ')
    return t

def rms_norm(y, target_db=-20.0):
    r = np.sqrt(np.mean(y**2)) + 1e-9
    y = y * (10**(target_db/20) / r)
    return np.clip(y, -0.98, 0.98)

def trim(y):
    yt, _ = librosa.effects.trim(y, top_db=40)
    return yt

def main(src, onnx, vbin):
    from kokoro_onnx import Kokoro
    from melo.api import TTS
    K = Kokoro(onnx, vbin)
    M = TTS(language='EN', device='cpu'); AU = M.hps.data.spk2id['EN-AU']
    sets = json.load(open(src)); meta = {}
    os.makedirs('audio/listening', exist_ok=True)
    for s in sets:
        accent, cast = CAST[s['id']]
        out = [np.zeros(int(LEAD*SR), dtype=np.float32)]; starts = []; pos = LEAD; prev = None
        for sp, text in s['lines']:
            v = cast[sp]; spoken = norm(text)
            if v == 'melo_au':
                with tempfile.NamedTemporaryFile(suffix='.wav') as f:
                    M.tts_to_file(spoken, AU, f.name, speed=0.95, quiet=True)
                    y, sr = sf.read(f.name, dtype='float32')
                y = librosa.resample(y, orig_sr=sr, target_sr=SR)
            else:
                y, sr = K.create(spoken, voice=v, speed=0.95, lang='en-gb' if v[0] == 'b' else 'en-us')
                y = np.asarray(y, dtype=np.float32)
            y = rms_norm(trim(y))
            if prev is not None:
                g = GAP_TURN if sp != prev else GAP_SAME
                out.append(np.zeros(int(g*SR), dtype=np.float32)); pos += g
            starts.append(round(pos, 2)); out.append(y); pos += len(y)/SR; prev = sp
        out.append(np.zeros(int(0.5*SR), dtype=np.float32))
        wav = np.concatenate(out)
        with tempfile.NamedTemporaryFile(suffix='.wav') as f:
            sf.write(f.name, wav, SR)
            subprocess.run(['ffmpeg','-y','-loglevel','error','-i',f.name,'-ac','1','-ar',str(SR),'-codec:a','libmp3lame','-b:a','48k',
                            '-metadata','title='+s['id']+' '+s['title'],'-metadata','artist=incidental.site (synthetic voice)',
                            'audio/listening/%s.mp3' % s['id']], check=True)
        meta[s['id']] = {'src':'audio/listening/%s.mp3' % s['id'], 'dur':round(len(wav)/SR, 2), 't':starts,
                         'accent':accent, 'voices':cast}
        print(s['id'], accent, round(len(wav)/SR,1), 's', flush=True)
    with open('content/listening-audio.js','w') as f:
        f.write('/* 听力音频：tools/tts_build.py 生成（Kokoro-82M + MeloTTS EN-AU，本机离线合成，非官方录音）。\n'
                '   t = 每句开始秒数；accent = GB/AU/US；voices = 每个说话人的音色。 */\n')
        f.write('window.IELTS_LISTENING_AUDIO = ' + json.dumps(meta, separators=(',',':')) + ';\n')

if __name__ == '__main__':
    main(*sys.argv[1:4])
