"use client";

import Image from "next/image";
import { useState } from "react";
import { Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Item } from "@/types";
import { Button } from "../ui/button";
import { useSpotifySearch } from "@/hooks/use-spotify-search";

const MIN_TRACKS = 3;
const MAX_TRACKS = 20;

const updatePlaylist = async (playlistId: string, uris: string[]) => {
  const response = await fetch("/api/spotify/playlists", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playlistId,
      uris,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update playlist");
  }

  const result = await response.json();
  return result;
};

export const SearchInput = ({ playlistId }: { playlistId: string }) => {
  const [tracks, setTracks] = useState<Item[]>([]);

  const { searchTerm, setSearchTerm, data, isError } = useSpotifySearch();

  const { mutate } = useMutation({
    mutationFn: () =>
      updatePlaylist(
        playlistId,
        tracks.map((track) => track.uri)
      ),
  });

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="relative flex flex-col gap-2 w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-md border border-muted focus:border-primary focus:ring-primary"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-24 h-4 text-end align-bottom center text-muted-foreground">
          <p className="text-xs">
            {tracks.length} of {MAX_TRACKS} tracks
          </p>
        </div>
      </div>
      {data && data.tracks.items.length > 0 && (
        <div className="absolute top-10 left-0 right-0 z-10 py-1.5 max-h-[300px] overflow-auto rounded-md border border-muted bg-background shadow-lg">
          {data.tracks.items.map((track: Item) => (
            <div key={track.id} className="space-y-2 px-4 py-0.5">
              <div
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer text-nowrap text-ellipsis overflow-hidden"
                onClick={() => {
                  setTracks([...tracks, track]);
                  setSearchTerm("");
                }}
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
      )}
      <div className="flex flex-col gap-2 max-h-96 overflow-auto">
        {tracks.map((track) => (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-nowrap text-ellipsis overflow-hidden">
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
            <Button
              onClick={() =>
                setTracks(
                  tracks.filter((stateTrack) => stateTrack.id != track.id)
                )
              }
              variant="ghost"
              size="icon"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      {tracks.length > 0 && (
        <Button onClick={() => mutate()} disabled={tracks.length < MIN_TRACKS}>
          Add to your Mixtape
        </Button>
      )}
    </div>
  );
};
