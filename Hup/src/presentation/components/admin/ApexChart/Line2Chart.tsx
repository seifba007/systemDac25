import { Progress, Stack, Text } from '@mantine/core';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Line2Chart: React.FC = () => {
	const [state, setState] = React.useState({
		series: [
			{
				name: 'High - 2013',
				data: [
					[1327359600000, 28], // Time in milliseconds (Unix timestamp) along with data value
					[1327446000000, 29],
					[1327532400000, 33],
					[1327618800000, 36],
					[1327878000000, 32],
					[1327964400000, 32],
					[1328050800000, 33],
				],
			},
		],
		options: {
			chart: {
				type: 'area' as 'area',
				height: 350,
			},

			title: {
				text: 'Fundamental Analysis of Stocks',
				align: 'left', // Title aligned to the left
				margin: 10, // Margin for the title
				style: {
					fontSize: '16px',
					fontWeight: 'bold',
					color: '#333',
				},
			},
			markers: {
				size: 5,
				colors: ['#fff'],
				strokeColor: '#fff',
				strokeWidth: 1,
				hover: {
					size: 8, // Make the marker bigger on hover
					colors: ['#FF4560'], // Change marker color on hover
					strokeColor: '#FF4560', // Change the stroke color on hover
					strokeWidth: 2, // Change the stroke width on hover
				},
			},
			xaxis: {
				type: 'datetime', // Set the type as datetime
				labels: {
					align: 'left', // Align x-axis labels to the left
					style: {
						fontSize: '12px', // Customize font size of x-axis labels
						fontWeight: 'normal',
					},
					formatter: function (value: any) {
						// Format the timestamp into a readable date format
						return new Date(value).toLocaleDateString();
					},
				},
			},

			yaxis: {
				opposite: true, // Display y-axis on the opposite side
				labels: {
					style: {
						fontSize: '12px', // Customize font size of y-axis labels
						fontWeight: 'normal',
					},
				},
			},

			stroke: {
				curve: 'smooth', // Smooth curve for area chart
			},

			legend: {
				horizontalAlign: 'right', // Align the legend horizontally to the right
				position: 'top', // Set the legend position to "top"
				floating: true, // Make the legend floating
				offsetX: 10, // Offset the position of the legend horizontally
			},

			tooltip: {
				shared: true,
				intersect: false,
				theme: 'dark', // Tooltip theme
				marker: {
					show: false, // Show markers in tooltip
				},
			},
		},
	});

	return (
		<div>
			<div id='chart'>
				<ReactApexChart
					options={state.options as ApexOptions}
					series={state.series}
					type='area' // Ensure the type matches the chart's type
					height={350}
				/>
				<br />
				<Stack gap={'1em'}>
					<Stack gap={'0.5em'}>
						<Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>
							Total Environment Reports
						</Text>
						<Progress.Root size='lg'>
							<Progress.Section value={35}>
								<Progress.Label>35%</Progress.Label>
							</Progress.Section>
						</Progress.Root>
					</Stack>
					<Stack gap={'0.5em'}>
						<Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>
							Completed Reports
						</Text>
						<Progress.Root size='lg'>
							<Progress.Section value={95} color='cyan'>
								<Progress.Label>95%</Progress.Label>
							</Progress.Section>
						</Progress.Root>
					</Stack>
					<Stack gap={'0.5em'}>
						<Text c={'rgb(17 18 18 / 83%)'} fz={'14px'}>
							Pending Reports
						</Text>
						<Progress.Root size='lg'>
							<Progress.Section value={60} color='yellow'>
								<Progress.Label>60%</Progress.Label>
							</Progress.Section>
						</Progress.Root>
					</Stack>
				</Stack>
			</div>
			<div id='html-dist'></div>
		</div>
	);
};

export default Line2Chart;
