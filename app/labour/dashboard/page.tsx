"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { MapPin, IndianRupee, Wrench, Edit, Trash2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LabourerDashboard() {
    const { currentUser, deleteAccount } = useApp();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Protect route
    useEffect(() => {
        if (!currentUser || currentUser.role !== "labourer") {
            router.push("/auth/labour/login");
        }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== "labourer") return null;
    const labourer = currentUser as any; // Cast for now to access skills/wage safely in TS

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex gap-2" asChild>
                        <Link href="/labour/profile/edit">
                            <Edit className="h-4 w-4" /> Edit Profile
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
                {/* Profile Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Full Name</label>
                            <p className="text-xl font-semibold text-gray-900">{labourer.name}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Contact Number</label>
                                <p className="text-lg text-gray-900">{labourer.mobile}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Expected Daily Wage</label>
                                <p className="text-lg text-green-700 font-bold flex items-center">
                                    <IndianRupee className="h-4 w-4 mr-1" />
                                    {labourer.expectedWage} / day
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                                <label className="text-sm font-medium text-gray-500">Location</label>
                                <p className="text-lg text-gray-900">{labourer.village}, {labourer.district}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-500 mb-2 block">Skills</label>
                            <div className="flex flex-wrap gap-2">
                                {labourer.skills?.map((skill: string) => (
                                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                        <Wrench className="h-3 w-3 mr-1" />
                                        {skill}
                                    </span>
                                ))}
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
