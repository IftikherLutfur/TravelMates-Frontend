/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { getRawToken } from "@/lib/auth-utils";

const UserData = ({ users }: { users: any }) => {
  const handleChangeStatus = async (id: string, status: string) => {
    const token = await getRawToken();
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/userStatus/${id}`,
        { userStatus: status }, // ✅ send the selected status in body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh page after update
      window.location.reload();
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-xl font-semibold mb-4">
        All User Data
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Premium</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Created At</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.id} className="*:text-gray-900 *:first:font-medium">
                  <td className="px-3 py-2">{user.name || "N/A"}</td>
                  <td className="px-3 py-2">{user.email}</td>
                  <td className="px-3 py-2">{user.role || "User"}</td>
                  <td className="px-3 py-2">{user.isPremium ? "Yes" : "No"}</td>
                  <td className="px-3 py-2">
                    <select
                      value={user.userStatus}
                      onChange={(e) => handleChangeStatus(user.id, e.target.value)}
                      className={
                        user.userStatus === "ACTIVE"
                          ? "bg-green-500 text-white px-2 py-1 rounded"
                          : "bg-red-500 text-white px-2 py-1 rounded"
                      }>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="DEACTIVE">DEACTIVE</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">{user.currentLocation || "Unknown"}</td>
                  <td className="px-3 py-2">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserData;
