import { Center, Flex,Paper,Progress,SimpleGrid, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { AlignBottom, Calendar, Calendar1, Decred, DocumentText, I3Square, Location, PathTool, Profile2User, Setting4, ShieldTick, TickCircle, Ticket } from 'iconsax-react';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import DashboardCard from './DashboardCard ';
import useResponsive from '@/presentation/shared/mediaQuery';
import { ApexOptions } from 'apexcharts';
import ApexChart from '../ApexChart/ApexChart';
import LineChart from '../ApexChart/LineChart';
import Line2Chart from '../ApexChart/Line2Chart';
import BarChart from '../ApexChart/BoChart';
import BarChart2 from '../ApexChart/BarChart';
export const data = [
  {
    product: 'Apples',
    sales: 120,
  },
  {
    product: 'Oranges',
    sales: 98,
  },
  {
    product: 'Tomatoes',
    sales: 86,
  },
  {
    product: 'Grapes',
    sales: 99,
  },
  {
    product: 'Bananas',
    sales: 85,
  },
  {
    product: 'Lemons',
    sales: 65,
  },
];
export const data2 = [
  {
    date: 'Mar 22',
    Apples: 2890,
    Oranges: 2338,
    Tomatoes: 2452,
  },
  {
    date: 'Mar 23',
    Apples: 2756,
    Oranges: 2103,
    Tomatoes: 2402,
  },
  {
    date: 'Mar 24',
    Apples: 3322,
    Oranges: 986,
    Tomatoes: 1821,
  },
  {
    date: 'Mar 25',
    Apples: 3470,
    Oranges: 2108,
    Tomatoes: 2809,
  },
  {
    date: 'Mar 26',
    Apples: 3129,
    Oranges: 1726,
    Tomatoes: 2290,
  },
];
export const data5 = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];
export const data3 = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

export const data4 = [
  {
    date: 'Mar 22',
    Apples: 50,
  },
  {
    date: 'Mar 23',
    Apples: 60,
  },
  {
    date: 'Mar 24',
    Apples: 40,
  },
  {
    date: 'Mar 25',
    Apples: 30,
  },
  {
    date: 'Mar 26',
    Apples: 0,
  },
  {
    date: 'Mar 27',
    Apples: 20,
  },
  {
    date: 'Mar 28',
    Apples: 20,
  },
  {
    date: 'Mar 29',
    Apples: 10,
  },
];
const Dashboard = () => {
  // Get the current date
  const [date, setDate] = useState(new Date());
  const { isMobile } = useResponsive();


  const cards = [
    {
      title: 'Incident Reports',
      value: '180',
      badgeColor: '#159488',
      badgeText: '12%',
      icon: <DocumentText color="#FFF" variant="Bold" />,
      subText: 'Since last month',
      actionColor: '#159488',
    },
    {
      title: 'Safety Audits',
      value: '63',
      badgeColor: '#f7473a',
      badgeText: '12%',
      icon: <ShieldTick color="#FFF" variant="Bold" />,
      subText: 'Since last month',
      actionColor: '#299bf6',
    },
    {
      title: 'Environment Reports',
      value: '180',
      badgeColor: '#159488',
      badgeText: '12%',
      icon: <Decred color="#FFF" variant="Bold" />,
      subText: 'Since last month',
      actionColor: '#f7473a',
    },
    {
      title: 'Compliance Checks',
      value: '180',
      badgeColor: '#fec20d',
      badgeText: '12%',
      icon: <TickCircle color="#FFF" variant="Bold" />,
      subText: 'Location Management',
      actionColor: '#4254ba',
    },
    {
      title: 'Training Programs',
      value: '180',
      badgeColor: '#159488',
      badgeText: '12%',
      icon: <Profile2User color="#FFF" variant="Bold" />,
      subText: 'Since last month',
      actionColor: '#313a46',
    },
    {
      title: 'HSE Meetings',
      value: '180',
      badgeColor: '#159488',
      badgeText: '12%',
      icon: <Calendar1 color="#FFF" variant="Bold" />,
      subText: 'Since last month',
      actionColor: '#fec20d',
    },
  ];
  return (
    <Stack >
      <Flex justify={'space-between'} align={'center'}>
        <Text
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          ff={'"Roboto",sans-serif'}
          fw={'700'}
          c={'#6c757d'}
          fz={'18px'}
        >
          QHSE Dashboard

        </Text>
        <DateInput
  placeholder="Select a date"
  value={date} // Default value is today's date
  style={{
    border: 'none',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
    borderRadius: '0px', 
   
  }}
  rightSection={
    <Center
      w={'100%'}
      h={'36px'}
      style={{
        borderRadius: '20%',
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
      }}
      bg={'#4254ba'}
    >
      <Calendar size="20" color="#fff" variant="Bold" />
    </Center>
  }
/>
      </Flex>


      
      <SimpleGrid cols={isMobile?1:3} spacing="lg">
      {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
        <Paper shadow="xs" p="xl">
        <ApexChart
        title='QHSE Radar'
      />


        </Paper>
        <Paper shadow="xs" p="xl">
        <ApexChart     title='Compliance Radar'
      />
        </Paper>
        <Paper shadow="xs" p="xl">
        <ApexChart     title='Environment Radar'
      />
        </Paper>
  
      </SimpleGrid>


<Flex w={'100%'} gap={'1em'}>
<Paper shadow="xs" p="xl" w={'50%'}>
       <LineChart />
   
        </Paper>
        <Paper shadow="xs" p="xl" w={'50%'}>
    
     <BarChart2
  
    /> 
        </Paper>
</Flex>
<Flex w={'100%'} gap={'1em'}>
<Paper shadow="xs" p="xl" w={'50%'}>
<Line2Chart/>

        </Paper>
        <Paper shadow="xs" p="xl" w={'50%'}>
        <BarChart />       </Paper>
</Flex>
    </Stack>
  );
};

export default Dashboard;
