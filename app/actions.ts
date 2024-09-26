"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const cookieStore = cookies();

function generateRandomString(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

export async function loginSpotify() {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email playlist-modify-public";

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI || "",
    state: state,
  });

  redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}

export async function getSpotifyAccessToken(): Promise<string | undefined> {
  return cookieStore.get("spotifyAccessToken")?.value;
}
