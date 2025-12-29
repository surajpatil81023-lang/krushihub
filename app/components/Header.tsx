"use client";

import { Sprout, Menu, X, ChevronDown, LogOut, LayoutDashboard, Home, Info, ShoppingCart, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { useApp } from "@/app/context/AppContext";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

export function Header() {
    const { currentUser, logout } = useApp();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

    const userTypes = [
        { label: "Farmer", href: "/auth/farmer/login", icon: "🌾", description: "Manage your farm" },
        { label: "Labourer", href: "/auth/labour/login", icon: "👷", description: "Find work opportunities" },
        { label: "Equipment Owner", href: "/auth/owner/login", icon: "🚜", description: "List your machinery" },
        { label: "Admin", href: "/auth/admin/login", icon: "🔐", description: "System Administration" },
    ];

    const getDashboardLink = () => {
        if (!currentUser) return "/";
        switch (currentUser.role) {
            case "farmer": return "/farmer/dashboard";
            case "labourer": return "/labour/dashboard";
            case "equipment_owner": return "/owner/dashboard";
            case "admin": return "/admin/dashboard";
            default: return "/";
        }
    };

    const closeMenus = () => {
        setMobileMenuOpen(false);
        setLoginDropdownOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-200">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={closeMenus}>
                    <div className="bg-green-600 p-1.5 rounded-lg shadow-sm">
                        <Sprout className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">Krishi Hub</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/#features" className="text-gray-600 hover:text-green-600 transition-colors">
                        Features
                    </Link>
                    <Link href="/farmer/mandi" className="text-gray-600 hover:text-green-600 transition-colors">
                        Mandi Prices
                    </Link>
                    <Link href="/farmer/equipment" className="text-gray-600 hover:text-green-600 transition-colors">
                        Marketplace
                    </Link>

                    {currentUser ? (
                        <div className="flex items-center gap-6">
                            <Link
                                href={getDashboardLink()}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all",
                                    pathname.includes('dashboard') ? "bg-green-50 text-green-700" : "text-gray-600 hover:text-green-600"
                                )}
                            >
                                <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </Link>
                            <div className="flex items-center gap-3 border-l pl-6">
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900 leading-none">{currentUser.name}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{currentUser.role.replace("_", " ")}</p>
                                </div>
                                <Button
                                    onClick={logout}
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Login Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                                    className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors py-2"
                                >
                                    Login <ChevronDown className={cn("h-4 w-4 transition-transform", loginDropdownOpen && "rotate-180")} />
                                </button>

                                {loginDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setLoginDropdownOpen(false)}
                                        />
                                        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border bg-white p-2 shadow-2xl z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="mb-2 px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                Choose Your Path
                                            </div>
                                            {userTypes.map((type) => (
                                                <Link
                                                    key={type.href}
                                                    href={type.href}
                                                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-green-50/50 transition-colors group"
                                                    onClick={closeMenus}
                                                >
                                                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{type.icon}</span>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 group-hover:text-green-700">
                                                            {type.label}
                                                        </div>
                                                        <div className="text-xs text-gray-500">{type.description}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6" asChild>
                                <Link href="/get-started">Get Started</Link>
                            </Button>
                        </>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-600 relative z-50"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu Sidebar Overlay */}
            <div className={cn(
                "fixed inset-0 z-40 bg-white transform transition-transform duration-300 md:hidden",
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <nav className="flex flex-col h-full pt-20 px-6 pb-12 overflow-y-auto">
                    {currentUser && (
                        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Logged in as</p>
                            <p className="text-2xl font-bold text-gray-900">{currentUser.name}</p>
                            <p className="text-sm text-gray-500 capitalize">{currentUser.role.replace("_", " ")}</p>
                        </div>
                    )}

                    <div className="space-y-1">
                        <Link
                            href="/"
                            className="flex items-center gap-3 py-4 text-xl font-bold text-gray-900 border-b border-gray-50"
                            onClick={closeMenus}
                        >
                            <Home className="h-5 w-5 text-gray-400" /> Home
                        </Link>
                        {currentUser && (
                            <Link
                                href={getDashboardLink()}
                                className="flex items-center gap-3 py-4 text-xl font-bold text-green-700 border-b border-gray-50"
                                onClick={closeMenus}
                            >
                                <LayoutDashboard className="h-5 w-5" /> Dashboard
                            </Link>
                        )}
                        <Link
                            href="/farmer/mandi"
                            className="flex items-center gap-3 py-4 text-xl font-bold text-gray-900 border-b border-gray-50"
                            onClick={closeMenus}
                        >
                            <TrendingUp className="h-5 w-5 text-gray-400" /> Mandi Prices
                        </Link>
                    </div>

                    {!currentUser ? (
                        <div className="mt-8 space-y-6">
                            <div>
                                <div className="mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Login as</div>
                                <div className="grid gap-3">
                                    {userTypes.map((type) => (
                                        <Link
                                            key={type.href}
                                            href={type.href}
                                            className="flex items-center gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-100 active:bg-green-50"
                                            onClick={closeMenus}
                                        >
                                            <span className="text-xl">{type.icon}</span>
                                            <div className="font-semibold text-gray-800">{type.label}</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg rounded-2xl" asChild>
                                <Link href="/get-started">Get Started</Link>
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={() => { logout(); closeMenus(); }} variant="destructive" className="w-full h-14 mt-auto rounded-2xl text-lg">
                            <LogOut className="h-5 w-5 mr-3" /> Logout
                        </Button>
                    )}
                </nav>
            </div>
        </header>
    );
}
