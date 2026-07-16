export default function RoomSkeleton() {
  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-6">
        <div className="h-3 w-24 bg-slate-200 rounded" />
        <div className="h-6 w-3/4 bg-slate-200 rounded mt-4" />
        <div className="h-4 w-1/2 bg-slate-200 rounded mt-3" />

        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="h-14 bg-slate-200 rounded-xl" />
          <div className="h-14 bg-slate-200 rounded-xl" />
          <div className="h-14 bg-slate-200 rounded-xl" />
        </div>

        <div className="h-4 w-full bg-slate-200 rounded mt-6" />
        <div className="h-4 w-4/5 bg-slate-200 rounded mt-2" />

        <div className="flex justify-between items-center mt-8">
          <div className="h-5 w-28 bg-slate-200 rounded" />
          <div className="h-10 w-28 bg-slate-200 rounded-full" />
        </div>
      </div>
    </article>
  );
}