"use client";

import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const Dashboard = ({ role }) => {
  // console.log(role);

  const colors = {
    primaryGreen: "#2fff00",
    lighterGreen: ["#2fff00eb", "#2fff00c3", "#2fff009e", "#2fff0071"],
  };

  // Data for Total Scans bar chart
  const totalScansData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Scans",
        data: [2500, 1150, 3000, 1450, 2700, 1300, 2400],
        backgroundColor: colors.primaryGreen,
      },
    ],
  };

  // Data for Threats Detected doughnut chart
  const threatsDetectedData = {
    labels: [
      "Malware",
      "Phishing",
      "Ransomware",
      "Data Breaches",
      "Insider Threats",
    ],
    datasets: [
      {
        label: "Threats Detected",
        data: [45, 30, 25, 15, 20],
        backgroundColor: [colors.primaryGreen, ...colors.lighterGreen],
        hoverOffset: 4,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#000" },
      },
      y: {
        grid: { color: "#EAEAEA" },
        beginAtZero: true,
        ticks: {
          stepSize: 1000,
          color: "#000",
        },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw}%`,
        },
        bodyFont: { size: 12 },
        bodyColor: colors.primaryGreen,
        padding: 8,
      },
    },
  };

  return (
    <div className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Total Scans Bar Chart */}
      <div className="chart-container h-full rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold">Total Scans</h2>
        <p className="text-gray-500">Year 2024</p>
        <Bar data={totalScansData} options={barChartOptions} />
      </div>

      {/* Threats Detected Doughnut Chart */}
      <div className="chart-container h-fit md:h-[50vh] rounded-lg overflow-hidden">
        <h2 className="text-xl font-bold">Threats Detected</h2>
        <div className="relative w-full h-full flex justify-center items-center">
          <Doughnut
            data={threatsDetectedData}
            options={doughnutChartOptions}
            className="w-full h-full md:scale-125"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
