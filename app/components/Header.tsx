// app/components/Header.tsx
"use client";

import { Sprout, Menu, X, ChevronDown, LogOut, LayoutDashboard, Home, TrendingUp, Bell, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { useApp } from "@/app/context/AppContext";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

export function Header() {
    const { currentUser, logout } = useApp();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Enhanced scroll detection for sticky header effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    const userTypes = [
        { label: "Farmer", href: "/auth/farmer/login", icon: "🌾", description: "Manage your farm", color: "green" },
        { label: "Labourer", href: "/auth/labour/login", icon: "👷", description: "Find work opportunities", color: "blue" },
        { label: "Equipment Owner", href: "/auth/owner/login", icon: "🚜", description: "List your machinery", color: "orange" },
        { label: "Admin", href: "/auth/admin/login", icon: "🔐", description: "System Administration", color: "purple" },
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
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/50"
                        : "bg-white/95 backdrop-blur-md border-b border-gray-100"
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo with enhanced styling */}
                        <Link
                            href="/"
                            className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-105"
                            onClick={closeMenus}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg shadow-green-600/20">
                                    <Sprout className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Krishi Hub
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1 lg:gap-2">

                            <Link
                                href="/farmer/mandi"
                                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 rounded-lg transition-all duration-200 hover:bg-green-50/50 group"
                            >
                                Mandi Prices
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
                            </Link>
                            <Link
                                href="/farmer/equipment"
                                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 rounded-lg transition-all duration-200 hover:bg-green-50/50 group"
                            >
                                Equipment rental
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
                            </Link>
                            <Link
                                href="/farmer/equipment"
                                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 rounded-lg transition-all duration-200 hover:bg-green-50/50 group"
                            >
                                Marketplace
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
                            </Link>

                            {currentUser ? (
                                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                                    {/* Dashboard Link */}
                                    <Link
                                        href={getDashboardLink()}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                            pathname.includes('dashboard')
                                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                                                : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                                        )}
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span className="hidden lg:inline">Dashboard</span>
                                    </Link>

                                    {/* User Profile Section */}
                                    <div className="flex items-center gap-3">
                                        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Bell className="h-5 w-5" />
                                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                                        </button>

                                        <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200">
                                            <div className="text-right hidden lg:block">
                                                <p className="text-sm font-bold text-gray-900 leading-tight">{currentUser.name}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                                    {currentUser.role.replace("_", " ")}
                                                </p>
                                            </div>
                                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                                {currentUser.name.charAt(0).toUpperCase()}
                                            </div>
                                            <button
                                                onClick={logout}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Logout"
                                            >
                                                <LogOut className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 ml-4">
                                    {/* Enhanced Login Dropdown */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                                            className={cn(
                                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                                                loginDropdownOpen
                                                    ? "bg-green-50 text-green-700"
                                                    : "text-gray-600 hover:text-green-600 hover:bg-green-50/50"
                                            )}
                                        >
                                            <User className="h-4 w-4" />
                                            Login
                                            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", loginDropdownOpen && "rotate-180")} />
                                        </button>

                                        {loginDropdownOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() => setLoginDropdownOpen(false)}
                                                />
                                                <div className="absolute right-0 top-full mt-3 w-80 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl p-3 shadow-2xl shadow-black/10 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <div className="mb-3 px-3 py-2 flex items-center justify-between">
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                            Choose Your Role
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">Select to login</span>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        {userTypes.map((type) => (
                                                            <Link
                                                                key={type.href}
                                                                href={type.href}
                                                                className="flex items-start gap-3 rounded-xl p-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group border border-transparent hover:border-green-200"
                                                                onClick={closeMenus}
                                                            >
                                                                <span className="text-2xl transform transition-transform duration-200 group-hover:scale-110">
                                                                    {type.icon}
                                                                </span>
                                                                <div className="flex-1">
                                                                    <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                                                                        {type.label}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 group-hover:text-gray-600">
                                                                        {type.description}
                                                                    </div>
                                                                </div>
                                                                <ChevronDown className="h-4 w-4 -rotate-90 text-gray-300 group-hover:text-green-600 transition-colors" />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <Button
                                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-6 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-200 hover:scale-105"
                                        asChild
                                    >
                                        <Link href="/get-started">Get Started</Link>
                                    </Button>
                                </div>
                            )}
                        </nav>

                        {/* Enhanced Mobile Menu Button */}
                        <button
                            className={cn(
                                "md:hidden relative z-50 p-2 rounded-xl transition-all duration-200",
                                mobileMenuOpen
                                    ? "bg-red-50 text-red-600"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Enhanced Mobile Menu Sidebar */}
            <div className={cn(
                "fixed inset-0 z-40 md:hidden transition-all duration-300",
                mobileMenuOpen ? "visible" : "invisible"
            )}>
                {/* Backdrop with blur */}
                <div
                    className={cn(
                        "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                        mobileMenuOpen ? "opacity-100" : "opacity-0"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Sidebar */}
                <div className={cn(
                    "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300",
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <nav className="flex flex-col h-full pt-20 px-5 pb-8 overflow-y-auto">
                        {currentUser && (
                            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 border border-green-200 shadow-inner">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Logged in as</p>
                                        <p className="text-lg font-bold text-gray-900">{currentUser.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="px-2 py-1 rounded-full bg-green-200 text-green-800 font-semibold capitalize">
                                        {currentUser.role.replace("_", " ")}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 mb-8">
                            <Link
                                href="/"
                                className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold text-gray-900 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 transition-all border border-transparent hover:border-gray-200"
                                onClick={closeMenus}
                            >
                                <Home className="h-5 w-5 text-gray-400" />
                                Home
                            </Link>
                            {currentUser && (
                                <Link
                                    href={getDashboardLink()}
                                    className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30"
                                    onClick={closeMenus}
                                >
                                    <LayoutDashboard className="h-5 w-5" />
                                    Dashboard
                                </Link>
                            )}
                            <Link
                                href="/farmer/mandi"
                                className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold text-gray-900 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 transition-all border border-transparent hover:border-gray-200"
                                onClick={closeMenus}
                            >
                                <TrendingUp className="h-5 w-5 text-gray-400" />
                                Mandi Prices
                            </Link>
                        </div>

                        {!currentUser ? (
                            <div className="space-y-6">
                                <div>
                                    <div className="mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
                                        Login as
                                    </div>
                                    <div className="space-y-2">
                                        {userTypes.map((type) => (
                                            <Link
                                                key={type.href}
                                                href={type.href}
                                                className="flex items-center gap-3 py-4 px-4 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all active:scale-[0.98]"
                                                onClick={closeMenus}
                                            >
                                                <span className="text-2xl">{type.icon}</span>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900">{type.label}</div>
                                                    <div className="text-xs text-gray-500">{type.description}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <Button
                                    className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-base font-semibold rounded-2xl shadow-xl shadow-green-600/30"
                                    asChild
                                >
                                    <Link href="/get-started">Get Started Free</Link>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => { logout(); closeMenus(); }}
                                className="w-full h-14 mt-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl text-base font-semibold shadow-xl shadow-red-500/30"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Logout
                            </Button>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
}
