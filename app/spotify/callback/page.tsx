'use client'

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { z } from 'zod'

export default function Callback() {
  const searchParamsSchema = z.object({
    code: z.string(),
  })
  const searchParams = useSearchParams()
  const router = useRouter()
  const params = searchParamsSchema.parse({
    code: searchParams.get('code'),
  })
 
  const code = params.code
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    console.log('useEffect in Callback component');
    const fetchAccessToken = async () => {
      if (hasFetchedRef.current) {
        console.log('Skipping duplicate fetch');
        return;
      }
      
      try {
        console.log('Fetching access token');
        hasFetchedRef.current = true;
        const response = await fetch('/api/auth/callback/spotify', {
          method: 'POST',
          body: JSON.stringify({ code }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }
        
        console.log('Access token fetched successfully');
        // Redirect to a different page, e.g., the user's profile or dashboard
        router.push('/');
      } catch (err) {
        console.error('Failed to fetch access token', err);
        // Handle the error appropriately, e.g., redirect to an error page
        router.push('/error');
      }
    };

    fetchAccessToken();
  }, [code, router]);

  return <div>Processing your login...</div>;
}