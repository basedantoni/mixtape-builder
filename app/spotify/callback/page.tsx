"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";

export default function Callback() {
  const searchParamsSchema = z.object({
    code: z.string(),
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = searchParamsSchema.parse({
    code: searchParams.get("code"),
  });

  const code = params.code;
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (hasFetchedRef.current) {
        return;
      }

      try {
        hasFetchedRef.current = true;
        const response = await fetch("/api/auth/callback/spotify", {
          method: "POST",
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }

        // Redirect to a different page, e.g., the user's profile or dashboard
        router.push("/");
      } catch (err) {
        console.error("Failed to fetch access token", err);
        // Handle the error appropriately, e.g., redirect to an error page
        router.push("/error");
      }
    };

    fetchAccessToken();
  }, [code, router]);

  return <div>Processing your login...</div>;
}
