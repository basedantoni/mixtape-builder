import spotifyApiHandler from "@/lib/spotify-api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { playlistId, uris } = body;

    // Create the playlist
    const updatePlaylistResponse = await spotifyApiHandler(
      `/playlists/${playlistId}/tracks`,
      "PUT",
      {
        uris: uris,
      }
    );

    return Response.json(updatePlaylistResponse, { status: 200 });
  } catch (error) {
    console.error("Error updating playlist:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return Response.json(
      { error: "Failed to update playlist" },
      { status: 500 }
    );
  }
}
