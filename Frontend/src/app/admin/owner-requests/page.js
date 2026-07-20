"use client";

import { useEffect, useState } from "react";
import {
  getOwnerRequests,
  approveOwnerRequest,
  rejectOwnerRequest,
    demoteOwner,
} from "@/app/api/auth";

export default function OwnerRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await getOwnerRequests();
      setRequests(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveOwnerRequest(id);
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve.");
    }
  };

  const handleDemote = async (id) => {
        try {
            await demoteOwner(id);
            fetchRequests();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to demote.");
        }
        };

  const handleReject = async (id) => {
    try {
      await rejectOwnerRequest(id);
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject.");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">
        Owner Requests
      </h1>

      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((user) => (
              <tr key={user._id}>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 space-x-2">
                    {user.ownerRequestStatus === "pending" && (
                        <>
                        <button
                            onClick={() => handleApprove(user._id)}
                            className="rounded bg-green-600 px-3 py-1 text-white"
                        >
                            Approve
                        </button>

                        <button
                            onClick={() => handleReject(user._id)}
                            className="rounded bg-red-600 px-3 py-1 text-white"
                        >
                            Reject
                        </button>
                        </>
                    )}

                    {user.role === "owner" && (
                        <button
                        onClick={() => handleDemote(user._id)}
                        className="rounded bg-orange-600 px-3 py-1 text-white"
                        >
                        Demote to User
                        </button>
                    )}

                    {user.ownerRequestStatus === "rejected" && (
                        <button
                        onClick={() => handleApprove(user._id)}
                        className="rounded bg-green-600 px-3 py-1 text-white"
                        >
                        Approve
                        </button>
                    )}
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}