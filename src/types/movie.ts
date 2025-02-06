export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  video: boolean;
}
