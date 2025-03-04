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
    maintainAspectRatio: false,
    scales: {
      x: { display: true },
      y: { display: true },
    },
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
    <div className="w-full h-full   ">
      <div className="relative w-full h-[400px] md:h-full ">
        <Line
          options={options}
          style={{ height: "100%", width: "100%" }}
          data={datas}
        />
      </div>
    </div>
  );
};

export default SalesPage;
