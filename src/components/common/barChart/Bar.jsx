import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";

const Bar = ({ dateList }) => {
  useEffect(() => {
    const chartDom = document.getElementById("bar");
    const myChart = echarts.init(chartDom);
    console.log("dateList ===> ", dateList);
    const xAxisData = Object.keys(dateList);
    console.log(
      "dateList ===> ",
      xAxisData.map((date) => dateList[date].chat_count)
    );
    const option = {
      // title: {
      //   text: "Chats and Sessions",
      //   subtext: "Fake Data",
      //   left: "left",
      // },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      toolbox: {
        show: false,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: false,
      xAxis: [
        {
          type: "category",
          data: xAxisData,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Chat Counts",
          type: "bar",
          data: xAxisData.map((date) => dateList[date].chat_count),
          // markPoint: {
          //   data: [
          //     { type: "max", name: "Max" },
          //     { type: "min", name: "Min" },
          //   ],
          // },
          // markLine: {
          //   data: [{ type: "average", name: "Avg" }],
          // },
        },
        {
          name: "Session Counts",
          type: "bar",
          data: xAxisData.map((date) => dateList[date].session_count),
          // markPoint: {
          //   data: [
          //     { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
          //     { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
          //   ],
          // },
          // markLine: {
          //   data: [{ type: "average", name: "Avg" }],
          // },
        },
      ],
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [dateList]);

  return <Box id="bar" />;
};

export default Bar;
