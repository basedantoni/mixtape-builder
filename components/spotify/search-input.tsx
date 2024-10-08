"use client";

// hooks
import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSpotifySearch } from "@/hooks/use-spotify-search";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useStickerStore } from "@/hooks/use-sticker-store";

// components & types
import { TrackList } from "@/components/spotify/track-list";
import { SearchResults } from "@/components/spotify/search-results";
import { Item } from "@/types";

// ui
import { ClipboardIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const MIN_TRACKS = 4;
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

const getUser = async () => {
  const response = await fetch("/api/spotify/me");

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const result = await response.json();
  return result;
};

export const SearchInput = ({
  playlistId,
  playlistName,
}: {
  playlistId: string;
  playlistName: string;
}) => {
  const [tracks, setTracks] = useState<Item[]>([]);
  const [, copyToClipboard] = useCopyToClipboard();
  const { searchTerm, setSearchTerm, data, isError } = useSpotifySearch();
  const droppedStickers = useStickerStore((state) => state.droppedStickers);
  const droppableElementRect = useStickerStore(
    (state) => state.droppableElementRect
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const { data: userData } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  });

  const { mutate } = useMutation({
    mutationFn: () =>
      updatePlaylist(
        playlistId,
        tracks.map((track) => track.uri)
      ),
    onSuccess: () => {
      toast("Mixtape created", {
        action: {
          label: (
            <div className="flex items-center">
              Copy to share <ClipboardIcon className="ml-1 h-3 w-3" />
            </div>
          ),
          onClick: handleCopyToClipboard,
        },
      });
    },
  });

  const handleAddTrack = (track: Item) => {
    setTracks([...tracks, track]);
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRemoveTrack = (id: string) => {
    setTracks(tracks.filter((track) => track.id !== id));
  };

  const handleCopyToClipboard = () => {
    const shareUrl = new URL(`${window.location.origin}/share/${playlistId}`);
    shareUrl.searchParams.append("title", playlistName);
    shareUrl.searchParams.append("name", userData?.display_name ?? "A friend");
    shareUrl.searchParams.append("clientX", droppableElementRect.x.toString());
    shareUrl.searchParams.append("clientY", droppableElementRect.y.toString());
    // Add droppedStickers to the URL
    droppedStickers.forEach((sticker, index) => {
      shareUrl.searchParams.append(`sticker${index}`, JSON.stringify(sticker));
    });

    copyToClipboard(shareUrl.toString());
  };

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative flex flex-col gap-2 w-full max-w-md">
        <div className="relative">
          <Input
            type="text"
            ref={inputRef}
            placeholder="Search..."
            value={searchTerm}
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
          <SearchResults
            results={data.tracks.items}
            onSelect={handleAddTrack}
          />
        )}
        <TrackList tracks={tracks} onRemove={handleRemoveTrack} />
        {tracks.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => mutate()}
                  disabled={tracks.length < MIN_TRACKS}
                >
                  Add to your Mixtape
                </Button>
              </TooltipTrigger>
              {tracks.length < MIN_TRACKS && (
                <TooltipContent side="bottom">
                  <p>Add at least 3 tracks</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};
