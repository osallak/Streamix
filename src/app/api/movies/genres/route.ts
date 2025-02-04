import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET() {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`,
      { next: { revalidate: 60 * 60 * 24 } } // Cache for 24 hours
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie genres' },
      { status: 500 }
    );
  }
}
