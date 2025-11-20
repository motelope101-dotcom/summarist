// src/components/Skeleton.tsx
"use client";

import React from "react";

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-neutral-800 ${className}`}
    />
  );
}