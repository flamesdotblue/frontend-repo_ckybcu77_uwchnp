import { useCallback, useMemo, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import LinkInput from './components/LinkInput.jsx';
import VideoPreview from './components/VideoPreview.jsx';
import DownloadCard from './components/DownloadCard.jsx';
import FooterDisclaimer from './components/FooterDisclaimer.jsx';

function getYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    const v = u.searchParams.get('v');
    if (v) return v;
    const parts = u.pathname.split('/');
    return parts[parts.length - 1] || '';
  } catch {
    return '';
  }
}

function App() {
  const [link, setLink] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const timerRef = useRef(null);

  const handleFetch = useCallback(async (l) => {
    setLink(l);
    setLoading(true);
    setStatus('fetching info');
    setProgress(0);

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 900));

    const id = getYouTubeId(l) || 'dQw4w9WgXcQ';
    const mock = {
      id,
      title: 'Sample Video Title – Modern UI/UX Demo',
      channel: 'UI Studio',
      duration: '10:42',
      views: '1,234,567',
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      badges: ['Auto-detect', 'yt-dlp ready', 'Mocked'],
    };

    setInfo(mock);
    setLoading(false);
    setStatus('ready');
  }, []);

  const startDownload = useCallback((opts) => {
    if (!info) return;
    setStatus('downloading');
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);

    let p = 0;
    timerRef.current = setInterval(() => {
      p += Math.random() * 12 + 6; // accelerate a bit
      if (p >= 100) {
        p = 100;
        clearInterval(timerRef.current);
        setStatus('completed');
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 350);

    // eslint-disable-next-line no-unused-vars
    const _debugOptions = opts; // available if needed later
  }, [info]);

  const gradientOverlay = useMemo(
    () => (
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(124,58,237,0.25),transparent)]" />
    ),
    []
  );

  return (
    <div className="min-h-screen w-full bg-[#0b0b10] text-white">
      <header className="relative">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {gradientOverlay}
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200 ring-1 ring-white/20">
              <Sparkles size={16} className="text-yellow-300" /> Futuristic YouTube Downloader (UI Mock)
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Download smarter with a clean, modern interface
            </h1>
            <p className="mt-3 text-zinc-300">
              Paste a link, pick your quality and format, and go. Built with React, Tailwind, Framer Motion, and Spline.
            </p>
          </motion.div>

          <div className="mt-8">
            <LinkInput onFetch={handleFetch} />
          </div>
        </div>
      </header>

      <main className="relative z-0 mx-auto max-w-6xl px-4 pb-20">
        {loading && (
          <div className="mx-auto w-full max-w-5xl animate-pulse rounded-2xl bg-zinc-900/60 p-6 ring-1 ring-white/10">
            <div className="h-6 w-1/3 rounded bg-zinc-700" />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[320px,1fr]">
              <div className="h-40 rounded bg-zinc-800" />
              <div className="space-y-3">
                <div className="h-5 w-2/3 rounded bg-zinc-800" />
                <div className="h-5 w-1/2 rounded bg-zinc-800" />
                <div className="h-5 w-1/3 rounded bg-zinc-800" />
              </div>
            </div>
          </div>
        )}

        {!loading && info && (
          <>
            <VideoPreview info={info} />
            <div className="mt-6">
              <DownloadCard info={info} progress={progress} status={status} onDownload={startDownload} />
            </div>
          </>
        )}

        <FooterDisclaimer />
      </main>
    </div>
  );
}

export default App;
