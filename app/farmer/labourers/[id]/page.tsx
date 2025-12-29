"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { MapPin, IndianRupee, Wrench, Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LabourerProfile } from "@/app/context/AppContext";

export default function LabourerDetailPage() {
    const params = useParams();
    const { labourers, currentUser } = useApp();
    const router = useRouter();
    const [labourer, setLabourer] = useState<LabourerProfile | null>(null);

    useEffect(() => {
        // If not logged in as farmer, redirect
        /*
        if (!currentUser) { // Or implement protected route wrapper
           router.push("/auth/farmer/login");
        }
        */

        if (params.id) {
            const found = labourers.find(l => l.id === params.id);
            if (found) setLabourer(found);
        }
    }, [params.id, labourers, currentUser, router]);

    if (!labourer) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <Button variant="ghost" onClick={() => router.back()} className="mb-6 pl-0 hover:pl-0 hover:bg-transparent text-gray-500 hover:text-green-700">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Search
            </Button>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Main Profile Info */}
                <Card className="md:col-span-2 border-green-100 shadow-md">
                    <div className="h-32 bg-gradient-to-r from-green-600 to-green-800 rounded-t-lg"></div>
                    <CardContent className="relative pt-0">
                        <div className="absolute -top-12 left-6 h-24 w-24 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-sm">
                            <span className="text-3xl font-bold text-green-800">{labourer.name.charAt(0)}</span>
                        </div>
                        <div className="mt-14 mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">{labourer.name}</h1>
                            <p className="text-gray-500 flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-1" /> {labourer.village}, {labourer.district}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <Wrench className="h-5 w-5 mr-2 text-green-700" /> Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {labourer.skills.map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium border border-green-100">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-700" /> Verifications
                                </h3>
                                <div className="flex gap-4">
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">ID Verified</span>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">Phone Verified</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Sidebar */}
                <div className="space-y-6">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle>Contact Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Expected Daily Wage</p>
                                <p className="text-2xl font-bold text-green-700 flex items-center">
                                    <IndianRupee className="h-5 w-5" /> {labourer.expectedWage}
                                </p>
                            </div>

                            <a href={`tel:${labourer.mobile}`} className="block">
                                <Button className="w-full h-12 text-lg bg-green-700 hover:bg-green-800 shadow-green-100">
                                    <Phone className="h-5 w-5 mr-2" /> Call Now
                                </Button>
                            </a>

                            <p className="text-xs text-center text-gray-400">
                                Mention "Krishi Hub" when you call.
                            </p>
                        </CardContent>
                    </Card>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                        <strong>Safety Tip:</strong> Verify the labourer's identity and agree on wages clearly before work begins.
                    </div>
                </div>
            </div>
        </div>
    );
}
