import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const today = new Date().toISOString().split('T')[0];
    const startDate = searchParams.get('start_date') || today;
    const endDate = searchParams.get('end_date') || today;

    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`NASA API returned status: ${res.status}`);
        }

        const data = await res.json();

        // Enrich with Risk Scores and Alert Metadata
        if (data.near_earth_objects) {
            Object.keys(data.near_earth_objects).forEach(date => {
                data.near_earth_objects[date] = data.near_earth_objects[date].map((neo: any) => {
                    const diameter = neo.estimated_diameter.meters.estimated_diameter_max;
                    const missDistance = parseFloat(neo.close_approach_data[0].miss_distance.kilometers);
                    const isHazardous = neo.is_potentially_hazardous_asteroid;

                    // Risk Score Calculation (0-100)
                    // base score from diameter (max 40 points for 2km+)
                    let score = Math.min((diameter / 2000) * 40, 40);

                    // miss distance score (max 40 points for < 100k km)
                    // closer = higher score
                    const distanceScore = Math.max(0, 40 * (1 - missDistance / 10000000));
                    score += distanceScore;

                    // hazardous multiplier
                    if (isHazardous) score += 20;

                    const finalScore = Math.min(Math.round(score), 100);

                    return {
                        ...neo,
                        risk_score: finalScore,
                        alert_level: finalScore > 75 ? 'CRITICAL' : finalScore > 50 ? 'WARNING' : 'MODERATE'
                    };
                });
            });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
