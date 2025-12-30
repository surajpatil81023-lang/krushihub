"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "@/app/lib/api";
import Cookies from "js-cookie";

// --- Types ---
// Re-using types from before, but aligned with DB models where possible

export type UserRole = "farmer" | "labourer" | "equipment_owner" | "admin" | "guest";

interface BaseUser {
    id: string;
    name: string;
    mobile: string;
    village?: string;     // Optional for Admin/Guest
    district?: string;    // Optional for Admin/Guest
    role: UserRole;
}

export interface LabourerProfile extends BaseUser {
    role: "labourer";
    skills: string[];
    expectedWage: number;
    village: string;
    district: string;
}

export interface FarmerProfile extends BaseUser {
    role: "farmer";
    village: string;
    district: string;
}

export interface EquipmentOwnerProfile extends BaseUser {
    role: "equipment_owner";
    village: string;
    district: string;
}

export interface AdminProfile extends BaseUser {
    role: "admin";
}

export type User = LabourerProfile | FarmerProfile | EquipmentOwnerProfile | AdminProfile;

export interface Equipment {
    id: string;
    name: string;
    type: string;
    rentPerDay: number;
    location: string;
    ownerId: string;
    owner?: { name: string; phone: string; email?: string }; // populated details
    available: boolean;
}

export interface Booking {
    id: string;
    equipmentId: string;
    farmerId: string;
    date: string;
    status: "pending" | "approved" | "rejected";
    farmerName?: string;
    equipmentName?: string;
}

export interface MandiRecord {
    id: string;
    cropName: string;
    minPrice: number;
    maxPrice: number;
    modalPrice: number;
    location: string;
    date: string;
}

interface AppContextType {
    currentUser: User | null;
    login: (mobile: string, role: string, password?: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;

    // Data access
    labourers: LabourerProfile[];
    equipment: Equipment[];
    bookings: Booking[];
    mandiRecords: MandiRecord[];

    // Actions
    fetchLabourers: (filters?: any) => Promise<void>;
    updateLabourerProfile: (data: Partial<LabourerProfile>) => Promise<void>;

    fetchEquipment: (filters?: any) => Promise<void>;
    addEquipment: (data: Omit<Equipment, "id" | "ownerId" | "owner" | "available">) => Promise<void>;
    deleteEquipment: (id: string) => Promise<void>;

    createBooking: (equipmentId: string, date: string) => Promise<void>;
    updateBookingStatus: (bookingId: string, status: "approved" | "rejected") => Promise<void>;

    fetchMandiRecords: (crop?: string) => Promise<void>;
    addMandiRecord: (data: Omit<MandiRecord, "id">) => Promise<void>;
    deleteMandiRecord: (id: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [labourers, setLabourers] = useState<LabourerProfile[]>([]);
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [mandiRecords, setMandiRecords] = useState<MandiRecord[]>([]);

    // --- Auth ---

    // Restore session
    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            try {
                setCurrentUser(JSON.parse(userCookie));
            } catch (e) {
                console.error("Failed to parse user cookie", e);
            }
        }
    }, []);

    const login = async (mobile: string, role: string, password?: string) => {
        try {
            // For MVP, if password isn't provided in UI yet, we might fallback or error.
            // Assuming UI will update to send password. 
            // If strictly sticking to current UI which might not ask for password in some flows,
            // we'd need to adjust. But backend requires it.
            // For now, let's assume password is passed or we use a default dev password if missing (NOT SAFe but works for transition)
            const pwd = password || "password123";

            const data = await apiRequest("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ mobile, role, password: pwd }),
            });

            setCurrentUser(data.user);
            Cookies.set("user", JSON.stringify(data.user), { expires: 7 }); // 7 days
        } catch (error) {
            console.error(error);
            alert("Login failed: " + (error as Error).message);
            throw error;
        }
    };

    const register = async (userData: any) => {
        try {
            await apiRequest("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(userData),
            });
            // Auto login after register? Or just redirect. 
            // For now, let's just let the caller handle next steps (like calling login)
        } catch (error) {
            console.error(error);
            alert("Registration failed: " + (error as Error).message);
            throw error;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        Cookies.remove("user");
        window.location.href = "/";
    };

    // --- Labourers ---

    const fetchLabourers = async (filters: any = {}) => {
        try {
            const query = new URLSearchParams(filters).toString();
            const data = await apiRequest(`/api/labourers?${query}`);
            setLabourers(data);
        } catch (error) {
            console.error("Failed to fetch labourers", error);
        }
    };

    const updateLabourerProfile = async (data: Partial<LabourerProfile>) => {
        if (!currentUser) return;
        try {
            const res = await apiRequest("/api/labourers", {
                method: "PUT",
                body: JSON.stringify({ id: currentUser.id, ...data }),
            });
            setCurrentUser(res.user);
            Cookies.set("user", JSON.stringify(res.user), { expires: 7 });

            // Update list if currently viewing
            setLabourers(prev => prev.map(l => l.id === res.user.id ? res.user : l));
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Update failed");
        }
    };

    // --- Equipment ---

    const fetchEquipment = async (filters: any = {}) => {
        try {
            const query = new URLSearchParams(filters).toString();
            const data = await apiRequest(`/api/equipment?${query}`);
            setEquipment(data);
        } catch (error) {
            console.error("Failed to fetch equipment", error);
        }
    };

    const addEquipment = async (data: Omit<Equipment, "id" | "ownerId" | "owner" | "available">) => {
        if (!currentUser) return;
        try {
            await apiRequest("/api/equipment", {
                method: "POST",
                body: JSON.stringify({ ...data, ownerId: currentUser.id }),
            });
            await fetchEquipment(); // Refresh list
        } catch (error) {
            console.error("Failed to add equipment", error);
            alert("Failed to add equipment");
        }
    };

    const deleteEquipment = async (id: string) => {
        try {
            await apiRequest(`/api/equipment?id=${id}`, { method: "DELETE" });
            setEquipment(prev => prev.filter(e => e.id !== id));
        } catch (error) {
            console.error("Failed to delete equipment", error);
            alert("Failed to delete equipment");
        }
    };

    // --- Bookings ---

    const createBooking = async (equipmentId: string, date: string) => {
        if (!currentUser) return;
        try {
            await apiRequest("/api/bookings", {
                method: "POST",
                body: JSON.stringify({ equipmentId, farmerId: currentUser.id, date }),
            });
            alert("Booking request sent!");
            // Refresh bookings if we were tracking them
            // fetchBookings();
        } catch (error) {
            console.error("Booking failed", error);
            alert("Booking failed: " + (error as Error).message);
        }
    };

    const updateBookingStatus = async (bookingId: string, status: "approved" | "rejected") => {
        try {
            await apiRequest("/api/bookings", {
                method: "PUT",
                body: JSON.stringify({ bookingId, status }),
            });
            // Ideally refresh list
            setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
        } catch (error) {
            console.error("Update booking failed", error);
            alert("Action failed");
        }
    };

    // Initial fetch for bookings if needed (e.g. for owner dashboard)
    // We might want a dedicated fetchBookings function exposed in context
    useEffect(() => {
        if (currentUser && (currentUser.role === 'farmer' || currentUser.role === 'equipment_owner')) {
            // fetchBookings(); // To be implemented fully if needed globally
            // For now, pages might fetch their own data or we add it here
            const fetchMyBookings = async () => {
                try {
                    const query = currentUser.role === 'farmer' ? `farmerId=${currentUser.id}` : `ownerId=${currentUser.id}`;
                    const data = await apiRequest(`/api/bookings?${query}`);
                    setBookings(data);
                } catch (e) { console.error(e) }
            };
            fetchMyBookings();
        }
    }, [currentUser]);


    // --- Mandi ---

    const fetchMandiRecords = async (crop?: string) => {
        try {
            const query = crop ? `crop=${crop}` : "";
            const data = await apiRequest(`/api/mandi?${query}`);
            setMandiRecords(data);
        } catch (error) {
            console.error("Failed to fetch mandi records", error);
        }
    };

    const addMandiRecord = async (data: Omit<MandiRecord, "id">) => {
        try {
            await apiRequest("/api/mandi", {
                method: "POST",
                body: JSON.stringify(data),
            });
            await fetchMandiRecords();
        } catch (error) {
            console.error("Failed to add mandi record", error);
            alert("Failed to add record");
        }
    };

    const deleteMandiRecord = async (id: string) => {
        try {
            await apiRequest(`/api/mandi?id=${id}`, { method: "DELETE" });
            setMandiRecords(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error("Failed to delete record", error);
        }
    };

    // Initial Data Load
    useEffect(() => {
        fetchEquipment();
        fetchMandiRecords();
        fetchLabourers();
    }, []);

    return (
        <AppContext.Provider
            value={{
                currentUser,
                login,
                register,
                logout,
                labourers,
                equipment,
                bookings,
                mandiRecords,
                fetchLabourers,
                updateLabourerProfile,
                fetchEquipment,
                addEquipment,
                deleteEquipment,
                createBooking,
                updateBookingStatus,
                fetchMandiRecords,
                addMandiRecord,
                deleteMandiRecord,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
