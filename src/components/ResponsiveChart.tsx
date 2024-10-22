import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import React from "react";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  zoomPlugin
);

interface ComboChartProps {
  labels: string[];
  barData: number[];
  lineData: number[];
}

const ResponsiveChart: React.FC<ComboChartProps> = ({
  labels,
  barData,
  lineData,
}) => {

  const getBarColor = (value: number) =>
    value < 0 ? "rgba(255, 99, 132, 0.5)" : "rgba(75, 192, 192, 0.5)";
  const getLineColor = (value: number) =>
    value < 0 ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)";

  const data: any = {
    labels,
    datasets: [
      {
        label: "Profits",
        data: barData,
        backgroundColor: barData.map(getBarColor),
        borderColor: barData
          .map(getBarColor)
          .map((color) => color.replace(/0\.5/, "1")),
        borderWidth: 1,
        yAxisID: "y-axis-left",
        type: "bar" as const,
      },
      {
        label: "Buy or Sell",
        data: lineData,
        borderColor: lineData.map(getLineColor),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
        yAxisID: "y-axis-right",
        tension: 0.4,
        type: "line" as const,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          autoSkip: false,
        },
      },
     
      "y-axis-left": {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Profits",
        },
      },
      "y-axis-right": {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Buy or Sell",
        },
        grid: {
          drawOnChartArea: false, // حذف خطوط شبکه برای محور راست
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly chart",
      },
      
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,

          mode: "x",
        },
      },
    },
  
  };

  return <Bar className="cursor-pointer"  data={data} options={options} />;
};

export default ResponsiveChart;
