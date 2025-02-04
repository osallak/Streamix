'use client';

import { useCallback, useState } from 'react';

export function useTrailer() {
    const [trailer, setTrailer] = useState<string | null>(null);

    const getTrailer = useCallback(async (id: number, type: 'movie' | 'tv') => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            );
            const data = await response.json();

            if (data.results?.length > 0) {
                const trailerVideo = data.results.find((video: any) => video.type === 'Trailer');
                setTrailer(trailerVideo?.key || null);
            } else {
                setTrailer(null);
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
            setTrailer(null);
        }
    }, []);

    return { trailer, getTrailer };
}
