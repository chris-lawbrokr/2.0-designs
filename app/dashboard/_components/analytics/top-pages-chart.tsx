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

import { pageViews } from "../../_data/analytics";
import { baseChartOptions, chartAccentColor, chartAxisLabelStyle } from "./chart-theme";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  ...baseChartOptions,
  chart: { ...baseChartOptions.chart, type: "bar", height: 150 },
  colors: [chartAccentColor],
  plotOptions: {
    bar: { horizontal: true, barHeight: "55%", borderRadius: 4 },
  },
  dataLabels: { enabled: false },
  grid: {
    ...baseChartOptions.grid,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: false } },
  },
  xaxis: {
    categories: pageViews.map((row) => row.label),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { show: false },
  },
  yaxis: {
    labels: { style: chartAxisLabelStyle },
  },
};

export function TopPagesChart() {
  const series = [
    { name: "Page views", data: pageViews.map((row) => row.views) },
  ];

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top pages</CardTitle>
        <CardDescription className="text-xs">
          Page views, last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Chart options={options} series={series} type="bar" height={150} />
      </CardContent>
    </Card>
  );
}
