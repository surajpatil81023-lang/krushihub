"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { MapPin, IndianRupee, Wrench, Search, Filter } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";

const SKILL_OPTIONS = ["All Skills", "Harvesting", "Sowing", "Spraying", "Weeding", "Ploughing", "Threshing"];

export default function LabourerListPage() {
    const { labourers, currentUser } = useApp();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSkill, setSelectedSkill] = useState("All Skills");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    // Get unique districts for filter
    const districts = useMemo(() => {
        const d = new Set(labourers.map(l => l.district));
        return Array.from(d);
    }, [labourers]);

    const filteredLabourers = useMemo(() => {
        return labourers.filter(labourer => {
            const matchesSearch =
                labourer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                labourer.village.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesSkill = selectedSkill === "All Skills" || labourer.skills.includes(selectedSkill);

            const matchesDistrict = selectedDistrict === "" || labourer.district === selectedDistrict;

            return matchesSearch && matchesSkill && matchesDistrict;
        });
    }, [labourers, searchQuery, selectedSkill, selectedDistrict]);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">Find Skilled Labourers</h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4 md:space-y-0 md:flex md:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by name or village..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="w-full md:w-48">
                        <Select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                        >
                            {SKILL_OPTIONS.map(skill => (
                                <option key={skill} value={skill}>{skill}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="w-full md:w-48">
                        <Select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            <option value="">All Districts</option>
                            {districts.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLabourers.map((labourer) => (
                    <Card key={labourer.id} className="hover:shadow-md transition-shadow cursor-pointer border-green-50">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-bold text-gray-800">{labourer.name}</CardTitle>
                                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                    Available
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-2">
                            <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                {labourer.village}, {labourer.district}
                            </div>
                            <div className="flex items-center text-gray-900 font-medium">
                                <IndianRupee className="h-4 w-4 mr-1 text-green-700" />
                                {labourer.expectedWage} / day
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {labourer.skills.slice(0, 3).map(skill => (
                                    <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                        {skill}
                                    </span>
                                ))}
                                {labourer.skills.length > 3 && (
                                    <span className="text-xs text-gray-500 self-center">+{labourer.skills.length - 3} more</span>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4">
                            <Button className="w-full bg-green-700 hover:bg-green-800" variant="outline" asChild>
                                <Link href={`/farmer/labourers/${labourer.id}`} className="w-full">
                                    View Profile
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {filteredLabourers.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        <Filter className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg">No labourers found matching your criteria.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedSkill("All Skills");
                                setSelectedDistrict("");
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
