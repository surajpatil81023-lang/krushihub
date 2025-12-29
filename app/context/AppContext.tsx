"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- Types ---

export type UserRole = "farmer" | "labourer" | "equipment_owner" | "admin" | "guest";

interface BaseUser {
    id: string;
    name: string;
    mobile: string;
    village?: string;     // Optional for Admin
    district?: string;    // Optional for Admin
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
    type: string; // Tractor, Tiller, etc.
    rentPerDay: number;
    location: string;
    ownerId: string;
    available: boolean;
}

export interface Booking {
    id: string;
    equipmentId: string;
    farmerId: string;
    date: string;
    status: "pending" | "approved" | "rejected";
    farmerName?: string; // Helper for display
    equipmentName?: string; // Helper for display
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
    login: (mobile: string, role: UserRole) => void;
    logout: () => void;
    registerLabourer: (data: Omit<LabourerProfile, "id">) => void;
    registerFarmer: (data: Omit<FarmerProfile, "id">) => void;
    registerOwner: (data: Omit<EquipmentOwnerProfile, "id">) => void;
    updateLabourerProfile: (data: Partial<LabourerProfile>) => void;

    // Equipment Data
    equipment: Equipment[];
    addEquipment: (data: Omit<Equipment, "id">) => void;
    toggleAvailability: (id: string) => void;
    deleteEquipment: (id: string) => void;

    // Booking Data
    bookings: Booking[];
    createBooking: (equipmentId: string, date: string) => void;
    updateBookingStatus: (bookingId: string, status: "approved" | "rejected") => void;

    // Mandi Data
    mandiRecords: MandiRecord[];
    addMandiRecord: (data: Omit<MandiRecord, "id">) => void;
    deleteMandiRecord: (id: string) => void;

    // Data access
    labourers: LabourerProfile[];
    farmers: FarmerProfile[];
    owners: EquipmentOwnerProfile[];
}

// --- Mock Data ---

const MOCK_LABOURERS: LabourerProfile[] = [
    {
        id: "l1",
        name: "Ramesh Kumar",
        mobile: "9876543210",
        role: "labourer",
        village: "Rampur",
        district: "Pune",
        skills: ["Harvesting", "Sowing"],
        expectedWage: 500,
    },
    {
        id: "l2",
        name: "Suresh Patil",
        mobile: "9876543211",
        role: "labourer",
        village: "Sonpur",
        district: "Nashik",
        skills: ["Spraying", "Weeding"],
        expectedWage: 450,
    },
    {
        id: "l3",
        name: "Mahesh Yadav",
        mobile: "9876543212",
        role: "labourer",
        village: "Rampur",
        district: "Pune",
        skills: ["Ploughing", "Harvesting"],
        expectedWage: 600,
    },
];

const MOCK_FARMERS: FarmerProfile[] = [
    {
        id: "f1",
        name: "Vijay Deshmukh",
        mobile: "9123456789",
        role: "farmer",
        village: "Rampur",
        district: "Pune",
    },
];

const MOCK_OWNERS: EquipmentOwnerProfile[] = [
    {
        id: "o1",
        name: "Sanjay Tractor Services",
        mobile: "9988776655",
        role: "equipment_owner",
        village: "Rampur",
        district: "Pune",
    }
];

const MOCK_ADMIN: AdminProfile = {
    id: "admin1",
    name: "System Admin",
    mobile: "9999999999",
    role: "admin",
};

const MOCK_EQUIPMENT: Equipment[] = [
    {
        id: "e1",
        name: "Mahindra 575",
        type: "Tractor",
        rentPerDay: 1200,
        location: "Rampur, Pune",
        ownerId: "o1",
        available: true,
    },
    {
        id: "e2",
        name: "Power Tiller",
        type: "Tiller",
        rentPerDay: 800,
        location: "Khadki, Pune",
        ownerId: "o1",
        available: true,
    }
];

const MOCK_MANDI: MandiRecord[] = [
    {
        id: "m1",
        cropName: "Wheat",
        minPrice: 2100,
        maxPrice: 2400,
        modalPrice: 2250,
        location: "Pune APMC",
        date: new Date().toISOString().split('T')[0],
    },
    {
        id: "m2",
        cropName: "Onion",
        minPrice: 1500,
        maxPrice: 2800,
        modalPrice: 2200,
        location: "Nashik APMC",
        date: new Date().toISOString().split('T')[0],
    }
];

// --- Context ---

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [labourers, setLabourers] = useState<LabourerProfile[]>(MOCK_LABOURERS);
    const [farmers, setFarmers] = useState<FarmerProfile[]>(MOCK_FARMERS);
    const [owners, setOwners] = useState<EquipmentOwnerProfile[]>(MOCK_OWNERS);
    const [equipment, setEquipment] = useState<Equipment[]>(MOCK_EQUIPMENT);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [mandiRecords, setMandiRecords] = useState<MandiRecord[]>(MOCK_MANDI);

    // Hydrate from localStorage if needed (skipping for simplicity now, just in-memory)

    const login = (mobile: string, role: UserRole) => {
        let user: User | undefined;
        if (role === "labourer") {
            user = labourers.find((l) => l.mobile === mobile);
        } else if (role === "farmer") {
            user = farmers.find((f) => f.mobile === mobile);
        } else if (role === "equipment_owner") {
            user = owners.find((o) => o.mobile === mobile);
        } else if (role === "admin" && mobile === MOCK_ADMIN.mobile) {
            user = MOCK_ADMIN;
        }

        if (user) setCurrentUser(user);
        else alert(`${role.replace("_", " ")} not found!`);
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const registerLabourer = (data: Omit<LabourerProfile, "id">) => {
        const newUser: LabourerProfile = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            role: "labourer",
        };
        setLabourers([...labourers, newUser]);
        setCurrentUser(newUser);
    };

    const registerFarmer = (data: Omit<FarmerProfile, "id">) => {
        const newUser: FarmerProfile = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            role: "farmer",
        };
        setFarmers([...farmers, newUser]);
        setCurrentUser(newUser);
    };

    const registerOwner = (data: Omit<EquipmentOwnerProfile, "id">) => {
        const newUser: EquipmentOwnerProfile = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            role: "equipment_owner",
        };
        setOwners([...owners, newUser]);
        setCurrentUser(newUser);
    };

    const updateLabourerProfile = (data: Partial<LabourerProfile>) => {
        if (!currentUser || currentUser.role !== "labourer") return;

        const updatedUser = { ...currentUser, ...data } as LabourerProfile;
        setCurrentUser(updatedUser);

        setLabourers((prev) =>
            prev.map((l) => (l.id === currentUser.id ? updatedUser : l))
        );
    };

    const addEquipment = (data: Omit<Equipment, "id">) => {
        const newEq: Equipment = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
        };
        setEquipment([...equipment, newEq]);
    };

    const toggleAvailability = (id: string) => {
        setEquipment(prev => prev.map(e => e.id === id ? { ...e, available: !e.available } : e));
    };

    const deleteEquipment = (id: string) => {
        setEquipment(prev => prev.filter(e => e.id !== id));
    };

    const createBooking = (equipmentId: string, date: string) => {
        if (!currentUser || currentUser.role !== "farmer") return;

        const eq = equipment.find(e => e.id === equipmentId);
        if (!eq) return;

        const newBooking: Booking = {
            id: Math.random().toString(36).substr(2, 9),
            equipmentId,
            farmerId: currentUser.id,
            date,
            status: "pending",
            farmerName: currentUser.name,
            equipmentName: eq.name,
        };
        setBookings([...bookings, newBooking]);
        alert("Booking request sent!");
    };

    const updateBookingStatus = (bookingId: string, status: "approved" | "rejected") => {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    };

    const addMandiRecord = (data: Omit<MandiRecord, "id">) => {
        const newRecord: MandiRecord = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
        };
        setMandiRecords([...mandiRecords, newRecord]);
    };

    const deleteMandiRecord = (id: string) => {
        setMandiRecords(prev => prev.filter(m => m.id !== id));
    };

    return (
        <AppContext.Provider
            value={{
                currentUser,
                login,
                logout,
                registerLabourer,
                registerFarmer,
                registerOwner,
                updateLabourerProfile,
                labourers,
                farmers,
                owners,
                equipment,
                addEquipment,
                toggleAvailability,
                deleteEquipment,
                bookings,
                createBooking,
                updateBookingStatus,
                mandiRecords,
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
