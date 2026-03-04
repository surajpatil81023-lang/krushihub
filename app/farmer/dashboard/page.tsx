"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Users, Search, History, Tractor, TrendingUp, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FarmerDashboard() {
    const { currentUser, deleteAccount } = useApp();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

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
                <div className="flex gap-2 flex-wrap justify-end">
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
                    <Button
                        variant="outline"
                        className="flex gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <Trash2 className="h-4 w-4" /> Delete Account
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
                            Search for skilled labourers in {currentUser.village || "your village"}, {currentUser.district || "your district"} and contact them directly.
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

            {/* Delete Account Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-red-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-red-100 p-2 rounded-full">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Delete Account</h2>
                        </div>
                        <p className="text-gray-600 mb-2">Are you sure you want to delete your account?</p>
                        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 mb-6">
                            ⚠️ This will <strong>permanently delete</strong> your account and all related data. This action <strong>cannot be undone</strong>.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white flex gap-2"
                                onClick={async () => {
                                    setDeleting(true);
                                    await deleteAccount();
                                    setDeleting(false);
                                }}
                                disabled={deleting}
                            >
                                <Trash2 className="h-4 w-4" />
                                {deleting ? "Deleting..." : "Delete My Account"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
