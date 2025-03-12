import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Define interface for series data
interface BarSeriesData {
  name: string;
  data: number[];
}

const BarChart: React.FC = () => {
  // Memoized bar colors
  const barColors = useMemo(
    () => ['#2ecc71', '#f1c40f', '#c0392b', '#8e44ad', '#e74c3c'],
    [],
  );

  // Memoized series data
  const series = useMemo<BarSeriesData[]>(
    () => [
      { name: 'Unsafe Behaviors & Hazards', data: [100] },
      { name: 'Near Misses', data: [100] },
      { name: 'Medical Only', data: [100] },
      { name: 'Lost Time', data: [100] },
      { name: 'Serious Injury or Fatality', data: [100] },
    ],
    [],
  );

  // Memoized chart options
  const options = useMemo<ApexOptions>(
    () => ({
      series, // Reference memoized series
      chart: {
        type: 'bar',
        height: 800,
        toolbar: { show: true },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '41px',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number, opt: { seriesIndex: number; w: { config: { series: BarSeriesData[] } } }) =>
          `${opt.w.config.series[opt.seriesIndex].name}: ${val}`,
        style: {
          fontSize: '14px',
          colors: ['#fff'],
        },
      },
      title: {
        text: 'Safety Pyramid', // Fixed typo "Saftey" -> "Safety"
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
      tooltip: {
        theme: 'dark',
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
    }),
    [barColors, series], // Dependencies
  );

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;