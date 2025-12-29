// app/components/Footer.tsx
import { Sprout, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send, ExternalLink, Github, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 border-t border-gray-200">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Column - Spans 2 columns on large screens */}
                    <div className="lg:col-span-2 space-y-5">
                        <Link href="/" className="group inline-flex items-center gap-2.5 transition-all duration-300 hover:scale-105">
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                                <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-lg shadow-green-600/20">
                                    <Sprout className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Krishi Hub
                            </span>
                        </Link>
                        <p className="text-gray-600 max-w-sm leading-relaxed text-sm">
                            Empowering the agricultural community by connecting farmers, labourers, and equipment owners for a sustainable and prosperous future.
                        </p>

                        {/* Newsletter Subscription */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-900">Stay Updated</h4>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                                />
                                <button className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40">
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href="#"
                                className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-blue-400 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Platform</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-4" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/farmer/login" className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-4" />
                                    For Farmers
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/labour/login" className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-4" />
                                    For Labourers
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/owner/login" className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-4" />
                                    Equipment Owners
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/farmer/mandi" className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-4" />
                                    Mandi Prices
                                </Link>
                            </li>
                            <li>
                                <Link href="/farmer/equipment" className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-4" />
                                    Equipment Marketplace
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-4" />
                                    Blog & Tips
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-sm text-gray-600 hover:text-green-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-0 h-0.5 bg-green-600 transition-all duration-200 group-hover:w-4" />
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:support@krishihub.com"
                                    className="flex items-start gap-3 text-sm text-gray-600 hover:text-green-600 transition-colors group"
                                >
                                    <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="break-all">support@krishihub.com</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+911800123456"
                                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-green-600 transition-colors group"
                                >
                                    <Phone className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span>+91 1800-123-4567</span>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-start gap-3 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600" />
                                    <span>New Delhi, India</span>
                                </div>
                            </li>
                        </ul>

                        {/* Trust Badges */}
                        <div className="pt-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="px-2 py-1 bg-green-100 text-green-700 rounded-md font-semibold">
                                    ✓ Verified Platform
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-semibold">
                                    🔒 Secure Payments
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500 text-center md:text-left">
                            © {currentYear} <span className="font-semibold text-gray-700">Krishi Hub</span>. All rights reserved. Built with 💚 for farmers.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <Link href="/privacy" className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1">
                                Privacy Policy
                                <ExternalLink className="h-3 w-3" />
                            </Link>
                            <Link href="/terms" className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1">
                                Terms of Service
                                <ExternalLink className="h-3 w-3" />
                            </Link>
                            <Link href="/cookies" className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1">
                                Cookie Policy
                                <ExternalLink className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Accent */}
            <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500" />
        </footer>
    );
}
