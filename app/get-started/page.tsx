"use client";

import { Button } from "@/app/components/ui/button";
import { Users, Tractor, Sprout, ArrowRight, ShieldCheck, MapPin, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

export default function GetStarted() {
    const roles = [
        {
            title: "Farmer",
            icon: Sprout,
            description: "Manage your farm, hire labourers, rent equipment, and track mandi prices",
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
            registerHref: "/auth/farmer/register",
            loginHref: "/auth/farmer/login",
            features: [
                "Hire skilled labourers on-demand",
                "Rent equipment at best prices",
                "Track live mandi rates",
                "Manage farm operations digitally",
            ],
        },
        {
            title: "Labourer",
            icon: Users,
            description: "Find farm work opportunities near you and build your reputation",
            gradient: "from-blue-500 to-cyan-600",
            bgGradient: "from-blue-50 to-cyan-50",
            registerHref: "/auth/labour/register",
            loginHref: "/auth/labour/login",
            features: [
                "Browse available jobs nearby",
                "Set your own hourly rates",
                "Build verified work profile",
                "Get paid securely & on time",
            ],
        },
        {
            title: "Equipment Owner",
            icon: Tractor,
            description: "List your machinery and earn passive income from rentals",
            gradient: "from-orange-500 to-red-600",
            bgGradient: "from-orange-50 to-red-50",
            registerHref: "/auth/owner/register",
            loginHref: "/auth/owner/login",
            features: [
                "List tractors, tillers & more",
                "Set flexible rental pricing",
                "Manage bookings effortlessly",
                "Maximize equipment utilization",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                        Choose your role to get started
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Select the option that best describes you and join the Krishi Hub community to access tailored tools and opportunities.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {roles.map((role) => (
                        <div
                            key={role.title}
                            className={`group relative rounded-3xl bg-gradient-to-br ${role.bgGradient} p-8 shadow-xl border-2 border-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col`}
                        >
                            <div
                                className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                            >
                                <role.icon className="h-8 w-8" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{role.title}</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{role.description}</p>

                            <div className="space-y-6">
                                <ul className="space-y-3">
                                    {role.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="text-green-600 mt-0.5 font-bold">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="space-y-3">
                                    <Button
                                        className={`w-full bg-gradient-to-r ${role.gradient} text-white hover:opacity-90 h-12 rounded-full font-bold shadow-md`}
                                        asChild
                                    >
                                        <Link href={role.registerHref}>
                                            Register as {role.title} <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>

                                    <Link
                                        href={role.loginHref}
                                        className="block text-center text-sm text-gray-500 hover:text-gray-900 font-semibold"
                                    >
                                        Already have an account? <span className="underline">Login</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-gray-500 text-sm">
                        Need help deciding?{" "}
                        <Link href="/" className="text-green-600 hover:text-green-700 font-bold underline">
                            Learn more about each role
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
