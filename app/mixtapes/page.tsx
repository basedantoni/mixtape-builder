import { CreatePlaylistForm } from "@/components/spotify/create-playlist-form";
import { Card } from "@/components/ui/card";
import { cookies } from "next/headers";

export default async function Mixtapes() {
  const cookieStore = cookies();
  const spotifyAccessToken = cookieStore.get("spotifyAccessToken");

  const data = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${spotifyAccessToken?.value}`,
      "Content-Type": "application/json",
    },
  });

  const user = await data.json();

  return (
    <div className="flex justify-center w-full">
      <Card className="px-4 py-6 max-w-lg w-72 md:w-[32rem]">
        <CreatePlaylistForm userId={user.id} />
      </Card>
    </div>
  );
}
