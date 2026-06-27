export default  function WhyChooseSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="border border-accent/10 rounded-xl bg-slate-200 p-6 flex gap-6 items-start animate-pulse"
        >
          {/* Icon Box Skeleton */}
          <div className="w-16 h-16 rounded-xl bg-muted flex-shrink-0" />

          {/* Content Area Skeleton */}
          <div className="flex-1 space-y-3 min-w-0">
            {/* Title */}
            <div className="h-6 bg-muted rounded-md w-1/4" />
            
            {/* Description Lines */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded-md w-full" />
              <div className="h-4 bg-muted rounded-md w-5/6" />
            </div>

            {/* Link Text */}
            <div className="h-3 bg-muted rounded-md w-20" />

            {/* Meta Info Date */}
            <div className="h-3 bg-muted rounded-md w-32" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-20 h-9 bg-muted rounded-lg" />
            <div className="w-24 h-9 bg-muted rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}