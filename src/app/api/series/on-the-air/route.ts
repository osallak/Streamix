import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET() {
    try {
        // Get current year
        const currentYear = new Date().getFullYear();

        const response = await fetch(
            `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&first_air_date_year=${currentYear}&sort_by=popularity.desc`,
            { next: { revalidate: 60 * 60 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        // Ensure each show has the required fields and is from recent years
        const results = data.results
            .filter((show: any) => {
                const airDate = show.first_air_date;
                if (!airDate) return false;
                const showYear = parseInt(airDate.split('-')[0]);
                // Include shows from the last 2 years
                return showYear >= currentYear - 1;
            })
            .map((show: any) => ({
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
