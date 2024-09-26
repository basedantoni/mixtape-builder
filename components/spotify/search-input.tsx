'use client';

import { Input } from '@/components/ui/input';
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from 'react';

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>([]);

  console.log("DOCUMENT", document.cookie)

  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    const searchSpotify = async () => {
      let results = [];
      setIsSearching(true);
      if (debouncedSearchTerm) {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${debouncedSearchTerm}&type=track&limit=10`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        results = data.tracks.items.map((item) => item.name);
      }
      setResults(results);
      setIsSearching(false);
    };

    searchSpotify();
  }, [debouncedSearchTerm]);

  return (
    <>
      <Input
        type='text' 
        placeholder='Search for a song' 
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </>
  );
};