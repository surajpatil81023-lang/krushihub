"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/components/ui/dialog";
import { MapPin, IndianRupee, Tractor, Search, Filter, Calendar, User, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { cn } from "@/app/lib/utils";

const EQUIPMENT_TYPES = ["All Types", "Tractor", "Tiller", "Sprayer", "Seeder", "Harvester", "Thresher"];

export default function EquipmentListPage() {
    const { equipment, createBooking } = useApp();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("All Types");
    const [bookingDate, setBookingDate] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
    const [modalBookingDate, setModalBookingDate] = useState("");

    const filteredEquipment = useMemo(() => {
        return equipment.filter(item => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = selectedType === "All Types" || item.type === selectedType;

            return matchesSearch && matchesType && item.available;
        });
    }, [equipment, searchQuery, selectedType]);

    const handleViewDetails = (item: any) => {
        setSelectedEquipment(item);
        setModalBookingDate("");
        setIsModalOpen(true);
    };

    const handleBookFromModal = () => {
        if (!modalBookingDate) {
            alert("Please select a date for booking.");
            return;
        }
        if (confirm(`Confirm booking request for ${selectedEquipment.name} on ${modalBookingDate}?`)) {
            createBooking(selectedEquipment.id, modalBookingDate);
            setIsModalOpen(false);
            setModalBookingDate("");
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">Rent Farm Equipment</h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border space-y-4 md:space-y-0 md:flex md:gap-4 items-end">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by name or location..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="w-full md:w-48">
                        <Select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            {EQUIPMENT_TYPES.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </Select>
                    </div>

                    <div className="w-full md:w-auto">

                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow border-orange-50">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <div className="bg-orange-100 p-2 rounded-lg">
                                        <Tractor className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <CardTitle className="text-lg font-bold text-gray-800">{item.name}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 pb-2">
                            <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                                {item.location}
                            </div>
                            <div className="flex items-center text-gray-900 font-medium">
                                <IndianRupee className="h-4 w-4 mr-1 text-green-700" />
                                {item.rentPerDay} / day
                            </div>
                            <div className="flex items-center">
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{item.type}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4">
                            <Button
                                className="w-full bg-orange-600 hover:bg-orange-700"
                                onClick={() => handleViewDetails(item)}
                            >
                                View Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {filteredEquipment.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        <Filter className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg">No available equipment found matching your criteria.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedType("All Types");
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Equipment Details Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <Tractor className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-2xl">{selectedEquipment?.name}</DialogTitle>
                                <DialogDescription className="text-gray-600">
                                    Equipment Details & Booking
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Equipment Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500 font-medium">Equipment Type</p>
                                <div className="flex items-center gap-2">
                                    <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {selectedEquipment?.type}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500 font-medium">Daily Rent</p>
                                <div className="flex items-center text-lg font-bold text-green-700">
                                    <IndianRupee className="h-5 w-5 mr-1" />
                                    {selectedEquipment?.rentPerDay}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm text-gray-500 font-medium">Location</p>
                            <div className="flex items-center text-gray-700">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                {selectedEquipment?.location}
                            </div>
                        </div>

                        {/* Owner Information (if available) */}
                        {selectedEquipment?.owner && (
                            <div className="border-t pt-4">
                                <p className="text-sm text-gray-500 font-medium mb-3">Owner Information</p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-gray-700">
                                        <User className="h-4 w-4 mr-2 text-gray-400" />
                                        {selectedEquipment.owner.name || "N/A"}
                                    </div>
                                    {selectedEquipment.owner.phone && (
                                        <div className="flex items-center text-gray-700">
                                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                            {selectedEquipment.owner.phone}
                                        </div>
                                    )}
                                    {selectedEquipment.owner.email && (
                                        <div className="flex items-center text-gray-700">
                                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                            {selectedEquipment.owner.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Booking Section */}
                        <div className="border-t pt-4 space-y-3">
                            <p className="text-sm text-gray-500 font-medium">Select Booking Date</p>
                            <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <input
                                    type="date"
                                    className="outline-none text-sm bg-transparent flex-1"
                                    value={modalBookingDate}
                                    onChange={(e) => setModalBookingDate(e.target.value)}
                                    min={new Date().toISOString().split("T")[0]}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={handleBookFromModal}
                        >
                            Confirm Booking
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
