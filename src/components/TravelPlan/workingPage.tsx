/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import TravelPlans from "../TravelPlan/TravelPlan";
import TravelPlanForm from "../TravelPlan/form";
import { Button } from "../ui/button";
import CommonDiv from "@/utils/CommonDiv";

// Dummy Travel Data
const travel = [
    {
        id: 1,
        destination: "Cox's Bazar",
        startDate: "2025-01-10",
        endDate: "2025-01-14",
        budgetRange: 15000,
        travelType: "friends",
        description: "Beach tour with friends and seafood exploration.",
    },
    {
        id: 2,
        destination: "Sajek Valley",
        startDate: "2025-02-05",
        endDate: "2025-02-07",
        budgetRange: 12000,
        travelType: "family",
        description: "Hillview resort stay and cloud experience.",
    },
    {
        id: 3,
        destination: "Sylhet",
        startDate: "2025-03-01",
        endDate: "2025-03-03",
        budgetRange: 10000,
        travelType: "solo",
        description: "Tea gardens, waterfalls, and spiritual places.",
    },
    {
        id: 4,
        destination: "Bandarban",
        startDate: "2025-04-10",
        endDate: "2025-04-13",
        budgetRange: 18000,
        travelType: "friends",
        description: "Trekking to Nafakhum and exploring hills.",
    },
    {
        id: 5,
        destination: "Kashmir",
        startDate: "2025-05-08",
        endDate: "2025-05-15",
        budgetRange: 85000,
        travelType: "family",
        description: "Snow mountains, shikara ride, and scenic beauty.",
    },
];

const TravelPlannerPage = () => {
    // Load dummy data initially
    const [plans, setPlans] = useState<any[]>(travel);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [show, setShow] = useState(false)


    const clickToShow = () => {
        setShow(true)
    }
    const clickToHide = () => {
        setShow(false)
    }

    // Add or Update
    const handleSave = (plan: any) => {
        if (selectedPlan) {
            // Update existing plan
            setPlans((prev) =>
                prev.map((p) =>
                    p.id === selectedPlan.id ? { ...plan, id: selectedPlan.id } : p
                )
            );
            setSelectedPlan(null);
        } else {
            // Add new plan
            setPlans((prev) => [...prev, { ...plan, id: Date.now() }]);
        }
    };

    // Edit
    const handleEdit = (plan: any) => {
        setSelectedPlan(plan);
    };

    // Delete  
    const handleDelete = (id: number) => {
        setPlans((prev) => prev.filter((plan) => plan.id !== id));
    };

    return (
        <div>
            <CommonDiv>
                <div className="py-20">

                    <Button onClick={() => clickToShow()}>Create plan </Button>
                    <Button onClick={() => clickToHide()}>Hide</Button>
                    {
                        show ? <TravelPlanForm selectedPlan={selectedPlan} onSave={handleSave} /> : ""
                    }
                    <TravelPlans plans={plans} onEdit={handleEdit} onDelete={handleDelete} />
                    <div>
                    </div>
                </div>
            </CommonDiv>
        </div>
    );
};

export default TravelPlannerPage;
