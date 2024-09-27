"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/get-query-client";

import type * as React from "react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <PostHogProvider client={posthog}>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
      </QueryClientProvider>
    </PostHogProvider>
  );
}
