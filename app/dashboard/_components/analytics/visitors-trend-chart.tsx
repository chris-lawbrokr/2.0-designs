"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { visitorsTrend } from "../../_data/analytics";
import { baseChartOptions, chartAxisLabelStyle } from "./chart-theme";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  ...baseChartOptions,
  chart: { ...baseChartOptions.chart, type: "area", height: 220 },
  colors: ["var(--chart-2)"],
  stroke: { curve: "smooth", width: 2 },
  fill: {
    type: "gradient",
    gradient: { opacityFrom: 0.25, opacityTo: 0 },
  },
  markers: { size: 0, hover: { size: 4 } },
  xaxis: {
    categories: visitorsTrend.map((point) => point.date),
    axisBorder: { show: false },
    axisTicks: { show: false },
    tickAmount: 6,
    labels: { style: chartAxisLabelStyle },
  },
  yaxis: {
    labels: {
      style: chartAxisLabelStyle,
      formatter: (value) =>
        value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}`,
    },
  },
};

export function VisitorsTrendChart() {
  const series = [
    {
      name: "Visitors",
      data: visitorsTrend.map((point) => point.visitors),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Visitors</CardTitle>
        <CardDescription>Daily visitors, last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart options={options} series={series} type="area" height={220} />
      </CardContent>
    </Card>
  );
}
