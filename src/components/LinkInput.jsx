import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as LinkIcon, Search } from 'lucide-react';

export default function LinkInput({ onFetch, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onFetch?.(value.trim());
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative mx-auto w-full max-w-3xl"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-stretch gap-2 rounded-2xl bg-zinc-900/60 p-2 backdrop-blur-md ring-1 ring-white/10 shadow-lg">
        <div className="flex items-center px-3 text-zinc-400">
          <LinkIcon size={18} />
        </div>
        <input
          type="url"
          required
          placeholder="Paste YouTube video or playlist link..."
          className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-400 focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500 transition-colors"
        >
          <Search size={18} />
          Fetch
        </button>
      </div>
      <p className="mt-2 text-center text-sm text-zinc-400">
        Tip: You can paste playlist URLs too. We will mock details for now.
      </p>
    </motion.form>
  );
}
