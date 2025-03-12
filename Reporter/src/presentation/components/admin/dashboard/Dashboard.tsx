import React, { useState, useMemo } from 'react';
import { Center, Flex, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
  Calendar,
  Calendar1,
  Decred,
  DocumentText,
  Profile2User,
  ShieldTick,
  TickCircle,
} from 'iconsax-react';
import useResponsive from '@/presentation/shared/mediaQuery';
import ApexChart from '../ApexChart/ApexChart';
import LineChart from '../ApexChart/LineChart';
import Line2Chart from '../ApexChart/Line2Chart';
import BarChart from '../ApexChart/BoChart';
import BarChart2 from '../ApexChart/BarChart';
import DashboardCard from './DashboardCard ';

// Define TypeScript interfaces for data
interface ProductSales {
  product: string;
  sales: number;
}

interface DailySales {
  date: string;
  Apples: number;
  Oranges: number;
  Tomatoes: number;
}

interface CountryData {
  name: string;
  value: number;
  color: string;
}

interface MonthlySales {
  month: string;
  Smartphones: number;
  Laptops: number;
  Tablets: number;
}

interface DailyApples {
  date: string;
  Apples: number;
}

interface DashboardCardProps {
  title: string;
  value: string;
  badgeColor: string;
  badgeText: string;
  icon: React.ReactNode;
  subText: string;
  actionColor: string;
}

// Export typed data constants
export const data: ProductSales[] = [
  { product: 'Apples', sales: 120 },

];

export const data2: DailySales[] = [
  { date: 'Mar 22', Apples: 2890, Oranges: 2338, Tomatoes: 2452 },

];

export const data3: MonthlySales[] = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },

];

export const data4: DailyApples[] = [
  { date: 'Mar 22', Apples: 50 },

];

export const data5: CountryData[] = [
  { name: 'USA', value: 400, color: 'indigo.6' },

];

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { isMobile } = useResponsive();

  // Memoized cards data to prevent re-creation
  const cards = useMemo<DashboardCardProps[]>(
    () => [
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
    ],
    [], // No dependencies since this is static data
  );

  // Memoized card components to avoid re-rendering
  const renderedCards = useMemo(
    () =>
      cards.map((card, index) => (
        <DashboardCard key={index} {...card} />
      )),
    [cards],
  );

  // Memoized chart components with titles
  const radarCharts = useMemo(
    () => [
      { title: 'QHSE Radar', component: <ApexChart title="QHSE Radar" /> },
      { title: 'Compliance Radar', component: <ApexChart title="Compliance Radar" /> },
      { title: 'Environment Radar', component: <ApexChart title="Environment Radar" /> },
    ],
    [],
  );

  return (
    <Stack>
      <Flex justify="space-between" align="center">
        <Text
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          ff='"Roboto", sans-serif'
          fw={700}
          c="#6c757d"
          fz="18px"
        >
          QHSE Dashboard
        </Text>
        <DateInput
          placeholder="Select a date"
          value={date}
          onChange={(newDate) => setDate(newDate || new Date())} // Fallback to current date if null
          style={{
            border: 'none',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '0px',
          }}
          rightSection={
            <Center
              w="100%"
              h="36px"
              style={{
                borderRadius: '20%',
                borderTopLeftRadius: '0px',
                borderBottomLeftRadius: '0px',
              }}
              bg="#4254ba"
            >
              <Calendar size="20" color="#fff" variant="Bold" />
            </Center>
          }
        />
      </Flex>

      <SimpleGrid cols={isMobile ? 1 : 3} spacing="lg">
        {renderedCards}
        {radarCharts.map((chart, index) => (
          <Paper key={index} shadow="xs" p="xl">
            {chart.component}
          </Paper>
        ))}
      </SimpleGrid>

      <Flex w="100%" gap="1em">
        <Paper shadow="xs" p="xl" w="50%">
          <LineChart />
        </Paper>
        <Paper shadow="xs" p="xl" w="50%">
          <BarChart2 />
        </Paper>
      </Flex>

      <Flex w="100%" gap="1em">
        <Paper shadow="xs" p="xl" w="50%">
          <Line2Chart />
        </Paper>
        <Paper shadow="xs" p="xl" w="50%">
          <BarChart />
        </Paper>
      </Flex>
    </Stack>
  );
};

export default Dashboard;