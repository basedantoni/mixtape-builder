import { SearchInput } from "@/components/spotify/search-input";
import { cookies } from "next/headers";
import { Mixtape } from "@/components/mixtape";

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
      <Mixtape title={playlist.name} />
      <div className="flex flex-col items-center w-[320px] max-w-lg">
        <SearchInput playlistId={playlist.id} playlistName={playlist.name} />
      </div>
    </div>
  );
};

export default MixtapePage;
