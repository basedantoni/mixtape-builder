import { SearchInput } from "@/components/spotify/search-input";
import { cookies } from "next/headers";
import Image from "next/image";

const Mixtape = async ({ params }: { params: { id: string } }) => {
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
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <Image
          src="/svg/mixtape_black.svg"
          alt="mixtape"
          height={195}
          width={307}
          priority
        />
        <p className="text-2xl font-black absolute top-6 m-auto left-0 right-0 w-fit">
          {playlist.name}
        </p>
      </div>
      <div className="w-full px-4">
        <SearchInput playlistId={playlist.id} playlistName={playlist.name} />
      </div>
    </div>
  );
};

export default Mixtape;
