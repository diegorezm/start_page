"use client";

import {Button} from "@/components/ui/button";
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-6">
      <h2 className="text-5xl font-bold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button>
          Return Home
        </Button>
      </Link>
    </div>
  )
}
