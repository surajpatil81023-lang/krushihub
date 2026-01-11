import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const commodity = searchParams.get("commodity");
        const state = searchParams.get("state");
        const district = searchParams.get("district");

        // Use the API key from environment variables
        // Trying common names, user can ensure one of these is set in .env
        const API_KEY = process.env.DATA_GOV_API_KEY || process.env.MANDI_API_KEY;

        if (!API_KEY) {
            return NextResponse.json(
                { message: "API Configuration incomplete. Contact Admin." },
                { status: 500 }
            );
        }

        const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
        let apiUrl = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=20`;

        if (commodity) apiUrl += `&filters[commodity]=${encodeURIComponent(commodity)}`;
        if (state) apiUrl += `&filters[state]=${encodeURIComponent(state)}`;
        if (district) apiUrl += `&filters[district]=${encodeURIComponent(district)}`;

        // Sorting by date descending if possible, or just default
        // The API supports sorting? Need to check doc, but usually not straightforward.
        // We will just fetch.

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`External API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform to our internal structure just in case context needs uniform data, 
        // or return raw 'records' and let frontend handle it.
        // Let's normalize it to match our MandiRecord interface roughly for easier UI reuse.

        const records = data.records.map((r: any, index: number) => ({
            id: `gov-${index}-${Date.now()}`,
            cropName: r.commodity,
            minPrice: Number(r.min_price),
            maxPrice: Number(r.max_price),
            modalPrice: Number(r.modal_price),
            location: `${r.market}, ${r.district}, ${r.state}`,
            date: r.arrival_date,
            source: "GOV_API"
        }));

        return NextResponse.json({ records }, { status: 200 });
    } catch (error) {
        console.error("Realtime Mandi Fetch Error:", error);
        return NextResponse.json({ message: "Failed to fetch realtime data" }, { status: 500 });
    }
}
