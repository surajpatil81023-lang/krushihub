"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card";
import { Plus, Trash2, Power, CalendarClock, User as UserIcon, Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/app/lib/utils";

export default function OwnerDashboard() {
    const { currentUser, equipment, deleteEquipment, toggleAvailability, bookings, updateBookingStatus } = useApp();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser || currentUser.role !== "equipment_owner") {
            router.push("/auth/owner/login");
        }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== "equipment_owner") return null;

    const myEquipment = equipment.filter(e => e.ownerId === currentUser.id);
    const myBookings = bookings.filter(b => equipment.some(e => e.id === b.equipmentId && e.ownerId === currentUser.id));

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Owner Dashboard</h1>
                    <p className="text-gray-500">Manage your equipment and rental requests.</p>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 flex gap-2" asChild>
                    <Link href="/owner/equipment/add">
                        <Plus className="h-4 w-4" /> Add Equipment
                    </Link>
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Managed Equipment Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        My Equipment <span className="ml-2 bg-gray-100 text-gray-600 px-2 rounded-full text-sm">{myEquipment.length}</span>
                    </h2>

                    {myEquipment.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                            <p className="text-gray-500 mb-4">You haven't listed any equipment yet.</p>
                            <Link href="/owner/equipment/add" className="text-orange-600 font-medium hover:underline">Add your first machine</Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {myEquipment.map(item => (
                                <Card key={item.id} className="flex flex-row overflow-hidden border-l-4 border-l-orange-500">
                                    <CardContent className="flex-1 p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.type} • ₹{item.rentPerDay}/day</p>
                                            </div>
                                            <div className={cn("px-2 py-0.5 rounded text-xs font-semibold", item.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                                                {item.available ? "Available" : "Unavailable"}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={cn("h-8 text-xs", item.available ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700")}
                                                onClick={() => toggleAvailability(item.id)}
                                            >
                                                <Power className="h-3 w-3 mr-1" />
                                                {item.available ? "Mark Unavailable" : "Mark Available"}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 text-xs text-gray-500 hover:text-red-600"
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to delete this equipment?")) deleteEquipment(item.id);
                                                }}
                                            >
                                                <Trash2 className="h-3 w-3 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Booking Requests Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        Booking Requests <span className="ml-2 bg-orange-100 text-orange-700 px-2 rounded-full text-sm">{myBookings.filter(b => b.status === 'pending').length} New</span>
                    </h2>

                    {myBookings.length === 0 ? (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <CalendarClock className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">No booking requests yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {myBookings.map(booking => (
                                <Card key={booking.id} className="relative">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <UserIcon className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{booking.farmerName}</p>
                                                    <p className="text-xs text-gray-500">Requested {booking.equipmentName}</p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "text-xs font-bold px-2 py-1 rounded capitalize",
                                                booking.status === "pending" && "bg-yellow-100 text-yellow-700",
                                                booking.status === "approved" && "bg-green-100 text-green-700",
                                                booking.status === "rejected" && "bg-red-100 text-red-700",
                                            )}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center text-sm text-gray-600 mb-3 ml-10">
                                            <span>Date: <strong>{booking.date}</strong></span>
                                        </div>

                                        {booking.status === "pending" && (
                                            <div className="flex gap-2 ml-10">
                                                <Button
                                                    size="sm"
                                                    className="h-8 bg-green-600 hover:bg-green-700 text-white"
                                                    onClick={() => updateBookingStatus(booking.id, "approved")}
                                                >
                                                    <Check className="h-3 w-3 mr-1" /> Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => updateBookingStatus(booking.id, "rejected")}
                                                >
                                                    <X className="h-3 w-3 mr-1" /> Reject
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
