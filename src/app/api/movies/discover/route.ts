import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const withGenres = searchParams.get('with_genres');

    if (!withGenres) {
        return NextResponse.json({ error: 'Genre parameter is required' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${withGenres}&page=1`,
            { next: { revalidate: 60 } }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error discovering movies:', error);
        return NextResponse.json(
            { error: 'Failed to discover movies' },
            { status: 500 }
        );
    }
}
