"use client";

import Link from "next/link";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ReactCountUp from "@/components/ui/countUp";
import { GiCycle } from "react-icons/gi";
import { FaFolder } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { IoBugOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import { FaUserSecret } from "react-icons/fa6";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = () => {
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#fff" },
      },
      y: {
        grid: { color: "#EAEAEA" },
        beginAtZero: true,
        ticks: {
          stepSize: 1000,
          color: "#fff",
        },
      },
    },
  };

  const colors = {
    primaryClr: "#00a2ff",
    lighterClr: ["#00a2ffd0", "#00a2ffb0", "#00a2ffa0", "#00a2ff80"],
  };

  // Data for Total Scans line chart
  const totalScansData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Scans",
        data: [800, 1150, 3000, 1450, 2700, 1300, 2400],
        backgroundColor: colors.primaryClr,
        borderColor: colors.primaryClr,
        tension: 0.4,
        pointBackgroundColor: colors.primaryClr,
        pointBorderColor: "#fff",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Data for Threats Detected doughnut chart
  const threatsDetectedData = {
    labels: ["Clean", "Suspicious", "Malicious"],
    datasets: [
      {
        label: "Threats Detected",
        data: [45, 30, 25],
        backgroundColor: [colors.primaryClr, ...colors.lighterClr],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 30,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw}%`,
        },
        bodyFont: { size: 10 },
        bodyColor: colors.primaryClr,
        padding: 8,
      },
    },
  };

  return (
    <div className="w-full h-fit space-y-4 overflow-hidde">
      <Total />
      <div className="w-full h-fit animate-slide-down grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Scans Line Chart */}
        <div className="chart-container h-full bg-background/80 backdrop-blur-sm text-foreground p-2 md:p-4 rounded-lg overflow-hidden">
          <h2 className="text-md md:text-lg lg:text-xl font-bold">
            Scans History
          </h2>
          <Line data={totalScansData} options={lineChartOptions} />
        </div>

        {/* Threats Detected Doughnut Chart */}
        <div className="chart-container h-fit md:h-[50vh] bg-background/80 backdrop-blur-sm p-2 md:p-4 rounded-lg overflow-hidden">
          <h2 className="text-md md:text-lg lg:text-xl font-bold">
            Threats Detected Rate
          </h2>
          <div className="relative w-full h-full flex justify-center items-center">
            <Doughnut
              data={threatsDetectedData}
              options={doughnutChartOptions}
              className="w-full h-full md:scale-125"
            />
          </div>
        </div>
      </div>
      <TryOurServices />
    </div>
  );
};

export default Dashboard;

const Total = () => {
  const totalTabs = [
    {
      id: "1",
      head: "Active Scans",
      value: 2458,
      icon: GiCycle,
      href: "/account/malware-scan",
      color: "cyan",
      desc: "3 malware detected",
    },
    {
      id: "2",
      head: "OSINT Cases",
      value: 47,
      icon: FaFolder,
      href: "/account/osint-cases",
      color: "blue",
      desc: "15 pending reviews",
    },
    {
      id: "3",
      head: "Threat Level",
      value: 42,
      icon: IoWarning,
      href: "/account/malware-scan",
      color: "yellow",
      desc: "2 critical alerts",
    },
  ];

  return (
    <>
      <div className="w-full h-fit grid grid-cols-1 md:grid-cols-3 gap-4 py-1 overflow-hidde">
        {totalTabs.map((t, index) => (
          <div
            key={index}
            className="w-full h-fit animate-slide-down flex justify-between flex-col gap-2 md:gap-4 bg-background p-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:translate-x-1.5 ease-in-out duration-300 overflow-hidden"
          >
            <div className="w-full h-fit flex-between gap-2">
              <h4 className="text-xl font-semibold">{t.head}</h4>
              <t.icon color={t.color} size={20} />
            </div>
            <ReactCountUp
              amt={t.value}
              duration={1.5}
              className="w-fit text-xl md:text-2xl lg:text-3xl font-bold select-text"
            />
            <span className="text-gray-700 dark:text-zinc-400">{t.desc}</span>
          </div>
        ))}
      </div>
    </>
  );
};

const services = [
  {
    icon: IoBugOutline,
    href: "/account/dashboard#service",
    title: "Vulnerability Testing",
    description:
      "Comprehensive security assessment to identify and fix system vulnerabilities.",
    bgColor: "bg-blue-500/20 dark:bg-blue-500/15",
    ringColor: "ring-blue-300/50 dark:ring-blue-300/30",
    textColor: "text-blue-500",
    descriptionColor: "text-blue-400 dark:text-blue-200",
  },
  {
    icon: IoSearch,
    href: "/account/dashboard#service",
    title: "Cyber Forensics",
    description:
      "Digital evidence analysis and investigation for security incidents.",
    bgColor: "bg-green-500/15 dark:bg-green-500/15",
    ringColor: "ring-green-300/50 dark:ring-green-300/30",
    textColor: "text-green-500",
    descriptionColor: "text-green-400 dark:text-green-200",
  },
  {
    icon: TfiWorld,
    href: "/account/dashboard#service",
    title: "OSINT Investigation",
    description: "Open-source intelligence gathering and threat analysis.",
    bgColor: "bg-purple-500/20 dark:bg-purple-500/15",
    ringColor: "ring-purple-300/50 dark:ring-purple-300/30",
    textColor: "text-purple-500",
    descriptionColor: "text-purple-400 dark:text-purple-200",
  },
  {
    icon: FaUserSecret,
    href: "/account/dashboard#service",
    title: "Dark Web Monitoring",
    description:
      "Continuous surveillance of dark web for data breaches and threats.",
    bgColor: "bg-orange-500/20 dark:bg-orange-500/15",
    ringColor: "ring-orange-300/50 dark:ring-orange-300/30",
    textColor: "text-orange-500",
    descriptionColor: "text-orange-400 dark:text-orange-200",
  },
];

const TryOurServices = () => {
  return (
    <div className="w-full h-fit animate-slide-up bg-background/80 backdrop-blur-sm p-2 md:p-4 lg:p-6 space-y-2 md:sapce-y-4 rounded-lg overflow-hidden">
      <h3>Try Our Other Services</h3>
      <div className="w-full h-fit grid md:grid-cols-2 gap-4 p-1 overflow-hidden">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link href={service?.href} key={index}>
              <div
                className={`w-full h-full ${service.bgColor} ring-1 ${service.ringColor} p-2 md:p-4 space-y-2 md:space-y-4 rounded hover:-translate-y-0.5 hover:translate-x-1.5 ease-in-out duration-300 overflow-hidden`}
              >
                <div className={`flex gap-2 ${service.textColor}`}>
                  <Icon size={24} />
                  <div className="font-semibold">{service.title}</div>
                </div>
                <p className={`text-xs md:text-sm ${service.descriptionColor}`}>
                  {service.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
