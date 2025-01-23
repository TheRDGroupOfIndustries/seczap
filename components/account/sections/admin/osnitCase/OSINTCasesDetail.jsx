"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/BreadCrumbComponent";
import ReactCountUp from "@/components/ui/countUp";
import { toast } from "sonner";
import { getPriorityBadge, getStatusBadge } from "./OSINTCasesList";

const OSINTCasesDetail = ({ section, id }) => {
  const [osintCase, setOsintCase] = useState(null); //console.log("osintCase", osintCase);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Target URL has been copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("Failed to copy text to clipboard");
    }
  };

  useEffect(() => {
    const fetchOSINTCase = async () => {
      try {
        const response = await fetch(`/api/account/osint-cases/get/by/${id}`);
        const result = await response.json();

        // console.log("API Response:", result);

        if (result.success) {
          setOsintCase(result.data);
          // console.log("OSINT Case Data:", result.data);
        } else {
          setError(result.error || "Failed to fetch OSINT case");
        }
      } catch (err) {
        console.error("Error fetching OSINT case:", err);
        setError("Failed to fetch OSINT case details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOSINTCase();
    }
  }, [id]);

  if (section !== "osint-cases" || !id) return <div>Invalid Section</div>;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className="w-full h-fit space-y-4 md:sapce-y-6 lg:space-y-8 overflow-hidden">
        <Breadcrumbs />
        {/* <div className="w-full h-fit flex-between gap-4"> */}
        <h3 className="animate-slide-down font-bold text-md md:text-lg lg:text-xl xl:text-2xl">
          OSINT Case Details
        </h3>
        {/* <div className="">user profile div</div>
        </div> */}
        <div className="w-full h-fit select-text animate-slide-up bg-background/80 backdrop-blur-sm p-2 md:p-4 lg:p-6 space-y-4 md:space-y-6 lg:space-y-8 rounded-lg overflow-hidden">
          {osintCase && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div>
                  {osintCase?._id && (
                    <h2 className="text-xl font-bold mb-2">
                      Case #{osintCase?._id.slice(-6)}
                    </h2>
                  )}
                  {osintCase?.priority && (
                    <span className="w-fit h-fit flex-center gap-1">
                      Priority : {getPriorityBadge(osintCase?.priority)}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  {osintCase?.status && (
                    <span className="w-fit h-fit flex-center gap-1">
                      Status : {getStatusBadge(osintCase?.status)}
                    </span>
                  )}
                  {osintCase?.createdAt && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Created:{" "}
                      {new Date(osintCase.createdAt).toLocaleDateString()}
                    </p>
                  )}
                  {osintCase?.updatedAt && (
                    <p className="text-sm text-muted-foreground">
                      Updated:{" "}
                      {new Date(osintCase.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* left column */}

                <div className="w-full h-full space-y-4">
                  <div className="bg-card p-4 rounded-lg">
                    <h3 className="font-semibold mb-3">Case Details</h3>
                    <div className="space-y-2">
                      {osintCase?.caseType && (
                        <p className="text-sm">
                          Type:
                          <span className="ml-1 text-md md:text-lg lg:text-xl font-semibold">
                            {osintCase.caseType.replace("-", " ").toUpperCase()}
                          </span>
                        </p>
                      )}
                      {osintCase?.budget?.amount && (
                        <p className="text-sm">
                          Budget:
                          <ReactCountUp
                            amt={osintCase.budget.amount}
                            prefix={osintCase.budget.currency}
                            className="ml-1 text-sm md:text-md lg:text-lg font-semibold"
                          />
                        </p>
                      )}
                    </div>
                  </div>

                  {osintCase?.target && (
                    <div className="bg-card p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">Target Information</h3>
                        <button
                          onClick={() => handleCopy(osintCase.target)}
                          disabled={copied}
                          className={`select-none text-xs px-2 py-1 rounded bg-secondary/70 hover:bg-secondary hover:scale-110 ${!copied && "active:translate-y-1"} transition-all ease-in-out duration-200`}
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <p className="text-sm break-all">{osintCase.target}</p>
                    </div>
                  )}

                  {osintCase?.caseDocument?.name && (
                    <div className="bg-card p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Case Document</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {osintCase.caseDocument.name}
                          </p>
                          {osintCase.caseDocument.size && (
                            <p className="text-xs text-muted-foreground">
                              {osintCase.caseDocument.size}
                            </p>
                          )}
                        </div>
                        {osintCase.caseDocument.url && (
                          <Link
                            href={osintCase.caseDocument.url}
                            download={osintCase.caseDocument.name}
                            target="_self"
                            className="ml-4 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                          >
                            Download
                          </Link>
                        )}
                      </div>
                    </div>
                  )}

                  {osintCase?.keywords?.length > 0 && (
                    <div className="bg-card p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {osintCase.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary text-sm md:text-md rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* right column */}
                <div className="w-full h-full space-y-4">
                  {osintCase?.dataSorce &&
                    Object.keys(osintCase.dataSorce).length > 0 && (
                      <div className="bg-card p-4 rounded-lg">
                        <h3 className="font-semibold mb-3">Data Sources</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(osintCase.dataSorce).map(
                            ([source, enabled]) => (
                              <div
                                key={source}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    enabled ? "bg-green-500" : "bg-red-500"
                                  }`}
                                />
                                <span className="text-sm capitalize">
                                  {source === "whois" ? "WHOIS" : source}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {osintCase?.user_id && (
                    <div className="bg-card p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">
                        Requester Information
                      </h3>
                      <div className="flex items-center gap-3">
                        {osintCase.user_id.image && (
                          <img
                            src={osintCase.user_id.image}
                            alt={osintCase.user_id.name || "User"}
                            className="w-10 h-10 rounded-full"
                          />
                        )}
                        <div className="w-fit h-fit flex-1 flex flex-col md:flex-row justify-between gap-2">
                          <div className="">
                            {osintCase.user_id.name && (
                              <div className="flex items-center gap-2">
                                <p className="font-medium line-clamp-1">
                                  {osintCase.user_id.name}
                                </p>
                                {osintCase.user_id.role && (
                                  <span
                                    className={`px-2 py-0.5 text-xs rounded-full ${
                                      osintCase.user_id.role === "admin" ?
                                        "bg-purple-100 text-purple-800"
                                      : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {osintCase.user_id.role}
                                  </span>
                                )}
                              </div>
                            )}
                            {osintCase.user_id.email && (
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                <Link
                                  href={`mailto:${osintCase.user_id.email}`}
                                  className="w-fit hover-link-underline hover:text-primary"
                                >
                                  {osintCase.user_id.email}
                                </Link>
                              </p>
                            )}
                          </div>

                          {osintCase.user_id.subscription && (
                            <span
                              className={`w-fit h-fit inline-block px-2 py-0.5 text-xs rounded-full ${
                                osintCase.user_id.subscription === "free" ?
                                  "bg-gray-100 text-gray-800"
                                : "bg-green-100 text-green-800"
                              }`}
                            >
                              {osintCase.user_id.subscription.toUpperCase()}{" "}
                              Plan
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {osintCase?.extraNotes && (
                    <div className="bg-card p-4 rounded-lg">
                      <h3 className="font-semibold mb-3">Additional Notes</h3>
                      <p className="text-sm">{osintCase.extraNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OSINTCasesDetail;
