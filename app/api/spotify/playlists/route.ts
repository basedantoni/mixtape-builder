import spotifyApiHandler from "@/lib/spotify-api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    const { userId, name, description, public: isPublic, collaborative } = body;

    // Create the playlist
    const createPlaylistResponse = await spotifyApiHandler(
      `/users/${userId}/playlists`,
      "POST",
      {
        name,
        description,
        public: isPublic,
        collaborative,
      }
    );

    console.log("Playlist created:", createPlaylistResponse);

    return Response.json(createPlaylistResponse, { status: 201 });
  } catch (error) {
    console.error("Error creating playlist:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return Response.json(
      { error: "Failed to create playlist" },
      { status: 500 }
    );
  }
}
