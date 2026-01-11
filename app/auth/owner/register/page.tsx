"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useApp } from "@/app/context/AppContext";
import { Settings } from "lucide-react";

export default function OwnerRegisterPage() {
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
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
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
                    role: "equipment_owner",
                });
                setLoading(false);
                router.push("/owner/dashboard");
            } catch (err) {
                setLoading(false);
                alert("Registration failed");
            }
            setLoading(false);
            router.push("/owner/dashboard");
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <Card className="w-full max-w-md shadow-lg border-orange-100">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto bg-orange-100 p-3 rounded-full w-fit mb-2">
                        <Settings className="h-6 w-6 text-orange-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-orange-800">Owner Registration</CardTitle>
                    <CardDescription>
                        List your agricultural equipment for rent.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Business / Owner Name</Label>
                            <Input id="name" name="name" placeholder="Sanjay Tractor Services" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="sanjay@example.com" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input id="mobile" name="mobile" type="tel" placeholder="9876543210" value={formData.mobile} onChange={handleChange} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="village">Village</Label>
                                <Input id="village" name="village" placeholder="Rampur" value={formData.village} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">District</Label>
                                <Input id="district" name="district" placeholder="Pune" value={formData.district} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="******" value={formData.password} onChange={handleChange} required />
                        </div>
                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
                            {loading ? "Creating Account..." : "Register"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm">
                    <p className="text-gray-500">
                        Already have an account?{" "}
                        <Link href="/auth/owner/login" className="text-orange-700 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
