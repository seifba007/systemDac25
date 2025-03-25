import React, { useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import {
	Badge,
	Box,
	Button,
	Center,
	Flex,
	Group,
	Loader,
	Modal,
	Paper,
	rem,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AddCircle, Clock, CloseCircle, TickCircle } from 'iconsax-react';
import WorkOrderModal from '../modal/TTDateModal';

const localizer = dayjsLocalizer(dayjs);

type EventsListType = {
	id: string;
	title: string;
	start: Date;
	end: Date;
	color: string;
	description?: string;
	typeOfWorkOrder?: string;
	PriorityLevel?: string;
	assetId?: string;
	workOrderId?: string;
};

const CalendarPage = () => {
	const [eventsList, setEventsList] = useState<EventsListType[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<EventsListType | null>(null);
	const [loading, setLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [isEditing, setIsEditing] = useState(false);
	const [opened2, { open: open2, close: close2 }] = useDisclosure(false);

	useEffect(() => {
		setLoading(true);
		// Simulated API call to fetch events
		setTimeout(() => {
			setEventsList([
				{
					id: '1',
					title: 'Preventive Maintenance',
					start: new Date(),
					end: new Date(),
					color: 'rgba(23, 164, 151, 0.75)',
					description: 'Preventive maintenance for equipment A.',
				},
			]);
			setLoading(false);
		}, 1000);
	}, []);

	const getColorByWorkOrderType = (type: string): string => {
		switch (type) {
			case 'Preventive':
				return 'rgba(23, 164, 151, 0.75)';
			case 'Inspection':
				return 'rgba(254, 194, 13, 0.75)';
			case 'Corrective':
				return 'rgba(247, 71, 58, 0.75)';
			case 'Certification':
				return 'rgba(66, 84, 186, 0.75)';
			default:
				return '#3498db'; // Default color
		}
	};

	const handleAddOrUpdateEvent = (formData: any) => {
		const newEvent: EventsListType = {
			id: isEditing && selectedEvent ? selectedEvent.id : `${Date.now()}`,
			title: formData.title,
			start: new Date(formData.startDate),
			end: new Date(
				new Date(formData.endDate).setDate(new Date(formData.endDate).getDate() + 1) - 1,
			), // Adjust end date
			color: getColorByWorkOrderType(formData.typeOfWorkOrder),
			description: formData.description,
			typeOfWorkOrder: formData.typeOfWorkOrder,
			PriorityLevel: formData.PriorityLevel,
			assetId: formData.assetId,
			workOrderId: formData.workOrderId,
		};

		if (isEditing && selectedEvent) {
			setEventsList((prev) =>
				prev.map((event) => (event.id === selectedEvent.id ? newEvent : event)),
			);
		} else {
			setEventsList((prev) => [...prev, newEvent]);
		}

		close();
		close2();
		setIsEditing(false);
		setSelectedEvent(null);
	};

	const handleEventClick = (event: EventsListType) => {
		setSelectedEvent(event);
		setIsEditing(true);
		open2();
	};

	return (
		<Stack px='lg'>
			<Text
				style={{
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
				}}
				ff={'"Roboto", sans-serif'}
				fw={'700'}
				c={'#6c757d'}
				fz={'18px'}
			>
				Workorders Management
			</Text>
			<Paper shadow='xs' p='xl'>
				<Flex gap={'2em'} wrap={'wrap'}>
					<Box w={'14em'}>
						<Button
							leftSection={<AddCircle size={'19px'} variant='Bold' />}
							onClick={() => {
								setIsEditing(false);
								open();
							}}
						>
							Create New WorkOrder
						</Button>
					</Box>
					{loading ? (
						<Center>
							<Loader />
						</Center>
					) : (
						<Calendar
							localizer={localizer}
							events={eventsList}
							startAccessor='start'
							endAccessor='end'
							style={{ height: '80vh', width: '100%' }}
							onSelectEvent={handleEventClick}
							eventPropGetter={(event) => ({
								style: { backgroundColor: event.color, height: '5em' },
							})}
						/>
					)}
				</Flex>
			</Paper>

			<Modal
				opened={opened2}
				onClose={close2}
				radius={12}
				size={504}
				centered
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
				title={<Title order={4}>{selectedEvent?.title}</Title>}
			>
				{loading ? (
					<Center>
						<Loader />
					</Center>
				) : (
					<Stack gap={35} px={{ base: 12, md: 32 }} pb={10}>
						<Stack>
							<Group gap={8}>
								<TickCircle size={'20'} color='lime' variant='Bold' />
								<Group gap={8}>
									<Text fz={rem(14)} c={'#53545E'}>
										<Text fz={12}>WorkForce</Text>
									</Text>
									<Text span>--&gt;</Text>
									<Text fz={rem(14)} c={'#53545E'}>
										seifbenaicha
									</Text>
								</Group>
							</Group>
							<Group gap={8}>
								<TickCircle size={'20'} color='lime' variant='Bold' />
								<Group gap={8}>
									<Text fz={rem(14)} c={'#53545E'}>
										<Text fz={12}>Procedure</Text>
									</Text>
									<Text span>--&gt;</Text>
									<Text fz={rem(14)} c={'#53545E'}>
										seifbenaicha
									</Text>
								</Group>
							</Group>
							<Group gap={8}>
								<CloseCircle size={'20'} color='red' variant='Bold' />
								<Group gap={8}>
									<Text fz={rem(14)} c={'#53545E'}>
										<Text fz={12}>Spare Parts</Text>
									</Text>
									<Text span>--&gt;</Text>
									<Text fz={rem(14)} c={'#53545E'}>
										seifbenaicha
									</Text>
								</Group>
							</Group>
							<Group gap={8}>
								<CloseCircle size={'20'} color='red' variant='Bold' />
								<Group gap={8}>
									<Text fz={rem(14)} c={'#53545E'}>
										<Text fz={12}>Type of Work Order</Text>
									</Text>
									<Text span>--&gt;</Text>
									<Text fz={rem(14)} c={'#53545E'}>
										{selectedEvent?.typeOfWorkOrder}
									</Text>
								</Group>
							</Group>

							<Group gap={8}>
								<CloseCircle size={'20'} color='red' variant='Bold' />
								<Group gap={8}>
									<Text fz={rem(14)} c={'#53545E'}>
										<Text fz={12}>Priority Level</Text>
									</Text>
									<Text span>--&gt;</Text>
									<Text fz={rem(14)} c={'#53545E'}>
										{selectedEvent?.PriorityLevel}
									</Text>
								</Group>
							</Group>
							<Group gap={8}>
								<Clock size={'20'} color='#53545E' />
								<Group gap={8}>
									<Text fz={rem(14)} c={'#53545E'}>
										{dayjs(selectedEvent?.end).format('YYYY/MM/DD')}
									</Text>
									<Text span>--&gt;</Text>
									<Text fz={rem(14)} c={'#53545E'}>
										{dayjs(selectedEvent?.end).format('YYYY/MM/DD')}
									</Text>
								</Group>
							</Group>
							<Stack>
								<Flex align={'center'} gap={10}>
									<Text fz={14} fw={600}>
										Description:
									</Text>
									<Text fz={12}>{selectedEvent?.description}</Text>
								</Flex>
							</Stack>
							<Stack>
								<Flex align={'center'} gap={10}>
									<Text fz={14} fw={600}>
										Status:
									</Text>
									<Badge variant='outline' color='green'>
										<Text fz={10} fw={600}>
											Complete
										</Text>
									</Badge>
								</Flex>
							</Stack>
							<Button onClick={open} h={45} bg={'#0A0C0E'} radius={8} c={'white'}>
								Modify WorkOrder
							</Button>
						</Stack>
					</Stack>
				)}
			</Modal>

			<WorkOrderModal
				opened={opened}
				onClose={close}
				onSubmit={handleAddOrUpdateEvent}
				eventData={selectedEvent}
				isEditing={isEditing}
			/>
		</Stack>
	);
};

export default CalendarPage;
