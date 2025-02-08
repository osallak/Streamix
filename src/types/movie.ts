export interface Movie {
  id: number;
  title?: string;  // for movies
  name?: string;   // for tv shows
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  release_date?: string;  // for movies
  first_air_date?: string;  // for tv shows
  vote_average: number;
  genres?: { id: number; name: string }[];
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title?: string;  // for movies
  original_name?: string;   // for tv shows
  video?: boolean;  // for movies
  media_type?: 'movie' | 'tv';  // to distinguish between movies and tv shows
  seasons?: {
    id: number;
    name: string;
    season_number: number;
    episode_count: number;
    air_date?: string;
    overview?: string;
    poster_path?: string;
  }[];  // for tv shows
}

// Helper function to get the title regardless of media type
export function getTitle(item: Movie): string {
  return item.title || item.name || '';
}

// Helper function to get the release date regardless of media type
export function getReleaseDate(item: Movie): string {
  return item.release_date || item.first_air_date || '';
}
