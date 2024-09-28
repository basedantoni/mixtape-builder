import { cookies } from "next/headers";

import { SearchInput } from "@/components/spotify/search-input";
import { StickerToolbar } from "@/components/mixtape/sticker-toolbar";
import { DroppableMixtape } from "@/components/mixtape/droppable-mixtape";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sticker } from "lucide-react";
import { Button } from "@/components/ui/button";

const MixtapePage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const spotifyAccessToken = cookieStore.get("spotifyAccessToken");

  const fetchPlaylist = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken?.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch playlist");
    }
    return response.json();
  };

  const playlist = await fetchPlaylist();

  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      <DroppableMixtape title={playlist.name} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <Sticker className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom">
          <DropdownMenuLabel className="text-center">
            Drag & Drop
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <StickerToolbar />
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-col items-center w-[320px] max-w-lg">
        <SearchInput playlistId={playlist.id} playlistName={playlist.name} />
      </div>
    </div>
  );
};

export default MixtapePage;
