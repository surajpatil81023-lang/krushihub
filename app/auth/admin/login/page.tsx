"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useApp } from "@/app/context/AppContext";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const { login } = useApp();
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            login(mobile, "admin");
            setLoading(false);
            // We will create this page next
            router.push("/admin/dashboard");
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <Card className="w-full max-w-md shadow-lg border-red-100">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto bg-red-100 p-3 rounded-full w-fit mb-2">
                        <ShieldCheck className="h-6 w-6 text-red-700" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-800">Admin Login</CardTitle>
                    <CardDescription>
                        System Administration Access
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="mobile">Mobile Number</Label>
                            <Input
                                id="mobile"
                                type="tel"
                                placeholder="9999999999"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                            <p className="text-xs text-gray-500">Use 9999999999 for demo</p>
                        </div>
                        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                            {loading ? "Verifying..." : "Login to Console"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
