"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Plus, Trash2, IndianRupee, MapPin, CalendarDays, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/app/lib/utils";

export default function AdminDashboard() {
    const { currentUser, mandiRecords, deleteMandiRecord } = useApp();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser || currentUser.role !== "admin") {
            router.push("/auth/admin/login");
        }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== "admin") return null;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Admin Console</h1>
                    <p className="text-gray-500">Manage Mandi Prices and System Data.</p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 flex gap-2" asChild>
                    <Link href="/admin/mandi/add">
                        <Plus className="h-4 w-4" /> Add Price Entry
                    </Link>
                </Button>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    Current Mandi Prices <span className="ml-2 bg-red-100 text-red-600 px-2 rounded-full text-sm">{mandiRecords.length}</span>
                </h2>

                {mandiRecords.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                        <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No price records found.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mandiRecords.map(record => (
                            <Card key={record.id} className="border-t-4 border-t-red-500 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg font-bold text-gray-800">{record.cropName}</CardTitle>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <MapPin className="h-3 w-3 mr-1" /> {record.location}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-400 hover:text-red-600 h-8 w-8 p-0"
                                            onClick={() => {
                                                if (confirm("Delete this price record?")) deleteMandiRecord(record.id);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-lg mb-3 text-center">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Min</p>
                                            <p className="font-bold text-gray-700">₹{record.minPrice}</p>
                                        </div>
                                        <div className="border-x border-gray-200">
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Modal</p>
                                            <p className="font-bold text-green-700 text-lg">₹{record.modalPrice}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Max</p>
                                            <p className="font-bold text-gray-700">₹{record.maxPrice}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400 justify-end">
                                        <CalendarDays className="h-3 w-3 mr-1" /> Updated: {record.date}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
