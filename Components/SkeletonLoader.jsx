import React from "react";

export const CardSkeleton = () => {
  return (
    <div className="w-[330px] sm:max-w-[300px] bg-white dark:bg-zinc-900 border border-black dark:border-zinc-800 shadow-[-7px_7px_0px_#000000] dark:shadow-[-7px_7px_0px_#ffffff] p-5 space-y-4 animate-pulse">
      {/* Thumbnail Area */}
      <div className="w-full h-[180px] bg-slate-200 dark:bg-zinc-800 border-b border-black dark:border-zinc-800 -mx-5 -mt-5"></div>
      
      {/* Category Pill */}
      <div className="w-20 h-6 bg-slate-200 dark:bg-zinc-800 inline-block"></div>
      
      {/* Title Lines */}
      <div className="space-y-2">
        <div className="w-full h-5 bg-slate-200 dark:bg-zinc-800"></div>
        <div className="w-3/4 h-5 bg-slate-200 dark:bg-zinc-800"></div>
      </div>
      
      {/* Description Line */}
      <div className="w-full h-12 bg-slate-200 dark:bg-zinc-800"></div>
      
      {/* Read More link */}
      <div className="w-24 h-4 bg-slate-200 dark:bg-zinc-800"></div>
    </div>
  );
};

export const TableRowSkeleton = ({ cols = 4 }) => {
  return (
    <tr className="bg-white dark:bg-zinc-900 animate-pulse border-b border-black dark:border-zinc-800">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-5">
          <div className="h-5 bg-slate-200 dark:bg-zinc-800 w-full"></div>
        </td>
      ))}
    </tr>
  );
};

export const DetailSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8 max-w-[800px] mx-auto mt-[-100px] mb-10 px-4">
      {/* Cover Image */}
      <div className="w-full aspect-video bg-slate-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-800 shadow-lg"></div>
      
      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="w-full h-6 bg-slate-200 dark:bg-zinc-800"></div>
        <div className="w-full h-6 bg-slate-200 dark:bg-zinc-800"></div>
        <div className="w-5/6 h-6 bg-slate-200 dark:bg-zinc-800"></div>
        <div className="w-2/3 h-6 bg-slate-200 dark:bg-zinc-800"></div>
      </div>
      
      {/* Divider and Share Block */}
      <div className="border-t border-slate-300 dark:border-zinc-800 pt-6">
        <div className="w-48 h-4 bg-slate-200 dark:bg-zinc-800 mb-4"></div>
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-zinc-800"></div>
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-zinc-800"></div>
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-zinc-800"></div>
        </div>
      </div>
    </div>
  );
};
