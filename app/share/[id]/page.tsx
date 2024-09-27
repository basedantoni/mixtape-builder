import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Mixtape } from "@/components/mixtape";
import { CassetteTape } from "lucide-react";

export default async function Share({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { title: string; name: string };
}) {
  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      <p>{searchParams.name} made you a mixtape!</p>
      <Mixtape title={searchParams.title} />

      <div className="flex flex-col gap-4">
        <Link
          href={`https://open.spotify.com/playlist/${params.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="flex gap-2">
            Open in Spotify{" "}
            <Image
              src="/svg/spotify.svg"
              alt="spotify"
              height={20}
              width={20}
            />
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
