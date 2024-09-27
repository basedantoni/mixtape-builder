import spotifyApiHandler from "@/lib/spotify-api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await spotifyApiHandler(`/me`, "GET");
    return Response.json(response);
  } catch (error) {
    console.error("Spotify API error:", error);
    return Response.json(
      { error: "Failed to fetch from Spotify API" },
      { status: 500 }
    );
  }
}
