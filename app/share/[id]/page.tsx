import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Share({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { title: string; name: string };
}) {
  return (
    <div>
      <p>{searchParams.name} made you a mixtape!</p>
      <Link
        href={`https://open.spotify.com/playlist/${params.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>Open in Spotify</Button>
      </Link>
    </div>
  );
}
