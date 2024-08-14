import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const BasicPie = ({ data, colors }) => {
  return (
    <PieChart
      series={[
        {
          data: data,
        },
      ]}
      width={600}
      height={300}
      colors={colors}
    />
  );
};

export default BasicPie;
