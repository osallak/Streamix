import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET() {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=overview`,
      { next: { revalidate: 60 * 60 * 6 } } // Cache for 6 hours
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
    console.error('Error fetching popular TV shows:', error);
    return NextResponse.json(
      { error: 'Failed to fetch popular TV shows' },
      { status: 500 }
    );
  }
}
