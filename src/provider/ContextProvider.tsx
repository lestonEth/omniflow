"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "@/components/modals/Toast";

// Toast Context Type
interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
}

interface ContextProps {
    showToast: (message: string, type?: "success" | "error" | "info") => void;
    currentTab: string;
    setCurrentTab: (tab: string) => void;
}

// Create Context
const AppContext = createContext<ContextProps | undefined>(undefined);

// Provider Component
export function ContextProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<ToastProps | null>(null);
    const [currentTab, setCurrentTab] = useState<string>("dashboard");

    const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000); // Auto-dismiss after 3 seconds
    };

    return (
        <AppContext.Provider value={{ showToast, currentTab, setCurrentTab }}>
            {children}

            {/* Render Toast Component */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </AppContext.Provider>
    );
}

// Hook for consuming context
export function useAppProvider() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useProvider must be used within a ContextProvider");
    }
    return context;
}
