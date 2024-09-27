import Image from "next/image";
import { Item } from "@/types";

type SearchResultsProps = {
  results: Item[];
  onSelect: (track: Item) => void;
};

export const SearchResults = ({ results, onSelect }: SearchResultsProps) => (
  <div className="absolute top-10 left-0 right-0 z-10 py-1.5 max-h-[300px] overflow-auto rounded-md border border-muted bg-background shadow-lg">
    {results.map((track: Item) => (
      <div key={track.id} className="space-y-2 px-4 py-0.5">
        <div
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer text-nowrap text-ellipsis overflow-hidden"
          onClick={() => onSelect(track)}
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
);
