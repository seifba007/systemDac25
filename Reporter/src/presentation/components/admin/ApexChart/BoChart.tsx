import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts, { ApexOptions } from 'apexcharts';

const BarChart: React.FC = () => {
  // Define the bar colors
  const barColors = ['#2ecc71', '#f1c40f', '#c0392b', '#8e44ad', '#e74c3c'];

  // Chart options and series data
  const options = {
    series: [
      { name: 'Unsafe Behaviors & Hazards', data: [100] },
      { name: 'Near Misses', data: [100] },
      { name: 'Medical Only', data: [100] },
      { name: 'Lost Time', data: [100] },
      { name: 'Serious Injury or Fatality', data: [100] },
    ],
    chart: {
      type: 'bar',
      height: 800,
      toolbar: { show: true },
    },
    plotOptions: {
      bar: {
        size: 125,
        horizontal: true,
        barHeight: '41px',
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any, opt: any) {
        return opt.w.config.series[opt.seriesIndex].name + ': ' + val;
      },
      style: {
        fontSize: '14px',
        colors: ['#fff'],
      },
    },
    
    title: {
        text: 'Saftey Pyramid',

        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
    tooltip: {
        theme: 'dark', // Tooltip theme
        marker: {
          show: false, 
        },
      },
    xaxis: {
        
      max: 100,
      labels: { show: true },
    },
    yaxis: {
      show: true,
      
    },
    grid: {
      show: false,
      padding: {
        top: 5,
        bottom: 0,
      },
    },
    colors: barColors,
    legend: { show: false },

  };

  // Render chart
  return (
    <div id="chart">
      <ReactApexChart
        options={options as ApexOptions}
        series={options.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
