"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { getRawToken } from "@/lib/auth-utils";
import Image from "next/image";

interface Travel {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    budgetRange: number;
    travelType: string;
    createdAt: string;
    userEmail: string; // make sure your travel data has this
}

interface User {
    name: string;
    email: string;
    phone?: string;
    // add other fields your API returns
}

interface AllTravelPlanForAdminProps {
    travels: Travel[];
}

const AllTravelPlanForAdmin: React.FC<AllTravelPlanForAdminProps> = ({ travels }) => {
    const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const openModal = (travel: Travel) => {
        setSelectedTravel(travel);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTravel(null);
        setUserDetails(null);
        setIsModalOpen(false);
    };

    // Fetch user details by email when modal opens
    useEffect(() => {
        if (selectedTravel?.userEmail) {
            const fetchUser = async () => {
                const token = await getRawToken()
                console.log(token, "token")
                try {
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${selectedTravel.userEmail}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log(res.data, "Hello")
                    setUserDetails(res.data);
                } catch (err) {
                    console.error("Failed to fetch user details:", err);
                }
            };
            fetchUser();
        }
    }, [selectedTravel]);

    const handleDeleteTravel = async (travelId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this travel plan?");
        if (!confirmDelete) return;

        try {
            const token = await getRawToken();

            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/travel/${travelId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Travel plan deleted successfully");
            closeModal();

            // OPTIONAL (best practice):
            // refresh data from parent or revalidate route
            // router.refresh()  (if using App Router)
        } catch (error) {
            console.error("Failed to delete travel:", error);
            alert("Failed to delete travel plan");
        }
    };


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="ltr:text-left rtl:text-right">
                    <tr className="*:font-medium *:text-gray-900">
                        <th className="px-3 py-2">Destination</th>
                        <th className="px-3 py-2">Start Date</th>
                        <th className="px-3 py-2">End Date</th>
                        <th className="px-3 py-2">Budget</th>
                        <th className="px-3 py-2">Travel Type</th>
                        <th className="px-3 py-2">Created At</th>
                        <th className="px-3 py-2">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {travels.map((travel) => (
                        <tr key={travel.id} className="*:text-gray-900 *:first:font-medium">
                            <td className="px-3 py-2">{travel.destination}</td>
                            <td className="px-3 py-2">{formatDate(travel.startDate)}</td>
                            <td className="px-3 py-2">{formatDate(travel.endDate)}</td>
                            <td className="px-3 py-2">{travel.budgetRange} BDT</td>
                            <td className="px-3 py-2">{travel.travelType}</td>
                            <td className="px-3 py-2">{formatDate(travel.createdAt)}</td>
                            <td>
                                <Button onClick={() => openModal(travel)}>Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && selectedTravel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                        <h2 className="text-xl font-bold mb-4">Travel Details</h2>

                        <p><strong>Destination:</strong> {selectedTravel.destination}</p>
                        <p><strong>Start Date:</strong> {formatDate(selectedTravel.startDate)}</p>
                        <p><strong>End Date:</strong> {formatDate(selectedTravel.endDate)}</p>
                        <p><strong>Budget:</strong> {selectedTravel.budgetRange} BDT</p>
                        <p><strong>Travel Type:</strong> {selectedTravel.travelType}</p>
                        <p><strong>uSER EMAIL:</strong> {selectedTravel.userEmail}</p>
                        <p><strong>Created At:</strong> {formatDate(selectedTravel.createdAt)}</p>
                         <div className="flex gap-3 mt-4">
            
                            <Button
                                variant="destructive"
                                onClick={() => handleDeleteTravel(selectedTravel.id)}
                            >
                                Delete Travel
                            </Button>
                        </div>

                        <h3 className="mt-4 font-semibold">Host</h3>
                        {userDetails ? (
                            <>
                                <div className="flex-cols md:flex items-center gap-2">
                                    <div>
                                        <Image
                                            src={userDetails.data.profileImage}
                                            alt="profile image"
                                            width={60}
                                            height={60}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <p><strong>Name:</strong> {userDetails.data.name}</p>
                                        <p><strong>Email:</strong> {userDetails.data.email}</p>
                                        {userDetails.data.phone && <p><strong>Phone:</strong> {userDetails.data.phone}</p>}
                                    </div>
                       
                                </div>

                            </>
                        ) : (
                            <p>Loading user info...</p>
                        )}

                        <Button className="mt-4" onClick={closeModal}>Close</Button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default AllTravelPlanForAdmin;
