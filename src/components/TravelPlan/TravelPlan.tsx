/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Title from "@/utils/Title";

const TravelPlans = ({ plans, onEdit, onDelete }:{ plans:any, onEdit:any, onDelete:any}) => {
  return (
   <div
   className=""
   >
    <div className=" mt-10">
    <Title
    title="Travle Plan"
    subTitle="This is where you get others plan"
    />
    
      <div className="space-y-4">
        {plans.length === 0 && (
          <p className="text-gray-500">No travel plans added yet.</p>
        )}
<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {plans.map((plan:any) => (
          <div
            key={plan.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold">{plan.destination}</h3>
            
            <p className="text-gray-600">
              {plan.startDate} → {plan.endDate}
            </p>

            <p className="mt-1 font-medium">Budget: ${plan.budgetRange}</p>
            <p className="mt-1">Type: {plan.travelType}</p>
            <p className="mt-2 text-gray-700">{plan.description}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => onEdit(plan)}
                className="px-2 py-1 bg-blue-600 text-white rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(plan.id)}
                className="px-2 py-1 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
   </div>
  );
};

export default TravelPlans;
