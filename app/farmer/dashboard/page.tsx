"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Users, Search, History, Tractor, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FarmerDashboard() {
    const { currentUser } = useApp();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser || currentUser.role !== "farmer") {
            router.push("/auth/farmer/login");
        }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== "farmer") return null;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome, {currentUser.name}</h1>
                    <p className="text-gray-500">Manage your farm labour requirements efficiently.</p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-orange-600 hover:bg-orange-700 flex gap-2" asChild>
                        <Link href="/farmer/equipment">
                            <Tractor className="h-4 w-4" /> Rent Equipment
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex gap-2" asChild>
                        <Link href="/farmer/bookings">
                            My Bookings
                        </Link>
                    </Button>
                    <Button variant="outline" className="flex gap-2 text-green-700 border-green-200 hover:bg-green-50" asChild>
                        <Link href="/farmer/mandi">
                            <TrendingUp className="h-4 w-4" /> Mandi Prices
                        </Link>
                    </Button>
                    <Button className="bg-green-700 hover:bg-green-800 flex gap-2" asChild>
                        <Link href="/farmer/labourers">
                            <Search className="h-4 w-4" /> Find Labourers
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Quick Action */}
                <Card className="bg-green-50 border-green-100 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-green-800">Find Workers Nearby</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-700 mb-6">
                            Search for skilled labourers in {currentUser.village}, {currentUser.district} and contact them directly.
                        </p>
                        <Button className="w-full md:w-auto bg-green-700 hover:bg-green-800" asChild>
                            <Link href="/farmer/labourers">
                                Search Now
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <History className="h-5 w-5 text-gray-500" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Users className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Viewed Profile</p>
                                    <p className="text-xs text-gray-500">Ramesh Kumar (Harvesting)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Users className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Viewed Profile</p>
                                    <p className="text-xs text-gray-500">Suresh Patil (Sowing)</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
