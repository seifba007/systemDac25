import React, { useMemo } from 'react';
import { Progress, Stack, Text } from '@mantine/core';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

// Define interfaces for series data
interface BarSeriesData {
  name: string;
  data: number[];
}

const BarChart2: React.FC = () => {
  // Memoized chart options
  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: 'bar',
      },
      tooltip: {
        intersect: true,
        theme: 'dark',
        x: {
          show: true,
        },
        y: {
          formatter: (val: number) => `${val}`, // Type val as number
        },
        marker: {
          show: false,
        },
      },
      title: {
        text: 'Safety Audits',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333',
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Corrected 'Agu' to 'Aug'
        labels: {
          style: {
            colors: Array(8).fill('#222'), // Consistent color array
            fontSize: '20px',
            fontWeight: 300,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
    }),
    [], // No dependencies since this is static
  );

  // Memoized series data
  const series = useMemo<BarSeriesData[]>(
    () => [
      {
        name: 'Safety Audits',
        data: [30, 40, 45, 50, 49, 60, 80, 50],
      },
    ],
    [], // No dependencies since this is static
  );

  // Memoized progress data for better organization
  const progressData = useMemo(
    () => [
      { label: 'Total Safety Audits', value: 35, color: 'gray' },
      { label: 'Completed Audits', value: 95, color: 'cyan' },
      { label: 'Pending Audits', value: 80, color: 'yellow' },
    ],
    [],
  );

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={350} />
      <Stack gap="1em">
        {progressData.map((item, index) => (
          <Stack key={index} gap="0.5em">
            <Text c="rgb(17 18 18 / 83%)" fz="14px">
              {item.label}
            </Text>
            <Progress.Root size="lg">
              <Progress.Section value={item.value} color={item.color}>
                <Progress.Label>{`${item.value}%`}</Progress.Label>
              </Progress.Section>
            </Progress.Root>
          </Stack>
        ))}
      </Stack>
    </div>
  );
};

export default BarChart2;