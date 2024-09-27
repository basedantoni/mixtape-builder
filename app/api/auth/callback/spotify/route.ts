import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const body = await request.json();

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Missing required environment variables" },
      { status: 500 }
    );
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      code: body.code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Spotify API error:", errorText);
    return NextResponse.json(
      { error: `HTTP error! status: ${response.status}` },
      { status: response.status }
    );
  }

  const data = await response.json();

  cookieStore.set("spotifyAccessToken", data.access_token, {
    maxAge: 60 * 60,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  cookieStore.set("spotifyRefreshToken", data.refresh_token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return NextResponse.json({ data }, { status: 200 });
}
