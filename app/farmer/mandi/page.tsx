"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Search, MapPin, CalendarDays, TrendingUp, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/app/lib/utils";

export default function MandiPricesPage() {
    const { mandiRecords } = useApp();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRecords = useMemo(() => {
        return mandiRecords.filter(item =>
            item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [mandiRecords, searchQuery]);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8 space-y-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <TrendingUp className="h-8 w-8 text-green-600" /> Mandi Prices
                    </h1>
                    <p className="text-gray-500">Real-time market rates for your crops.</p>
                </div>

                {/* Search */}
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
            </div>

            {/* Results Grid */}
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
                        <p className="text-lg">No prices found for your search.</p>
                        <Button
                            variant="link"
                            onClick={() => setSearchQuery("")}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
