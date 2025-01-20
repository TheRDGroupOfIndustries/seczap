export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="animate-pulse">
        <div className="h-4 w-20 bg-gray-200 mb-6"></div>
        <div className="h-12 w-3/4 bg-gray-200 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 w-full"></div>
          <div className="h-4 bg-gray-200 w-5/6"></div>
          <div className="h-4 bg-gray-200 w-4/6"></div>
        </div>
      </div>
    </div>
  );
}
