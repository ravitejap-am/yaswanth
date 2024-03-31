import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";

const Pie = ({ selectedTypeValue }) => {
  useEffect(() => {
    const chartDom = document.getElementById("pie");
    const myChart = echarts.init(chartDom);

    const option = {
      // title: {
      //   text: "Subscription Details",
      //   subtext: "Fake Data",
      //   left: "left",
      // },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: selectedTypeValue,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [selectedTypeValue]);

  return <Box id="pie" />;
};

export default Pie;
