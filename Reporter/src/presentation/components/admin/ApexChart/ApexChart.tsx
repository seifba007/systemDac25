import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ApexChartProps {
	title: string;
}

const ApexChart: React.FC<ApexChartProps> = ({ title }) => {
	const [state] = React.useState({
		series: [
			{
				name: 'Environment ',
				data: [95, 100, 95, 70, 80],
			},
		],
		options: {
			chart: {
				height: 350,
				type: 'radar' as 'radar',
			},
			dataLabels: {
				enabled: false,
			},
			plotOptions: {
				radar: {
					polygons: {
						strokeColors: '#e9e9e9',
						fill: {
							colors: ['#fff', '#fff'],
						},
					},
				},
			},
			title: {
				text: title,
				style: {
					color: '#222', // Set the title color
					fontSize: '12px', // Set the font size of the title
					fontWeight: '400', // Optional: Set the font weight
				},
			},
			colors: ['#4254ba'],
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

			xaxis: {
				categories: ['Heath & saftey', 'Quality', 'Environmental', 'Operational', 'Regulatory'],
				labels: {
					style: {
						color: '#222', // Set the color of the x-axis labels
						fontSize: '2px', // Set the font size of the x-axis labels
						fontWeight: '300', // Set the font weight
					},
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
					type='radar'
					height={400}
				/>
			</div>
			<div id='html-dist'></div>
		</div>
	);
};

export default ApexChart;
