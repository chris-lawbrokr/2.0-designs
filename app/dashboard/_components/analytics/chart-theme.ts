import type { ApexOptions } from "apexcharts";

/**
 * Minimal, streamlined chrome shared by every analytics chart — no toolbar,
 * no legend clutter, faint gridlines, and colors pulled from the app's own
 * chart-* CSS tokens instead of ApexCharts' defaults.
 */
export const baseChartOptions: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent",
    foreColor: "var(--muted-foreground)",
    fontFamily: "inherit",
  },
  grid: {
    borderColor: "var(--border)",
    strokeDashArray: 3,
    padding: { left: 8, right: 8, top: 0 },
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  tooltip: { theme: "dark" },
};

export const chartAxisLabelStyle = {
  colors: "var(--muted-foreground)",
  fontSize: "11px",
};
