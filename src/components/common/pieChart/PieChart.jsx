import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { useMediaQuery } from "@mui/material";

const PieChart = ({selectedTypeValue, id}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const totalValue = selectedTypeValue.reduce((total, item) => total + item.value, 0);

  useEffect(() => {

    const myChart = echarts.init(document.getElementById(id));

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: "horizontal",
        bottom: 0, 
        formatter: function(name) {
          const dataItem = selectedTypeValue.find(item => item.name === name);
          return `${name}: ${dataItem.value} (${((dataItem.value / totalValue) * 100).toFixed(2)}%)`;
        },         
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          labelLine: {
            show: false
          },
          data: selectedTypeValue,
          label: {
            show:false, 
          },
        }
      ]
    };

    myChart.setOption(option);
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id={id} style={{ width: '80%', height: '80%' }} />;
};

export default PieChart;
