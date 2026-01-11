"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useApp } from "@/app/context/AppContext";
import { Users } from "lucide-react";

const SKILL_OPTIONS = ["Harvesting", "Sowing", "Spraying", "Weeding", "Ploughing", "Threshing"];

export default function LabourerRegisterPage() {
    const router = useRouter();
    const { register } = useApp();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        village: "",
        district: "",
        expectedWage: "",
    });
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSkills.length === 0) {
            alert("Please select at least one skill");
            return;
        }
        setLoading(true);
        setTimeout(async () => {
            try {
                await register({
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    password: formData.password,
                    village: formData.village,
                    district: formData.district,
                    role: "labourer",
                    skills: selectedSkills,
                    expectedWage: Number(formData.expectedWage),
                });
                setLoading(false);
                router.push("/labour/dashboard");
            } catch (err) {
                setLoading(false);
                alert("Registration failed");
            }
            setLoading(false);
            router.push("/labour/dashboard");
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <Card className="w-full max-w-md shadow-lg border-blue-100">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
                        <Users className="h-6 w-6 text-blue-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-800">Labourer Registration</CardTitle>
                    <CardDescription>
                        Create your profile to get hired.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="Suresh Patil" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="suresh@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input id="mobile" name="mobile" type="tel" placeholder="9876543210" value={formData.mobile} onChange={handleChange} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="village">Village</Label>
                                <Input id="village" name="village" placeholder="Sonpur" value={formData.village} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">District</Label>
                                <Input id="district" name="district" placeholder="Nashik" value={formData.district} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="******" value={formData.password} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2">
                            <Label>Farming Skills</Label>
                            <div className="grid grid-cols-2 gap-2">
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
                            <Input id="expectedWage" name="expectedWage" type="number" placeholder="500" value={formData.expectedWage} onChange={handleChange} required />
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                            {loading ? "Creating Profile..." : "Register"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm">
                    <p className="text-gray-500">
                        Already have an account?{" "}
                        <Link href="/auth/labour/login" className="text-blue-700 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
