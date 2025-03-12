import React, { useState } from 'react';
import { Box, Button, Center, Flex, Menu, Text } from '@mantine/core';
import Draggable from 'react-draggable';
import LineChart from '../ApexChart/LineChart';
import BarChart from '../ApexChart/BarChart';
import { DateInput } from '@mantine/dates';
import { Add, ArrowDown2, Calendar, Category } from 'iconsax-react';
import { Resizable } from 're-resizable';
import useResponsive from '@/presentation/shared/mediaQuery';

interface InputItem {
	id: string;
	value: string;
	x: number;
	y: number;
	width: any;
	height: any;
	type: 'dataPanel' | 'graph' | 'table' | 'custom';
}

const Dashboard = () => {
	const [elements, setElements] = useState<InputItem[]>([]);
	const [panelId, setPanelId] = useState(0);
	const [resizingPanel, setResizingPanel] = useState<string | null>(null); // Track the resizing state
	const [date, setDate] = useState(new Date());

	const handleDragStop = (id: string, e: any, data: any) => {
		setElements((prevElements) =>
			prevElements.map((elem) => (elem.id === id ? { ...elem, x: data.x, y: data.y } : elem)),
		);
	};

	const addInput = (type: 'dataPanel' | 'graph' | 'table' | 'custom') => {
		const newId = `panel-${panelId}`;
		setPanelId(panelId + 1);

		const newElement: InputItem = {
			id: newId,
			value: type,
			x: 0,
			y: 0,
			width: 'auto',
			height: 900,
			type,
		};

		setElements([...elements, newElement]);
	};
	const { isMobile } = useResponsive();
	return (
		<Box className='relative w-full h-screen bg-gray-100'>
			<Flex justify={'space-between'} pt={isMobile ? '1em' : '0em'} align={'center'} wrap={'wrap'}>
				<Text
					pb={isMobile ? '1em' : '0em'}
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
					SmarDac Hub : Main Dashboard
				</Text>
				<Flex gap={'1em'}>
					<DateInput
						placeholder='Select a date'
						value={date}
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
								<Calendar size='20' color='#fff' variant='Bold' />
							</Center>
						}
					/>
					<Menu width={200} shadow='md' withArrow>
						<Menu.Target>
							<Button
								bg={'#17a497'}
								leftSection={<Add size='20px' color='#fff' />}
								rightSection={<ArrowDown2 size='18px' color='#fff' variant='Bold' />}
							>
								{isMobile ? '' : 'Add Panel'}
							</Button>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item onClick={() => addInput('dataPanel')}>
								<Text fz={'15px'} fw={'600'} c={'#575b60'}>
									Data Panel
								</Text>
							</Menu.Item>
							<Menu.Item onClick={() => addInput('graph')}>
								<Text fz={'15px'} fw={'600'} c={'#575b60'}>
									Graph
								</Text>
							</Menu.Item>
							<Menu.Item>
								<Text fz={'15px'} fw={'600'} c={'#575b60'}>
									Data Table
								</Text>
							</Menu.Item>
							<Menu.Item>
								<Text fz={'15px'} fw={'600'} c={'#575b60'}>
									Custom Panel
								</Text>
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Flex>
			</Flex>

			<Box className='w-full h-full'>
				{elements.map((elem) => (
					<Draggable
						key={elem.id}
						defaultPosition={{ x: elem.x, y: elem.y }}
						onStop={(e, data) => handleDragStop(elem.id, e, data)}
						disabled={resizingPanel === elem.id} // Disable drag if resizing
						handle={`.drag-handle-${elem.id}`} // Allow dragging only via handle
						cancel='.resizable-container' // Prevent drag on resizable content
					>
						<Box
							className='grid-stack-item ui-resizable-autohide'
							style={{ position: 'relative' }} // Make parent position relative
						>
							{/* Drag Handle */}
							<Box
								className={`drag-handle-${elem.id}`}
								style={{
									position: 'absolute', // Position absolutely within the parent
									top: 0,
									left: 0,
									width: '36%', // Full width of the container
									textAlign: 'center',
									padding: '8px 12px',
									height: '30px',

									color: '#333',
									fontWeight: 'bold',
									cursor: 'move',
									zIndex: 10, // Ensure the drag handle is above other elements
								}}
							/>

							{/* Resizable Content */}
							<Resizable
								defaultSize={{
									width: elem.width,
									height: elem.height,
								}}
								className='resizable-container'
								style={{
									border: '1px solid #ccc',
									backgroundColor: '#fff',
									borderRadius: '5px',
									padding: '10px',
									position: 'relative', // Ensure position is relative for inner elements
								}}
								onResizeStart={() => setResizingPanel(elem.id)} // Set resizing panel
								onResizeStop={(e, direction, ref, delta) => {
									setResizingPanel(null); // Reset resizing state
									setElements((prevElements) =>
										prevElements.map((item) =>
											item.id === elem.id
												? {
														...item,
														width: ref.offsetWidth,
														height: ref.offsetHeight,
												  }
												: item,
										),
									);
								}}
							>
								{/* Panel Content */}
								<Box style={{ width: '100%', height: '100%', marginTop: '40px' }}>
									{/* Adjusted margin to account for "Drag Here" height */}
									{elem.type === 'dataPanel' && <LineChart />}
									{elem.type === 'graph' && <BarChart />}
								</Box>
							</Resizable>
						</Box>
					</Draggable>
				))}
			</Box>
		</Box>
	);
};

export default Dashboard;
