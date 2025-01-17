"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ReactCountUp from "@/components/ui/countUp";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { reverseSlug } from "@/lib/utils";

const OSINTCasesList = () => {
  const router = useRouter();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
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

      if (data.success) {
        setCases(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

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
                  <td className="p-3 text-sm text-gray-600">
                    <ReactCountUp
                      amt={item?.budget?.amount}
                      prefix={item?.budget?.currency}
                    />
                  </td>
                  <td className="p-3">
                    <Button
                      type="button"
                      onClick={() =>
                        router.push(`/account/osint-cases/${item?._id}`)
                      }
                      variant="ghost"
                      effect="gooeyRight"
                      size="sm"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {/* Updated Pagination Controls */}
      {pagination && (
        <div className="w-full p-4 flex justify-between items-center border-t border-zinc-400 dark:border-zinc-600">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
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
