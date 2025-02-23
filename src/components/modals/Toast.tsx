"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
    onClose: () => void;
}

const toastStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
};

export default function Toast({ message, type = "info", onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000); // Auto-close after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg ${toastStyles[type]}`}
                >
                    <div className="flex items-center">
                        <span className="mr-3">{message}</span>
                        <button onClick={onClose} className="text-lg font-bold ml-4">×</button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
