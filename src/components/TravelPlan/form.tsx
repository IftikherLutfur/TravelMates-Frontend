/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getRawToken } from "@/lib/auth-utils";
import axios from "axios";
import { useState, useEffect } from "react";

const TravelPlanForm = ({ selectedPlan, onSave }: { selectedPlan: any, onSave: any }) => {
  // console.log(token)
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budgetRange: "",
    travelType: "",
    description: "",
  });

  useEffect(() => {
    if (selectedPlan) {
      setForm(selectedPlan);
    }
  }, [selectedPlan]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  };

  const handleSubmit = async (e: any) => {
    const token = await getRawToken()
    console.log("Frontend Token", token)
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/travel/create`,
        form, // ✅ send form directly
        {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        }
      );
      console.log(res, "DDDDD")
      if (res.data?.data) {
        console.log("Travel created:", res.data.data);
      }

      onSave(res.data.data);

      setForm({
        destination: "",
        startDate: "",
        endDate: "",
        budgetRange: "",
        travelType: "",
        description: "",
      });

    } catch (err) {
      console.error("Travel create failed:", err);
      alert("There is some issue");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {selectedPlan ? "Edit Travel Plan" : "Add Travel Plan"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="w-full p-2 border rounded"
          required
        />

        <div className="flex gap-3">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <input
          type="number"
          name="budgetRange"
          value={form.budgetRange}
          onChange={handleChange}
          placeholder="Budget (e.g., 2000)"
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="travelType"
          value={form.travelType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Travel Type</option>
          <option value="SOLO">Solo</option>
          <option value="FAMILY">Family</option>
          <option value="FRIENDS">Friends</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Trip Description"
          className="w-full p-2 border rounded"
          rows={3}
        ></textarea>

        <button
          type="submit"
          className="px-4 py-2 w-full bg-green-600 text-white rounded-lg"
        >
          {selectedPlan ? "Update Plan" : "Add Plan"}
        </button>
      </form>
    </div>
  );
};

export default TravelPlanForm;
