"use client";

import { useApp } from "@/app/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { CalendarClock, CheckCircle2, XCircle, Tractor, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/app/lib/utils";

export default function FarmerBookingsPage() {
    const { currentUser, bookings } = useApp();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser || currentUser.role !== "farmer") {
            router.push("/auth/farmer/login");
        }
    }, [currentUser, router]);

    if (!currentUser || currentUser.role !== "farmer") return null;

    const myBookings = bookings.filter(b => b.farmerId === currentUser.id);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Equipment Bookings</h1>

            {myBookings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Tractor className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">You haven't booked any equipment yet.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {myBookings.map(booking => (
                        <Card key={booking.id} className="border-l-4 border-l-orange-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex justify-between items-start">
                                    <span>{booking.equipmentName}</span>
                                    {booking.status === "approved" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                                    {booking.status === "rejected" && <XCircle className="h-5 w-5 text-red-600" />}
                                    {booking.status === "pending" && <Clock className="h-5 w-5 text-yellow-600" />}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">Date: {booking.date}</p>
                                <div className={cn(
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                                    booking.status === "approved" && "bg-green-100 text-green-800",
                                    booking.status === "rejected" && "bg-red-100 text-red-800",
                                    booking.status === "pending" && "bg-yellow-100 text-yellow-800",
                                )}>
                                    {booking.status}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
