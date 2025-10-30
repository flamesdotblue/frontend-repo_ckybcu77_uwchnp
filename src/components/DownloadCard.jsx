import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, Settings, Subtitles, Youtube, Music2 } from 'lucide-react';

const qualities = ['Auto', '144p', '360p', '480p', '720p', '1080p', '4K', '8K'];
const languages = ['Auto', 'English', 'Spanish', 'Hindi', 'French', 'German', 'Japanese'];
const audioFormats = ['mp3', 'm4a', 'opus', 'aac', 'wav'];
const videoCodecs = ['h264', 'vp9', 'av1'];

export default function DownloadCard({ info, progress = 0, status = 'idle', onDownload }) {
  const [quality, setQuality] = useState('Auto');
  const [mode, setMode] = useState('video+audio');
  const [lang, setLang] = useState('Auto');
  const [subtitles, setSubtitles] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filename, setFilename] = useState('%(title)s');
  const [audioFmt, setAudioFmt] = useState('mp3');
  const [videoCodec, setVideoCodec] = useState('h264');

  const isDownloading = status === 'downloading';

  const options = useMemo(() => ({
    quality,
    mode,
    language: lang,
    subtitles,
    filename,
    audioFormat: audioFmt,
    videoCodec,
  }), [quality, mode, lang, subtitles, filename, audioFmt, videoCodec]);

  if (!info) return null;

  return (
    <motion.div
      className="mx-auto w-full max-w-5xl rounded-2xl bg-zinc-900/60 p-4 md:p-6 ring-1 ring-white/10 backdrop-blur-md shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-300 mb-1">Download Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('video+audio')}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 ring-1 ring-white/10 transition-colors ${mode==='video+audio' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}`}
              >
                <Youtube size={16} /> Video + Audio
              </button>
              <button
                onClick={() => setMode('audio')}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 ring-1 ring-white/10 transition-colors ${mode==='audio' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}`}
              >
                <Music2 size={16} /> Audio Only
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Quality</label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full rounded-xl bg-zinc-800 px-3 py-2 text-white ring-1 ring-white/10 focus:outline-none"
              >
                {qualities.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-zinc-300 mb-1">Language</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full rounded-xl bg-zinc-800 px-3 py-2 text-white ring-1 ring-white/10 focus:outline-none"
              >
                {languages.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <input id="subs" type="checkbox" className="accent-red-600" checked={subtitles} onChange={(e) => setSubtitles(e.target.checked)} />
              <label htmlFor="subs" className="text-sm text-zinc-300 inline-flex items-center gap-2"><Subtitles size={16}/> Include subtitles (if available)</label>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"
              onClick={() => setShowAdvanced((s) => !s)}
            >
              <Settings size={16} /> Advanced Settings
              <ChevronDown size={16} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm text-zinc-300 mb-1">Filename pattern</label>
                      <input
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        className="w-full rounded-xl bg-zinc-800 px-3 py-2 text-white ring-1 ring-white/10 focus:outline-none"
                        placeholder="%(title)s"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-300 mb-1">Audio format</label>
                      <select
                        value={audioFmt}
                        onChange={(e) => setAudioFmt(e.target.value)}
                        className="w-full rounded-xl bg-zinc-800 px-3 py-2 text-white ring-1 ring-white/10 focus:outline-none"
                      >
                        {audioFormats.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-300 mb-1">Video codec</label>
                      <select
                        value={videoCodec}
                        onChange={(e) => setVideoCodec(e.target.value)}
                        className="w-full rounded-xl bg-zinc-800 px-3 py-2 text-white ring-1 ring-white/10 focus:outline-none"
                      >
                        {videoCodecs.map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div className="rounded-xl bg-zinc-800/60 p-4 ring-1 ring-white/10">
            <h4 className="text-zinc-200 font-medium mb-2">Summary</h4>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li><span className="text-zinc-300">Mode:</span> {mode}</li>
              <li><span className="text-zinc-300">Quality:</span> {quality}</li>
              <li><span className="text-zinc-300">Language:</span> {lang}</li>
              <li><span className="text-zinc-300">Subtitles:</span> {subtitles ? 'On' : 'Off'}</li>
              <li><span className="text-zinc-300">Filename:</span> {filename}.{mode === 'audio' ? audioFmt : 'mp4'}</li>
              {mode !== 'audio' && (
                <li><span className="text-zinc-300">Video codec:</span> {videoCodec}</li>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <button
              disabled={isDownloading}
              onClick={() => onDownload?.(options)}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-colors ${isDownloading ? 'bg-zinc-700 text-zinc-300' : 'bg-red-600 text-white hover:bg-red-500'}`}
            >
              <Download size={18} /> {isDownloading ? 'Downloading...' : 'Download Now'}
            </button>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800 ring-1 ring-white/10">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-zinc-400">Status: {status}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
