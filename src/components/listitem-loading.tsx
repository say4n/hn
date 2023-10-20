export const Loading = () => (
  <div className="w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="grid grid-cols-6 gap-4">
          <div className="h-3 bg-slate-200 rounded col-span-4"></div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </div>
  </div>
)