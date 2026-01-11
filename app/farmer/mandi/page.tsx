"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Search, MapPin, CalendarDays, TrendingUp, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/app/lib/utils";

export default function MandiPricesPage() {
    const { mandiRecords, fetchRealTimeMandiRecords } = useApp();
    const [searchQuery, setSearchQuery] = useState("");

    // Live Search State
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [liveCommodity, setLiveCommodity] = useState("");
    const [liveState, setLiveState] = useState("");
    const [liveRecords, setLiveRecords] = useState<any[]>([]); // Using any for flexibility or MandiRecord if adapted
    const [loadingLive, setLoadingLive] = useState(false);
    const [hasSearchedLive, setHasSearchedLive] = useState(false);

    const filteredRecords = useMemo(() => {
        return mandiRecords.filter(item =>
            item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [mandiRecords, searchQuery]);

    const handleLiveSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingLive(true);
        setHasSearchedLive(true);
        const data = await fetchRealTimeMandiRecords(liveCommodity, liveState);
        setLiveRecords(data);
        setLoadingLive(false);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp className="h-8 w-8 text-green-600" />
                            {isLiveMode ? "Live Government Rates" : "Mandi Prices"}
                        </h1>
                        <p className="text-gray-500">
                            {isLiveMode
                                ? "Real-time data from api.data.gov.in"
                                : "Locally saved market rates for your crops."}
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsLiveMode(!isLiveMode)}
                        variant={isLiveMode ? "secondary" : "default"}
                        className={isLiveMode ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-green-600 hover:bg-green-700"}
                    >
                        {isLiveMode ? "View Saved Records" : "Check Live Rates"}
                    </Button>
                </div>

                {isLiveMode ? (
                    /* Live Mode Search */
                    <Card className="border-green-100 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-green-800">Search Live Market Data</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLiveSearch} className="flex flex-col md:flex-row gap-4 items-end">
                                <div className="space-y-2 flex-1 w-full">
                                    <label className="text-sm font-medium">Crop Name (Commodity)</label>
                                    <Input
                                        placeholder="e.g. Onion, Wheat, Rice"
                                        value={liveCommodity}
                                        onChange={e => setLiveCommodity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2 flex-1 w-full">
                                    <label className="text-sm font-medium">State</label>
                                    <Input
                                        placeholder="e.g. Maharashtra, Punjab"
                                        value={liveState}
                                        onChange={e => setLiveState(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" disabled={loadingLive} className="bg-blue-600 hover:bg-blue-700 min-w-[120px]">
                                    {loadingLive ? "Fetching..." : "Get Prices"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                ) : (
                    /* Local Search */
                    <div className="bg-white p-4 rounded-lg shadow-sm border max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search crop or mandi..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Results Grid - Live or Local */}
            {isLiveMode ? (
                /* Live Results */
                <div className="space-y-6">
                    {hasSearchedLive && liveRecords.length === 0 && !loadingLive && (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed">
                            <Filter className="h-10 w-10 mx-auto mb-3 opacity-50" />
                            <p>No live records found for "{liveCommodity}" in "{liveState}".</p>
                            <p className="text-sm mt-1">Try a different crop spelling or state.</p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {liveRecords.map((record) => (
                            <Card key={record.id} className="hover:shadow-md transition-shadow border-blue-100">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl font-bold text-blue-800">{record.cropName}</CardTitle>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                                {record.location}
                                            </div>
                                        </div>
                                        <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center border border-blue-100">
                                            <CalendarDays className="h-3 w-3 mr-1" />
                                            {record.date}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-2 py-3 bg-blue-50/50 rounded-lg text-center mt-2">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Min</p>
                                            <p className="font-semibold text-gray-700">₹{record.minPrice}</p>
                                        </div>
                                        <div className="border-x border-blue-100">
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Modal</p>
                                            <p className="font-bold text-blue-700 text-lg">₹{record.modalPrice}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Max</p>
                                            <p className="font-semibold text-gray-700">₹{record.maxPrice}</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-right text-gray-400 mt-2">Source: Gov API</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                /* Local Results */
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecords.map((record) => (
                        <Card key={record.id} className="hover:shadow-md transition-shadow border-green-50">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-green-800">{record.cropName}</CardTitle>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                            {record.location}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full flex items-center">
                                        <CalendarDays className="h-3 w-3 mr-1" />
                                        {record.date}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-2 py-3 bg-green-50/50 rounded-lg text-center mt-2">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Min</p>
                                        <p className="font-semibold text-gray-700">₹{record.minPrice}</p>
                                    </div>
                                    <div className="border-x border-green-100">
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Modal</p>
                                        <p className="font-bold text-green-700 text-lg">₹{record.modalPrice}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Max</p>
                                        <p className="font-semibold text-gray-700">₹{record.maxPrice}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredRecords.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            <Filter className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p className="text-lg">No saved prices found.</p>
                            <Button
                                variant="link"
                                onClick={() => setSearchQuery("")}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
