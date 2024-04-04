import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";

const Bar = ({ dateList }) => {
  useEffect(() => {
    const chartDom = document.getElementById("bar");
    const myChart = echarts.init(chartDom);
    const xAxisData = Object.keys(dateList);
    const option = {
      tooltip: {
        trigger: "axis",
        position: function (point, params, dom, rect, size) {
          var x = point[0]; 
          var y = point[1];
          var viewWidth = size.viewSize[0];
          var viewHeight = size.viewSize[1];
          var boxWidth = size.contentSize[0];
          var boxHeight = size.contentSize[1];
          if (x > viewWidth - boxWidth) {
            x = viewWidth - boxWidth;
          }
          if (y > viewHeight - boxHeight) {
            y = viewHeight - boxHeight;
          }
          
          return [x, y];
        }
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
        },
        {
          name: "Session Counts",
          type: "bar",
          data: xAxisData.map((date) => dateList[date].session_count),
        },
      ],
      graphic: [
        {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text:
              !dateList ||
              (Object.keys(dateList).length === 0 ? "No data available" : ""),
            font: "24px Arial",
            fill: "#999",
          },
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
