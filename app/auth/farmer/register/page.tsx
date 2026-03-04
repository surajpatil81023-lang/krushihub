"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useApp } from "@/app/context/AppContext";
import { Tractor } from "lucide-react";

export default function FarmerRegisterPage() {
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
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.mobile.trim()) {
            newErrors.mobile = "Mobile number is required";
        } else if (formData.mobile.length !== 10) {
            newErrors.mobile = "Mobile number must be exactly 10 digits";
        }
        if (!formData.village.trim()) newErrors.village = "Village is required";
        if (!formData.district.trim()) newErrors.district = "District is required";
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "mobile") {
            const onlyNums = value.replace(/[^0-9]/g, "");
            if (onlyNums.length <= 10) {
                setFormData({ ...formData, [name]: onlyNums });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        // Simulating delay for effect
        setTimeout(async () => {
            try {
                await register({
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    password: formData.password,
                    village: formData.village,
                    district: formData.district,
                    role: "farmer",
                });
                setLoading(false);
                router.push("/farmer/dashboard");
            } catch (err) {
                setLoading(false);
                alert("Registration failed");
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <Card className="w-full max-w-md shadow-lg border-green-100">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-2">
                        <Tractor className="h-6 w-6 text-green-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-800">Farmer Registration</CardTitle>
                    <CardDescription>
                        Create an account to hire skilled labourers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="Rajesh Kumar" value={formData.name} onChange={handleChange} />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="rajesh@example.com" value={formData.email} onChange={handleChange} />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input id="mobile" name="mobile" type="tel" placeholder="9876543210" value={formData.mobile} onChange={handleChange} />
                            {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="village">Village</Label>
                                <Input id="village" name="village" placeholder="Rampur" value={formData.village} onChange={handleChange} />
                                {errors.village && <p className="text-red-500 text-xs">{errors.village}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">District</Label>
                                <Input id="district" name="district" placeholder="Pune" value={formData.district} onChange={handleChange} />
                                {errors.district && <p className="text-red-500 text-xs">{errors.district}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="******" value={formData.password} onChange={handleChange} />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
                            {loading ? "Creating Account..." : "Register"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm">
                    <p className="text-gray-500">
                        Already have an account?{" "}
                        <Link href="/auth/farmer/login" className="text-green-700 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
