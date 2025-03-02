"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGetAllOrderQuery } from "@/apis/_order_index.api";
import Loading from "@/components/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SalesPage = () => {
  const { data, isLoading } = useGetAllOrderQuery();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "weekly sales",
      },
    },
  };

  if (isLoading) {
    return <Loading />;
  }
  const datas = {
    labels: data?.last7Days.map((item) => {
      const date = new Date(item.date);
      return date.toLocaleDateString("en-US", { weekday: "short" });
    }),
    datasets: [
      {
        label: "sales as seen",
        data: data?.last7Days.map((item) => item.totalSales) as number[],
        borderColor: "#EA6D27",
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden p-4">
      <div className="relative w-full max-w-4xl mx-auto h-[300px] sm:h-[400px] lg:h-[500px]">
        <Line options={options} data={datas} />
      </div>
    </div>
  );
};

export default SalesPage;
