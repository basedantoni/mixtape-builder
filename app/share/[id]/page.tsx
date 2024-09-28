import Link from "next/link";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";

import { Button } from "@/components/ui/button";
import { CassetteTape } from "lucide-react";
import { StaticMixtape } from "@/components/mixtape/static-mixtape";

import spotifyLogo from "@/public/svg/spotify.svg";
import mixtape from "@/public/img/mixtape.png";
import { Sticker } from "@/types";

type Props = {
  params: { id: string };
  searchParams: { title: string; name: string; [key: string]: string };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `You got a mixtape from ${searchParams.name}`,
    openGraph: {
      images: [
        {
          url: mixtape.src,
          width: mixtape.width,
          height: mixtape.height,
          alt: "Mixtape image",
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Share({ params, searchParams }: Props) {
  const stickers: Sticker[] = Object.entries(searchParams)
    .filter(([key]) => key.startsWith("sticker"))
    .map(([, value]) => JSON.parse(decodeURIComponent(value)));

  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      <StaticMixtape title={searchParams.title} stickers={stickers} />

      <p>{searchParams.name} made you a mixtape!</p>
      <div className="flex flex-col gap-4">
        <Link
          href={`https://open.spotify.com/playlist/${params.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="flex gap-2">
            Open in Spotify{" "}
            <Image src={spotifyLogo} alt="spotify" height={20} width={20} />
          </Button>
        </Link>
        <hr className="relative border-t-4 border-double overflow-visible text-center border-gray-300 after:relative after:top-[-14px] after:bg-white after:px-4 after:text-sm after:text-zinc-500 after:content-['or']" />
        <Link href="/" target="_blank" rel="noopener noreferrer">
          <Button className="flex gap-2">
            Make your own <CassetteTape className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
