import { Sprout, Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-green-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sprout className="h-8 w-8 text-green-400" />
                            <span className="text-2xl font-bold tracking-tight">Krishi Hub</span>
                        </div>
                        <p className="text-green-100 max-w-xs leading-relaxed">
                            Empowering the agricultural community by connecting farmers, labourers, and equipment owners for a prosperous future.
                        </p>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-green-400">Quick Links</h3>
                        <ul className="space-y-2 text-green-100">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/auth/farmer/login" className="hover:text-white transition-colors">For Farmers</a></li>
                            <li><a href="/auth/labour/login" className="hover:text-white transition-colors">For Labourers</a></li>
                            <li><a href="/auth/owner/login" className="hover:text-white transition-colors">List Equipment</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-green-400">Contact Us</h3>
                        <div className="space-y-2 text-green-100">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>support@krishihub.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+91 1800-123-4567</span>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="hover:text-green-400 transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-green-400 transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="hover:text-green-400 transition-colors"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-green-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-green-300">
                    <p>© {new Date().getFullYear()} Krishi Hub. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
