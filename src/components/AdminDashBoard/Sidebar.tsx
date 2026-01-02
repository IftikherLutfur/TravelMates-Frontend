import React from "react";
import { Home, Users, CreditCard, Map, Star, LogOut } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className="flex h-screen w-64 flex-col justify-between border-e border-gray-100 bg-white">
            {/* Top section */}
            <div className="px-4 py-6">
                {/* Logo / Title */}
                <div className="mb-6 flex items-center gap-2 px-4">
                    <span className="text-lg font-semibold text-gray-800">
                        Admin Panel
                    </span>
                </div>

                {/* Menu */}
                <ul className="space-y-1">
                    <li>
                        <a className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <Home size={18} />
                            Home
                        </a>
                    </li>

                    <li className="flex items-center gap-2">
                        
                            <Users size={18} />
                            <Link href="Dashboard/AllUsers">Users</Link>
                        
                    </li>

                    <li className="flex items-center gap-2">
                       
                            <Map size={18} />
                            Travel Plans
                       
                    </li>

                    <li className="flex items-center gap-2">
                       
                            <CreditCard size={18} />
                            Payment
                       
                    </li>

                    <li className="flex items-center gap-2">
                       
                            <Star size={18} />
                            Reviews
                       
                    </li>
                </ul>
            </div>

            {/* Bottom section */}
            <div className="border-t border-gray-100 p-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
