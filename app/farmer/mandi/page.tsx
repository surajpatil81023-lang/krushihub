"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Search, MapPin, CalendarDays, TrendingUp, Filter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { SearchableSelect } from "@/app/components/ui/custom-combobox";

// Common lists for dropdowns
const POPULAR_CROPS = [
    { value: "Onion", label: "Onion" },
    { value: "Potato", label: "Potato" },
    { value: "Tomato", label: "Tomato" },
    { value: "Wheat", label: "Wheat" },
    { value: "Rice", label: "Rice" },
    { value: "Cotton", label: "Cotton" },
    { value: "Maize", label: "Maize" },
    { value: "Soybean", label: "Soybean" },
    { value: "Banana", label: "Banana" },
    { value: "Garlic", label: "Garlic" },
];

const STATES = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Punjab", label: "Punjab" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Haryana", label: "Haryana" },
    { value: "Telangana", label: "Telangana" },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
];

const QUICK_FILTERS = ["Onion", "Tomato", "Potato", "Rice", "Wheat", "Cotton"];

export default function MandiPricesPage() {
    const { fetchRealTimeMandiRecords } = useApp();

    // Search State
    const [selectedCommodity, setSelectedCommodity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (commodity: string, state: string) => {
        if (!commodity) return;
        setLoading(true);
        setHasSearched(true);
        const data = await fetchRealTimeMandiRecords(commodity, state);
        setRecords(data);
        setLoading(false);
    };

    const handleQuickFilter = (crop: string) => {
        setSelectedCommodity(crop);
        // If state is already selected, search immediately, else just set crop
        if (selectedState) {
            handleSearch(crop, selectedState);
        } else {
            // Optional: Search with just crop? The API supports it.
            handleSearch(crop, "");
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(selectedCommodity, selectedState);
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8 space-y-6">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
                        <TrendingUp className="h-8 w-8 text-green-600" /> Mandi Rates
                    </h1>
                    <p className="text-gray-500 mt-1">Check real-time government mandi prices for your crops.</p>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2">
                    {QUICK_FILTERS.map((crop) => (
                        <button
                            key={crop}
                            onClick={() => handleQuickFilter(crop)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                                selectedCommodity === crop
                                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                                    : "bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-200"
                            )}
                        >
                            {crop}
                        </button>
                    ))}
                </div>

                {/* Search Inputs */}
                <Card className="border-green-100 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-green-800">Find Market Prices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="space-y-2 flex-1 w-full relative z-20">
                                <label className="text-sm font-medium text-gray-700">Crop (Commodity)</label>
                                <SearchableSelect
                                    options={POPULAR_CROPS}
                                    value={selectedCommodity}
                                    onChange={setSelectedCommodity}
                                    placeholder="Select Crop..."
                                    searchPlaceholder="Search crops..."
                                />
                            </div>
                            <div className="space-y-2 flex-1 w-full relative z-10">
                                <label className="text-sm font-medium text-gray-700">State</label>
                                <SearchableSelect
                                    options={STATES}
                                    value={selectedState}
                                    onChange={setSelectedState}
                                    placeholder="Select State (Optional)..."
                                    searchPlaceholder="Search states..."
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 min-w-[140px] h-10"
                            >
                                {loading ? "Fetching..." : "Search Rates"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Results Grid */}
            <div className="space-y-6">
                {hasSearched && records.length === 0 && !loading && (
                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <Filter className="h-10 w-10 mx-auto mb-3 opacity-50" />
                        <p className="text-lg font-medium">No records found</p>
                        <p className="text-sm mt-1">We couldn't find live data for "{selectedCommodity}" {selectedState ? `in ${selectedState}` : ""}.</p>
                    </div>
                )}

                {!hasSearched && (
                    <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
                        <p>Select a crop and state to see current market prices.</p>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {records.map((record) => (
                        <Card key={record.id} className="hover:shadow-md transition-all duration-200 border-green-50 group">
                            <CardHeader className="pb-3 border-b border-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                                            {record.cropName}
                                        </CardTitle>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <MapPin className="h-3.5 w-3.5 mr-1 text-green-500" />
                                            {record.location}
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full flex items-center border border-green-100">
                                        <CalendarDays className="h-3 w-3 mr-1" />
                                        {record.date}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="grid grid-cols-3 gap-2 py-3 bg-gray-50 rounded-lg text-center">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Min</p>
                                        <p className="font-semibold text-gray-700">₹{record.minPrice}</p>
                                    </div>
                                    <div className="space-y-1 border-x border-gray-200">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Modal</p>
                                        <p className="font-bold text-green-700 text-lg">₹{record.modalPrice}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Max</p>
                                        <p className="font-semibold text-gray-700">₹{record.maxPrice}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Gov. Data</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
