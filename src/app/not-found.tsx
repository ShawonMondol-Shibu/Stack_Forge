"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full min-h-dvh flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <span className="text-9xl  text-primary font-bold leading-20 tracking-">
          404
        </span>
          <span>the page is not found</span>

        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    </div>
  );
}
