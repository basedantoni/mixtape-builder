import { SearchInput } from '@/components/spotify/search-input';
import { cookies } from 'next/headers'

export default async function Mixtapes() {
  const cookieStore = cookies()
  const spotifyAccessToken = cookieStore.get('spotifyAccessToken')
  
  if (!spotifyAccessToken) {
    return <div>Please login with Spotify</div>
  }

  return <div><SearchInput /></div>;
}