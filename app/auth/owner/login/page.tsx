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

export default function OwnerLoginPage() {
    const router = useRouter();
    const { login } = useApp();
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            login(mobile, "equipment_owner");
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
                    <CardTitle className="text-2xl font-bold text-orange-800">Owner Login</CardTitle>
                    <CardDescription>
                        Manage your equipment and bookings
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
                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-center text-sm">
                    <p className="text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/owner/register" className="text-orange-700 font-semibold hover:underline">
                            Register here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
