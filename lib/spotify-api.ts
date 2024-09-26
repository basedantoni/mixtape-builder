import { cookies } from "next/headers";

const spotifyApiHandler = async (
  apiPath: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
) => {
  const cookieStore = cookies();
  const spotifyAccessToken = cookieStore.get("spotifyAccessToken")?.value;

  if (!spotifyAccessToken) {
    throw new Error("Spotify token not found");
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1${apiPath}`, {
      method,
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
        "Content-Type": "application/json",
      },
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error("Spotify API request failed");
    }

    return response.json();
  } catch (error) {
    console.error("Spotify API error:", error);
    throw error;
  }
};

export default spotifyApiHandler;
