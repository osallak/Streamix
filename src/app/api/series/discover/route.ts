import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const withGenres = searchParams.get('with_genres');

        if (!withGenres) {
            return NextResponse.json(
                { error: 'Missing with_genres parameter' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${withGenres}&append_to_response=overview`,
            { next: { revalidate: 60 * 60 * 12 } } // Cache for 12 hours
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const results = data.results.map((show: any) => ({
            ...show,
            overview: show.overview || 'No description available.',
        }));
        return NextResponse.json({ ...data, results });
    } catch (error) {
        console.error('Error discovering TV shows:', error);
        return NextResponse.json(
            { error: 'Failed to discover TV shows' },
            { status: 500 }
        );
    }
}
