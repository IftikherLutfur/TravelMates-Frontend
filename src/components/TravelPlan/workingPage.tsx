/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import TravelPlans from "../TravelPlan/TravelPlan";
import TravelPlanForm from "../TravelPlan/form";
import { Button } from "../ui/button";
import CommonDiv from "@/utils/CommonDiv";
import axios from "axios";

const TravelPlannerPage = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/travel`
        );

        setPlans(res.data.data);
      } catch (error) {
        console.error("Failed to fetch travel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravels();
  }, []);

  return (
    <div>
      <CommonDiv>
        <div className="py-20">
          <Button onClick={() => setShow(true)}>Create plan</Button>
          <Button onClick={() => setShow(false)}>Hide</Button>

          {show && (
            <TravelPlanForm
              selectedPlan={selectedPlan}
              onSave={(newPlan: any) =>
                setPlans((prev) => [...prev, newPlan])
              }
            />
          )}

          {loading ? (
            <p className="mt-6 text-center">Loading travel plans...</p>
          ) : (
            <TravelPlans plans={plans} />
          )}
        </div>
      </CommonDiv>
    </div>
  );
};

export default TravelPlannerPage;
