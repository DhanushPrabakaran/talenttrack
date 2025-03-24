import React from "react";

const BlogSuspense: React.FC = () => {
  return (
    <div className="p-4 animate-pulse container mx-auto px-4 py-20 max-w-screen-lg space-y-10">
      {/* Title Skeleton */}
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-3/4"></div>

      {/* Subtitle Skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>

      {/* Content Skeleton Lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full max-w-xl  p-2 "></div>
      </div>

      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>

      {/* Content Skeleton Lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full max-w-xl  p-2 "></div>
      </div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>

      {/* Content Skeleton Lines */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full max-w-xl  p-2 "></div>
      </div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>

      {/* Content Skeleton Lines */}
    </div>
  );
};

export default BlogSuspense;
