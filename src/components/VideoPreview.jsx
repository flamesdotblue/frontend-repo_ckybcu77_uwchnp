import { motion } from 'framer-motion';

export default function VideoPreview({ info }) {
  if (!info) return null;

  return (
    <motion.div
      className="mx-auto w-full max-w-5xl rounded-2xl bg-zinc-900/60 p-4 md:p-6 ring-1 ring-white/10 backdrop-blur-md shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[320px,1fr]">
        <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
          <img
            src={info.thumbnail}
            alt={info.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-white line-clamp-2">{info.title}</h3>
            <p className="mt-1 text-sm text-zinc-400">
              {info.channel} • {info.duration} • {info.views} views
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {info.badges?.map((b) => (
              <span key={b} className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300 ring-1 ring-white/10">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
