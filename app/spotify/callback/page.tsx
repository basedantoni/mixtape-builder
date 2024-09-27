"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";

const CallbackContent = () => {
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

        router.push("/");
      } catch (err) {
        console.error("Failed to fetch access token", err);
        router.push("/error");
      }
    };

    fetchAccessToken();
  }, [code, router]);

  return <div>Processing your login...</div>;
};

export default function Callback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
