"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { ArrowLeft } from "lucide-react";

const EQUIPMENT_TYPES = ["Tractor", "Tiller", "Sprayer", "Seeder", "Harvester", "Thresher"];

export default function AddEquipmentPage() {
    const router = useRouter();
    const { currentUser, addEquipment } = useApp();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "Tractor",
        rentPerDay: "",
        location: "",
    });

    if (!currentUser || currentUser.role !== "equipment_owner") {
        // router.push("/auth/owner/login"); // Let middleware/useEffect handle
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            addEquipment({
                name: formData.name,
                type: formData.type,
                rentPerDay: Number(formData.rentPerDay),
                location: formData.location || currentUser.village + ", " + currentUser.district,
                ownerId: currentUser.id,
                available: true,
            });
            setLoading(false);
            router.push("/owner/dashboard");
        }, 800);
    };

    return (
        <div className="container mx-auto py-8 px-4 flex justify-center">
            <Card className="w-full max-w-lg border-orange-100 shadow-md">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-0 h-auto hover:bg-transparent text-gray-400 hover:text-orange-700">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <CardTitle className="text-xl font-bold text-gray-800">Add New Equipment</CardTitle>
                    </div>
                    <CardDescription>
                        List your machinery to start earning rent.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Equipment Name / Model</Label>
                            <Input id="name" name="name" placeholder="e.g. Mahindra 575 DI" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Equipment Type</Label>
                            <Select id="type" name="type" value={formData.type} onChange={handleChange} required>
                                {EQUIPMENT_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rentPerDay">Rent Per Day (₹)</Label>
                            <Input id="rentPerDay" name="rentPerDay" type="number" placeholder="1200" value={formData.rentPerDay} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" placeholder={`${currentUser.village}, ${currentUser.district}`} value={formData.location} onChange={handleChange} />
                            <p className="text-xs text-gray-400">Leave blank to use your profile location.</p>
                        </div>

                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-4" disabled={loading}>
                            {loading ? "Adding..." : "Add Equipment"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
