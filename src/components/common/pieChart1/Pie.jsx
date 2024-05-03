import React, { useEffect } from "react";
import * as echarts from "echarts";
import { Box } from "@mui/material";

const Pie = ({ selectedTypeValue }) => {
  console.log("selectedTypeValue----->",selectedTypeValue);
  useEffect(() => {
    const chartDom = document.getElementById("pie");
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: "item",
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
        orient: "horizontal",
        bottom: 10, 
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          // label: {
          //   show: true, 
          //   formatter: '{b}: {d}%', 
          // },
          labelLine: {
            show: false,
          },
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
