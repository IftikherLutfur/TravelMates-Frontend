/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import UserProfile from "@/components/UserProfile/UserPrfile";
import getOwnUser, { myTravel } from "@/utils/getOwnUser";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TravelPlans from "@/components/TravelPlan/TravelPlan";

const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [travel, setTravel] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getOwnUser();
      setUser(data);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await myTravel();
      setTravel(data);
    };
    fetchUser();
  }, []);

  console.log(travel)
  if (!user) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        My Profile
      </h1>

      {/* Tabs Container */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <Tabs>
          {/* Tab List */}
          <TabList className="flex border-b border-gray-200 bg-gray-50">
            <Tab className="py-3 px-6 cursor-pointer text-gray-700 font-medium hover:bg-gray-100 transition-colors rounded-t-lg">
              Profile Info
            </Tab>
            <Tab className="py-3 px-6 cursor-pointer text-gray-700 font-medium hover:bg-gray-100 transition-colors rounded-t-lg">
              My Travel Plan
            </Tab>
            <Tab className="py-3 px-6 cursor-pointer text-gray-700 font-medium hover:bg-gray-100 transition-colors rounded-t-lg">
              Reviews
            </Tab>
          </TabList>

          {/* Tab Panels */}
          <TabPanel className="p-6">
           <UserProfile email={user.email} fullName={user.name} profileImage={user.profileImage} visitedCountries={user.visitedCountries} />
          </TabPanel>

          <TabPanel className="p-6">
             {travel.length > 0 ? 
            <TravelPlans plans={travel}/> :  <p className="text-gray-500">No travel plans yet.</p>
            }
          </TabPanel>

          <TabPanel className="p-6">
            
              <p className="text-gray-500">No reviews yet.</p>
            
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
