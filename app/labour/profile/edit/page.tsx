"use client";

import { useApp } from "@/app/context/AppContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/app/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SKILL_OPTIONS = ["Harvesting", "Sowing", "Spraying", "Weeding", "Ploughing", "Threshing"];

export default function LabourerEditProfile() {
    const { currentUser, updateLabourerProfile } = useApp();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        village: "",
        district: "",
        expectedWage: "",
    });
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser || currentUser.role !== "labourer") {
            router.push("/auth/labour/login");
            return;
        }
        setFormData({
            name: currentUser.name,
            village: currentUser.village,
            district: currentUser.district,
            expectedWage: currentUser.expectedWage.toString(),
        });
        setSelectedSkills(currentUser.skills);
    }, [currentUser, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            updateLabourerProfile({
                name: formData.name,
                village: formData.village,
                district: formData.district,
                skills: selectedSkills,
                expectedWage: Number(formData.expectedWage),
            });
            setLoading(false);
            router.push("/labour/dashboard");
        }, 1000);
    };

    if (!currentUser) return null;

    return (
        <div className="container mx-auto py-8 px-4 flex justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="village">Village</Label>
                                <Input id="village" name="village" value={formData.village} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">District</Label>
                                <Input id="district" name="district" value={formData.district} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Farming Skills</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {SKILL_OPTIONS.map((skill) => (
                                    <div key={skill} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={skill}
                                            checked={selectedSkills.includes(skill)}
                                            onChange={() => toggleSkill(skill)}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor={skill} className="text-sm text-gray-700 cursor-pointer select-none">
                                            {skill}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="expectedWage">Expected Daily Wage (₹)</Label>
                            <Input id="expectedWage" name="expectedWage" type="number" value={formData.expectedWage} onChange={handleChange} required />
                        </div>

                        <div className="flex gap-4">
                            <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
