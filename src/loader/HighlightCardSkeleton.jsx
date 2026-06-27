export default function HighlightCardSkeleton() {
  return (
    // 🌓 ডাইনামিক কন্টেইনার: লাইট মোডে হোয়াইট/সফট শ্যাডো, ডার্ক মোডে ডার্ক কার্বন লুক
    <div className="bg-slate-200 dark:bg-zinc-900/50 rounded-2xl border border-slate-100 dark:border-zinc-800 p-5 space-y-4 animate-pulse shadow-sm">
      
      {/* 📸 ইমেজের প্লেসহোল্ডার: দুই মোডেই পারফেক্ট ব্লেন্ড হবে */}
      <div className="w-full h-44 rounded-xl bg-slate-100 dark:bg-zinc-800 relative overflow-hidden" />
      
      {/* 📝 টাইটেল ও টেক্সট লাইন্স */}
      <div className="space-y-2 py-1">
        <div className="h-5 bg-slate-100 dark:bg-zinc-800 rounded-md w-5/6" />
        <div className="h-5 bg-slate-50 dark:bg-zinc-800/60 rounded-md w-1/2" />
      </div>
      
      {/* ⚙️ ফুটার বাটন প্যানেল */}
      <div className="flex gap-2 pt-2 border-t border-slate-50 dark:border-zinc-800/50">
        <div className="h-9 bg-slate-100/80 dark:bg-zinc-800/80 rounded-xl flex-1" />
        <div className="h-9 bg-slate-100/80 dark:bg-zinc-800/80 rounded-xl w-9" />
      </div>
    </div>
  );
}