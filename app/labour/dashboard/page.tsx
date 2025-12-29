"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { MapPin, IndianRupee, Wrench, Edit } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LabourerDashboard() {
    const { currentUser } = useApp();
    const router = useRouter();

    // Protect route
    useEffect(() => {
        if (!currentUser || currentUser.role !== "labourer") {
            router.push("/auth/labour/login");
        }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== "labourer") return null;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
                <Button variant="outline" className="flex gap-2" asChild>
                    <Link href="/labour/profile/edit">
                        <Edit className="h-4 w-4" /> Edit Profile
                    </Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                            <p className="text-xl font-semibold text-gray-900">{currentUser.name}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Contact Number</label>
                                <p className="text-lg text-gray-900">{currentUser.mobile}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Expected Daily Wage</label>
                                <p className="text-lg text-green-700 font-bold flex items-center">
                                    <IndianRupee className="h-4 w-4 mr-1" />
                                    {currentUser.expectedWage} / day
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                                <label className="text-sm font-medium text-gray-500">Location</label>
                                <p className="text-lg text-gray-900">{currentUser.village}, {currentUser.district}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500 mb-2 block">Skills</label>
                            <div className="flex flex-wrap gap-2">
                                {currentUser.skills.map((skill) => (
                                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                        <Wrench className="h-3 w-3 mr-1" />
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stats / Info Card (Placeholder) */}
                <Card className="bg-blue-50 border-blue-100">
                    <CardHeader>
                        <CardTitle className="text-blue-800">Job Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-600">
                            Your profile is visible to farmers in <strong>{currentUser.district}</strong>.
                        </p>
                        <div className="mt-4 p-4 bg-white rounded-lg border border-blue-100">
                            <p className="text-sm text-gray-500">Profile Views</p>
                            <p className="text-2xl font-bold text-gray-800">12</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
