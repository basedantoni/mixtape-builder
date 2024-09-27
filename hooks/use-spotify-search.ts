import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

const getData = async (searchTerm: string) => {
  const response = await fetch(`/api/spotify/search?searchTerm=${searchTerm}`);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }
  return await response.json();
};

export const useSpotifySearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isError } = useQuery({
    queryKey: ["tracks", debouncedSearchTerm],
    queryFn: () => getData(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
  });

  return { searchTerm, setSearchTerm, data, isError };
};
