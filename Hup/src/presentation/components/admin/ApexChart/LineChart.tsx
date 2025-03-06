import { Progress, Stack, Text } from '@mantine/core';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart: React.FC = () => {
	const [state, setState] = React.useState({
		series: [
			{
				name: 'Desktops',
				data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
			},
		],
		options: {
			chart: {
				height: 350,
				type: 'line',
			},
			dataLabels: {
				enabled: false,
			},
			tooltip: {
				shared: true,
				intersect: false,
				theme: 'dark', // Tooltip theme
				marker: {
					show: false, // Show markers in tooltip
				},
			},
			stroke: {
				curve: 'straight',
			},
			title: {
				text: 'Product Trends by Month',
				align: 'left',
			},
			grid: {
				row: {
					colors: ['#f3f3f3', 'transparent'], // alternating row colors
					opacity: 0.5,
				},
			},
			xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
			},
		},
	});

	return (
		<div>
			<div id='chart'>
				<ReactApexChart
					options={state.options as ApexOptions}
					series={state.series}
					type='line'
					height={350}
				/>
				<Stack>
					<Stack gap={'0.5em'}>
						<Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>
							Total Incident Reports
						</Text>
						<Progress.Root size='lg'>
							<Progress.Section value={35}>
								<Progress.Label>35%</Progress.Label>
							</Progress.Section>
						</Progress.Root>
					</Stack>
					<Stack gap={'0.5em'}>
						<Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>
							Resolved Incidents
						</Text>
						<Progress.Root size='lg'>
							<Progress.Section value={95} color='cyan'>
								<Progress.Label>95%</Progress.Label>
							</Progress.Section>
						</Progress.Root>
					</Stack>
					<Stack gap={'0.5em'}>
						<Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>
							Pending Incidents
						</Text>
						<Progress.Root size='lg'>
							<Progress.Section value={60} color='yellow'>
								<Progress.Label>60%</Progress.Label>
							</Progress.Section>
						</Progress.Root>
					</Stack>
				</Stack>
			</div>
		</div>
	);
};

export default LineChart;
