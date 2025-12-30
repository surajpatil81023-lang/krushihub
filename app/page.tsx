import { Button } from "@/app/components/ui/button";
import {
  Sprout,
  Tractor,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  MapPin,
  Clock,
  IndianRupee,
  Smartphone,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-white pb-20 pt-16 lg:pb-32 lg:pt-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-8">


            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl leading-tight">
              The Digital Ecosystem for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
                Modern Farming
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed">
              Connect with skilled labourers, rent modern equipment, track live mandi prices, and grow your agricultural business—all in one unified platform.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white h-14 px-8 text-base font-semibold rounded-full shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                asChild
              >
                <Link href="/get-started">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-14 px-8 text-base font-semibold rounded-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-green-600 hover:text-green-700 transition-all"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>100% Verified Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>Real-time Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0 opacity-30">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-green-300 rounded-full blur-[120px]" />
          <div className="absolute top-[10%] -right-[15%] w-[50%] h-[70%] bg-emerald-200 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[30%] w-[40%] h-[40%] bg-cyan-200 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Stats Section */}


      {/* Main Features Grid */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800">
              Platform Features
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-5xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for every stakeholder in the agricultural ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 - Labour Management */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-white to-green-50/30 p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-green-100/50 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              <div className="h-14 w-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Labour Management</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Connect with skilled farm labourers in your vicinity. View verified profiles, skills, ratings, and hire on-demand or long-term.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Verified identity & skills
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Location-based filtering
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                  Real-time availability
                </li>
              </ul>
              <Link
                href="/farmer/labourers"
                className="inline-flex items-center text-sm font-semibold text-green-600 group-hover:text-green-700"
              >
                Hire labourers <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Feature 2 - Equipment Rental */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-white to-orange-50/30 p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-orange-100/50 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              <div className="h-14 w-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <Tractor className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Equipment Rental</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Access modern farming machinery without heavy investment. Rent tractors, tillers, harvesters, and more by the hour or day.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 mr-3 flex-shrink-0" />
                  Wide range of machinery
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 mr-3 flex-shrink-0" />
                  Transparent hourly pricing
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 mr-3 flex-shrink-0" />
                  Instant booking & delivery
                </li>
              </ul>
              <Link
                href="/farmer/equipment"
                className="inline-flex items-center text-sm font-semibold text-orange-600 group-hover:text-orange-700"
              >
                Browse equipment <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Feature 3 - Mandi Insights */}
            <div className="group relative rounded-2xl bg-gradient-to-br from-white to-blue-50/30 p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              <div className="h-14 w-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live Mandi Prices</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Stay updated with real-time market prices across 50+ mandis. Make data-driven decisions on when and where to sell your produce.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                  Live price updates
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                  Historical trends & analytics
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 mr-3 flex-shrink-0" />
                  Price alerts & notifications
                </li>
              </ul>
              <Link
                href="/farmer/mandi"
                className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700"
              >
                View live prices <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-800">
              Simple Process
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-5xl">
              Get started in 3 easy steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sign Up</h3>
              <p className="text-gray-600">
                Create your account as a farmer, labourer, or equipment owner in under 2 minutes
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">Connect</h3>
              <p className="text-gray-600">
                Browse listings, check profiles, compare prices, and connect with the right people
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">Grow</h3>
              <p className="text-gray-600">
                Complete transactions securely, build relationships, and scale your operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Location-Based</h4>
                <p className="text-sm text-gray-600">Find services near you with GPS-enabled search</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">24/7 Availability</h4>
                <p className="text-sm text-gray-600">Access platform anytime, anywhere from mobile or web</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Secure & Safe</h4>
                <p className="text-sm text-gray-600">Verified profiles and secure payment gateway</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Mobile First</h4>
                <p className="text-sm text-gray-600">Optimized for smartphones with offline capability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your farming business?
          </h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of farmers, labourers, and equipment owners who are saving time, reducing costs, and increasing profits with Krishi Hub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-white text-green-900 hover:bg-green-50 h-14 px-8 text-lg rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              asChild
            >
              <Link href="/get-started">Join Now</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 h-14 px-8 text-lg rounded-full font-bold"
              asChild
            >
              <Link href="/#features">Explore Features</Link>
            </Button>
          </div>
        </div>

        <Leaf className="absolute -bottom-10 -right-10 h-64 w-64 text-green-800 opacity-20 rotate-45" />
        <Leaf className="absolute top-10 -left-20 h-48 w-48 text-green-800 opacity-15 -rotate-12" />
        <Leaf className="absolute bottom-20 left-[20%] h-32 w-32 text-emerald-700 opacity-10 rotate-90" />
      </section>
    </div>
  );
}
