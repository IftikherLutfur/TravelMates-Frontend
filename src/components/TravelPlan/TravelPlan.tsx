/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Title from "@/utils/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "../ui/button";

interface User {
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

const TravelPlans = ({ plans }: { plans: any[] | null }) => {
  const safePlans = plans ?? [];

  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);
  const [host, setHost] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For search and sorting
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

  const openModal = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlan(null);
    setHost(null);
    setIsModalOpen(false);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // Fetch host info
  useEffect(() => {
    if (!selectedPlan?.userEmail) return;

    const fetchHost = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${selectedPlan.userEmail}`
        );
        setHost(res.data.data);
      } catch (err) {
        console.error("Failed to fetch host info", err);
      }
    };

    fetchHost();
  }, [selectedPlan]);

  // Filtered and sorted plans
  const filteredPlans = safePlans
    .filter((plan) =>
      plan.destination.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.budgetRange - b.budgetRange;
      if (sortOrder === "desc") return b.budgetRange - a.budgetRange;
      return 0;
    });

  return (
    <div>
      <div className="mt-10">
        <Title title="Travel Plan" subTitle="This is where you get others plan" />

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-3">
          <input
            type="text"
            placeholder="Search by destination"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border p-2 rounded-md flex-1"
          />

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "asc" | "desc" | "none")
            }
            className="border p-2 rounded-md"
          >
            <option value="none">Sort by Budget</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {filteredPlans.length === 0 && (
          <p className="text-gray-500 mt-4">No travel plans found.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {filteredPlans.map((plan: any) => (
            <div
              key={plan.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-xl font-semibold">{plan.destination}</h3>

              <p className="text-gray-600">
                {formatDate(plan.startDate)} → {formatDate(plan.endDate)}
              </p>

              <p className="mt-1 font-medium">Budget: {plan.budgetRange} BDT</p>
              <p className="mt-1">Type: {plan.travelType}</p>

              <Button className="mt-3" onClick={() => openModal(plan)}>
                Details
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-3">Travel Details</h2>

            <p>
              <strong>Destination:</strong> {selectedPlan.destination}
            </p>
            <p>
              <strong>Start:</strong> {formatDate(selectedPlan.startDate)}
            </p>
            <p>
              <strong>End:</strong> {formatDate(selectedPlan.endDate)}
            </p>
            <p>
              <strong>Budget:</strong> {selectedPlan.budgetRange} BDT
            </p>
            <p>
              <strong>Type:</strong> {selectedPlan.travelType}
            </p>

            <h3 className="mt-4 font-semibold">Host</h3>

            {host ? (
              <div className="flex items-center gap-3 mt-2">
                {host.profileImage && (
                  <Image
                    src={host.profileImage}
                    alt="Host"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p>
                    <strong>{host.name}</strong>
                  </p>
                  <p className="text-sm text-gray-600">{host.email}</p>
                  {host.phone && <p className="text-sm">{host.phone}</p>}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Loading host info...</p>
            )}

            <Button className="mt-4 w-full" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPlans;
