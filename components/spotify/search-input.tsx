"use client";

import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Item } from "@/types";
import { useDebounce } from "@uidotdev/usehooks";

const getData = async (searchTerm: string) => {
  const response = await fetch(`/api/spotify/search?searchTerm=${searchTerm}`);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  const data = await response.json();
  return data;
};

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  const { data, isError } = useQuery({
    queryKey: ["tracks", debouncedSearchTerm],
    queryFn: () => getData(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
  });

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-md border border-muted focus:border-primary focus:ring-primary"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>
      {data && data.tracks.items.length > 0 ? (
        <div className="absolute left-0 right-0 z-10 mt-2 py-1.5 max-h-[300px] overflow-auto rounded-md border border-muted bg-background shadow-lg">
          {data.tracks.items.map((track: Item) => (
            <div className="space-y-2 px-4 py-0.5">
              <div
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer text-nowrap text-ellipsis overflow-hidden"
                onClick={() => console.log(track.id)}
                key={track.id}
              >
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={48}
                  height={48}
                  className="rounded-sm"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="text-base">{track.name}</p>
                  <div className="flex gap-0.5 text-xs font-thin text-zinc-600">
                    {track.artists.map((artist) => (
                      <p key={artist.name}>{artist.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};
