import { NextRequest } from "next/server";
import spotifyApiHandler from "@/lib/spotify-api";

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get("searchTerm");

  if (!searchTerm) {
    return Response.json({ error: "Search term is required" }, { status: 400 });
  }

  try {
    const response = await spotifyApiHandler(
      `/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`,
      "GET"
    );
    return Response.json(response);
  } catch (error) {
    console.error("Spotify API error:", error);
    return Response.json(
      { error: "Failed to fetch from Spotify API" },
      { status: 500 }
    );
  }
}
