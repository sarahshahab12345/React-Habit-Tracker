import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const BarChartComponent = ({ chartData, colors }) => {
  const data = {
    xAxis: [{ scaleType: "band", data: chartData.labels }],
    series: chartData.datasets.map((dataset, index) => ({
      data: dataset.data,
      label: dataset.label,
      color: colors[index % colors.length],
    })),
  };

  return (
    <BarChart
      xAxis={data.xAxis}
      series={data.series}
      width={900}
      height={370}
    />
  );
};

export default BarChartComponent;
