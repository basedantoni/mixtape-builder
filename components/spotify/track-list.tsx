import Image from "next/image";
import { Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Item } from "@/types";

type TrackListProps = {
  tracks: Item[];
  onRemove: (id: string) => void;
};

export const TrackList = ({ tracks, onRemove }: TrackListProps) => (
  <div className="flex flex-col gap-2 max-h-96 overflow-auto">
    {tracks.map((track) => (
      <div key={track.id} className="flex items-center justify-between">
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
        <Button onClick={() => onRemove(track.id)} variant="ghost" size="icon">
          <Minus className="h-4 w-4" />
        </Button>
      </div>
    ))}
  </div>
);
