import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const params = await context.params;
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'Missing show ID' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,similar,videos,overview`,
      { next: { revalidate: 60 * 60 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    // Ensure we have all required fields
    return NextResponse.json({
      ...data,
      overview: data.overview || 'No description available.',
      media_type: 'tv'
    });
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TV show details' },
      { status: 500 }
    );
  }
}
