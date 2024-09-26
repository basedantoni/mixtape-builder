import { CreatePlaylistForm } from "@/components/spotify/create-playlist-form";
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
    <div>
      <CreatePlaylistForm userId={user.id} />
    </div>
  );
}
