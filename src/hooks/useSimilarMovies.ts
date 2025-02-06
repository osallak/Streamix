'use client';

import { useCallback, useState } from 'react';
import { Movie } from '@/types/movie';

export function useSimilarMovies() {
    const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

    const fetchSimilarMovies = useCallback(async (id: number) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            );
            const data = await response.json();
            setSimilarMovies(data.results || []);
        } catch (error) {
            console.error('Error fetching similar movies:', error);
            setSimilarMovies([]);
        }
    }, []);

    return { similarMovies, fetchSimilarMovies };
}
