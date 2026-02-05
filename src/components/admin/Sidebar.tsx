"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard" },
        { name: "Projects", href: "/admin/projects" },
        { name: "Messages", href: "/admin/messages" },
    ];

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return (
        <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">
                Admin Panel
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg transition ${pathname === item.href ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition">
                    Logout
                </button>
            </div>
        </div>
    );
}  
    