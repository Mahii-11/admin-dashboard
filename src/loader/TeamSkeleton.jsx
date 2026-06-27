export default function TeamSkeleton() {
  return (
    <div className="animate-pulse p-6 bg-slate-200 dark:bg-zinc-900/40 rounded-2xl border border-slate-50 dark:border-zinc-800 shadow-sm flex flex-col justify-between min-h-[250px]">
      <div>
        {/* Status & Actions Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white dark:bg-zinc-800 rounded-full" />
            <div className="w-12 h-3 bg-white dark:bg-zinc-800 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-white dark:bg-zinc-800 rounded-lg" />
            <div className="w-6 h-6 bg-white dark:bg-zinc-800 rounded-lg" />
          </div>
        </div>

        {/* Avatar Placeholder */}
        <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-xl mb-4" />

        {/* Info Text Placeholders */}
        <div className="w-1/2 h-4 bg-white dark:bg-zinc-800 rounded mb-2" />
        <div className="w-1/3 h-3 bg-white dark:bg-zinc-800 rounded mb-4" />
        
        {/* Bio Paragraph Lines */}
        <div className="space-y-2">
          <div className="w-full h-2.5 bg-slate-100 dark:bg-zinc-800/60 rounded" />
          <div className="w-4/5 h-2.5 bg-slate-100 dark:bg-zinc-800/60 rounded" />
        </div>
      </div>

      {/* Social Links Footer */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800/60">
        <div className="w-16 h-3 bg-white dark:bg-zinc-800 rounded" />
        <div className="w-16 h-3 bg-white dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
}