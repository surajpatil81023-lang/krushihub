"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function AddMandiPricePage() {
    const router = useRouter();
    const { currentUser, addMandiRecord } = useApp();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cropName: "",
        minPrice: "",
        maxPrice: "",
        modalPrice: "",
        location: "",
        date: new Date().toISOString().split("T")[0],
    });

    if (!currentUser || currentUser.role !== "admin") {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            addMandiRecord({
                cropName: formData.cropName,
                minPrice: Number(formData.minPrice),
                maxPrice: Number(formData.maxPrice),
                modalPrice: Number(formData.modalPrice),
                location: formData.location,
                date: formData.date,
            });
            setLoading(false);
            router.push("/admin/dashboard");
        }, 800);
    };

    return (
        <div className="container mx-auto py-8 px-4 flex justify-center">
            <Card className="w-full max-w-lg border-red-100 shadow-md">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-0 h-auto hover:bg-transparent text-gray-400 hover:text-red-700">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <CardTitle className="text-xl font-bold text-gray-800">Add Mandi Price</CardTitle>
                    </div>
                    <CardDescription>
                        Publish daily market rates for crops.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cropName">Crop Name</Label>
                            <Input id="cropName" name="cropName" placeholder="e.g. Wheat, Rice, Cotton" value={formData.cropName} onChange={handleChange} required />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="minPrice">Min Price (₹)</Label>
                                <Input id="minPrice" name="minPrice" type="number" placeholder="2000" value={formData.minPrice} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="maxPrice">Max Price (₹)</Label>
                                <Input id="maxPrice" name="maxPrice" type="number" placeholder="2500" value={formData.maxPrice} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="modalPrice">Modal Price (₹)</Label>
                                <Input id="modalPrice" name="modalPrice" type="number" placeholder="2200" value={formData.modalPrice} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Mandi Location</Label>
                            <Input id="location" name="location" placeholder="e.g. Pune APMC" value={formData.location} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                        </div>

                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white mt-4" disabled={loading}>
                            {loading ? "Publishing..." : "Publish Price"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
