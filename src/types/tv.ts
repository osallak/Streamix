export interface TVShowDetails {
    id: number;
    name: string;
    overview: string;
    first_air_date: string;
    poster_path?: string;
    backdrop_path?: string;
    vote_average: number;
    number_of_seasons: number;
    number_of_episodes: number;
    seasons: Season[];
    genres: Genre[];
    status: string;
    tagline?: string;
    type: string;
    created_by: Creator[];
    networks: Network[];
    production_companies: ProductionCompany[];
}

interface Season {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_count: number;
    poster_path?: string;
    season_number: number;
}

interface Genre {
    id: number;
    name: string;
}

interface Creator {
    id: number;
    name: string;
    profile_path?: string;
}

interface Network {
    id: number;
    name: string;
    logo_path?: string;
    origin_country: string;
}

interface ProductionCompany {
    id: number;
    name: string;
    logo_path?: string;
    origin_country: string;
}
