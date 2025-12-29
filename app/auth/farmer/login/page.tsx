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

export default function FarmerLoginPage() {
    const router = useRouter();
    const { login } = useApp();
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            login(mobile, "farmer");
            setLoading(false);
            router.push("/farmer/dashboard");
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <Card className="w-full max-w-md shadow-lg border-green-100">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-2">
                        <Tractor className="h-6 w-6 text-green-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-800">Farmer Login</CardTitle>
                    <CardDescription>
                        Enter your mobile number to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input
                                id="mobile"
                                type="tel"
                                placeholder="9876543210"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-center text-sm">
                    <p className="text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/farmer/register" className="text-green-700 font-semibold hover:underline">
                            Register here
                        </Link>
                    </p>
                    <p className="text-gray-500">
                        Are you a labourer?{" "}
                        <Link href="/auth/labour/login" className="text-blue-600 font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
