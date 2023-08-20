'use client'

import { cn } from "@/lib/utils";
import React from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav 
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >

    </nav>
  )
} 