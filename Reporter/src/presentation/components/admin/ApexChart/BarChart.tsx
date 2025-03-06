import { Progress, Stack, Text } from '@mantine/core';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';

const BarChart2: React.FC = () => {
    const options = {
        chart: {
          type: 'bar',
        },
        tooltip: {
            intersect: true,
            theme: 'dark', // Tooltip theme
            x: {
              show: true, // Display the x-axis value in the tooltip
            },
            y: {
              formatter: (val: any) => `${val}`, // Format the Y-axis value
            },
            marker: {
              show: false,
              
            },
          },
          title: {
            text: 'safety Audits',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
              },
          },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Agu'
          ],
          labels: {
            style: {
              colors: ['#222', '#222', '#222', '#222', '#222'], // Set label colors
              fontSize: '20px', // Font size for category labels
              fontWeight: 300, // Font weight for category labels
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
      };
    
      const series = [
        {
          name: 'safety Audits',
          data: [30, 40, 45, 50, 49,60,80,50],
        },
      ];
    
      return (
        <div>
          <Chart options={options as ApexOptions} series={series} type="bar" height={350} />
          <Stack gap={'1em'}>
    <Stack gap={'0.5em'}>
          <Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>Total Safety Audits

          </Text>
        <Progress.Root size="lg" >
        <Progress.Section value={35}  >
          <Progress.Label>35%</Progress.Label>
        </Progress.Section>
      </Progress.Root>
        </Stack>
        <Stack  gap={'0.5em'}>
          <Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>Completed Audits

          </Text>
        <Progress.Root size="lg" >
        <Progress.Section value={95}   color="cyan">
          <Progress.Label>95%</Progress.Label>
        </Progress.Section>
      </Progress.Root>
        </Stack>
        <Stack  gap={'0.5em'}>
          <Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>Pending Audits

          </Text>
        <Progress.Root size="lg" >
        <Progress.Section value={80}  color="yellow">
          <Progress.Label>80%</Progress.Label>
        </Progress.Section>
      </Progress.Root>
        </Stack>
    </Stack>
        </div>
      );
    };
    

export default BarChart2;
