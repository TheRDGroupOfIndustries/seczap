"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { reverseSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ReactCountUp from "@/components/ui/countUp";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RiLoaderLine } from "react-icons/ri";

const OSINTCasesList = () => {
  const router = useRouter();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [loadingCase, setLoadingCase] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    hasMore: false,
  });

  const fetchCases = async (newPage = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/account/osint-cases?page=${newPage}&limit=10&sortBy=createdAt&order=desc`
      );
      const data = await response.json();
      // console.log("OSINT Cases:", data);

      if (data.success) {
        setCases(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
    fetchCases(pagination.currentPage);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleViewCase = async (id, status) => {
    setLoadingCase(id);
    if (status === "pending") {
      try {
        const response = await fetch("/api/account/osint-cases/put", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            status: "viewed",
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update case status");
        }
      } catch (error) {
        console.error("Error updating case status:", error);
      }
    }
    router.push(`/account/osint-cases/${id}`);
    setLoadingCase(null);
  };

  // console.log("OSINT Cases:", cases);

  return (
    <div className="flex flex-col gap-4">
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <tr>
              <th className="text-left p-3 font-semibold">Case Type</th>
              <th className="text-left p-3 font-semibold">Priority</th>
              <th className="text-left p-3 font-semibold">Budget</th>
              <th className="text-left p-3 font-semibold">Status</th>
              <th className="text-left p-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ?
              <tr>
                <td colSpan={4} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            : cases.length === 0 ?
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No cases found
                </td>
              </tr>
            : cases.map((item, index) => (
                <tr
                  key={item?._id}
                  className="hover:bg-primary/5 transition-colors"
                >
                  <td className="p-3">
                    {reverseSlug(item?.caseType) || item?.caseType}
                  </td>
                  <td className="p-3">{getPriorityBadge(item?.priority)}</td>
                  <td className="p-3 text-sm font-semibold font-sans">
                    <ReactCountUp
                      amt={item?.budget?.amount}
                      prefix={item?.budget?.currency}
                    />
                  </td>
                  <td className="p-3">{getStatusBadge(item?.status)}</td>
                  <td className="p-3">
                    <Button
                      type="button"
                      onClick={() => handleViewCase(item?._id, item?.status)}
                      variant="ghost"
                      effect="gooeyRight"
                      size="sm"
                      disabled={loadingCase === item?._id}
                    >
                      {loadingCase === item?._id ?
                        <RiLoaderLine className="animate-spin mr-2" />
                      : "View"}
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="w-full p-4 flex-between border-t border-zinc-400 dark:border-zinc-600">
          {/* <div className="w-fit flex-center gap-4"> */}
          <Button
            onClick={handleRefresh}
            type="button"
            variant="secondary"
            size="sm"
            effect="gooeyLeft"
            disabled={loading || refresh || cases.length === 0}
            className={refresh ? "animate-pulse" : ""}
          >
            {refresh && <RiLoaderLine className="animate-spin mr-2" />}
            Refresh
          </Button>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          {/* </div> */}

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              effect="gooeyLeft"
              onClick={() => fetchCases(1)}
              disabled={pagination.currentPage === 1}
              title="Go to First Page"
              className="w-8 h-8 p-0 bg-zinc-200 dark:bg-zinc-700"
            >
              <MdOutlineKeyboardDoubleArrowLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              effect="gooeyLeft"
              onClick={() => fetchCases(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              title="Go to Previous Page"
              className="w-8 h-8 p-0 bg-zinc-200 dark:bg-zinc-700"
            >
              <MdKeyboardArrowLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-1 px-2">
              <span className="text-sm font-medium">{1}</span>
              {pagination.currentPage > 2 && <span className="px-2">...</span>}
              {pagination.currentPage > 1 &&
                pagination.currentPage < pagination.totalPages && (
                  <span className="text-sm font-medium bg-violet-600 text-white px-2 py-1 rounded">
                    {pagination.currentPage}
                  </span>
                )}
              {pagination.currentPage < pagination.totalPages - 1 && (
                <span className="px-2">...</span>
              )}
              {" / "}
              <span className="text-sm font-medium">
                {pagination.totalPages}
              </span>
            </div>

            <Button
              size="icon"
              variant="outline"
              effect="gooeyLeft"
              onClick={() => fetchCases(pagination.currentPage + 1)}
              disabled={!pagination.hasMore}
              title="Go to Next Page"
              className="w-8 h-8 p-0 bg-zinc-200 dark:bg-zinc-700"
            >
              <MdKeyboardArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              effect="gooeyLeft"
              onClick={() => fetchCases(pagination.totalPages)}
              disabled={!pagination.hasMore}
              title="Go to Last Page"
              className="w-8 h-8 p-0 bg-zinc-200 dark:bg-zinc-700"
            >
              <MdOutlineKeyboardDoubleArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OSINTCasesList;

export const getPriorityBadge = (priority) => {
  const badgeClasses = {
    high: "bg-red-100 text-red-800 ml-2",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800 ml-2",
  };
  return (
    <span
      className={`capitalize font-semibold px-2 py-1 rounded-full text-xs ${badgeClasses[priority]}`}
    >
      {priority}
    </span>
  );
};

export const getStatusBadge = (status) => {
  const badgeClasses = {
    pending: "bg-orange-100 text-orange-800",
    viewed: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };
  return (
    <span
      className={`capitalize font-semibold px-2 py-1 rounded-full text-xs ${
        badgeClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status ? status.replace("-", " ") : "unknown"}
    </span>
  );
};
