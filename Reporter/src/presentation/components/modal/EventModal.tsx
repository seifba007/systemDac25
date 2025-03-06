import React, { useEffect, useState } from 'react';
import { timeOptions } from '@/data/timeZone';
import { CancelButton } from '@/presentation/components/button/Button';
import {
	Box,
	Button,
	Center,
	Group,
	Modal,
	ScrollArea,
	Select,
	Stack,
	TextInput,
	Textarea,
	Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { ArrowDown2, Calendar, Clock, Link2 } from 'iconsax-react';
import dayjs from 'dayjs';
import { parseTime } from '@/utils/helpers';
import useResponsive from '@/presentation/shared/mediaQuery';
import {
	createCalendarEvent,
	updateCalendarEvent,
} from '@/core/services/modulesServices/calendar.service';
import errorHandler from '@/core/services/requestServices/errorHandle';
import toast from 'react-hot-toast';
type EventProps = {
	opened: boolean;
	close: () => void;
	closeModal: () => void;
	isUpdate: { isOnUpdate: boolean };
	setIsUpdate: React.Dispatch<
		React.SetStateAction<{
			isOnUpdate: boolean;
		}>
	>;
	eventData: any | null;
	isDateUpdate: boolean;
};

const colors = {
	veryPaleLavender: '#D9D2FF',
	lightCyan: '#DFF2F7',
	veryPaleMintGreen: '#DEF5E6',
	vividTangerine: '#F99910',
	lightGray: '#E5E5E5',
};
type ColorType = keyof typeof colors;

type FomValues = {
	title: string;
	startDate: Date | null;
	endDate: Date | null;
	startTime: Date | string;
	endTime: Date | string;
	meetingLink: string;
	note: string;
};

const EventModal = ({
	closeModal,
	opened,
	close,
	eventData,
	setIsUpdate,
	isUpdate,
	isDateUpdate,
}: EventProps) => {
	const { isMobile } = useResponsive();
	const form = useForm<FomValues>({
		initialValues: {
			title: '',
			startDate: null,
			endDate: null,
			startTime: '',
			endTime: '',
			meetingLink: '',
			note: '',
		},
		validate: {
			title: (value) => (!value ? 'required' : null),
			startDate: (value) => (!value ? 'required' : null),
			endDate: (value) => (!value ? 'required' : null),
		},
	});
	const [loading, setLoading] = useState(false);
	const [colorSelected, setColorSelected] = useState<ColorType | null>(null);

	const handleSubmit = (value: FomValues) => {
		if (!colorSelected) {
			return toast.error('Select a color');
		}
		if (!value.startDate || !value.endDate) return;
		if (value.startDate > value.endDate) {
			return toast.error('The end date should not be sooner than your start date!');
		}
		if (isUpdate.isOnUpdate) {
			if (!eventData) return;
			if (!value.startDate || !value.startTime || !value.endDate || !value.endTime) return;
			setLoading(true);
			const data: Partial<any> = {
				title: value.title,
				color: colors[colorSelected],
				note: value.note,
				startDate: parseTime(value.startTime.toString(), value.startDate).toISOString(),
				endDate: parseTime(value.endTime.toString(), value.endDate).toISOString(),
			};
			if (value.meetingLink) {
				data.meetingLink = value.meetingLink;
			}
			setLoading(true);
			updateCalendarEvent(data, eventData.id)
				.then(() => toast.success('event updated successfully '))
				.catch(errorHandler)
				.finally(() => {
					close();
					typeof closeModal === 'function' && closeModal();
					setLoading(false);
					setIsUpdate({ isOnUpdate: false });
					form.reset();
				});
		}

		if (!isUpdate.isOnUpdate) {
			if (!value.startDate || !value.startTime || !value.endDate || !value.endTime) return;
			setLoading(true);
			const data: Partial<any> = {
				title: value.title,
				color: colors[colorSelected],
				note: value.note,
				startDate: parseTime(value.startTime.toString(), value.startDate).toISOString(),
				endDate: parseTime(value.endTime.toString(), value.endDate).toISOString(),
			};
			if (value.meetingLink) {
				data.meetingLink = value.meetingLink;
			}
			createCalendarEvent(data)
				.then(() => {
					toast.success('New event created');
					setIsUpdate({ isOnUpdate: false });
					close();
				})
				.catch(errorHandler)
				.finally(() => setLoading(false));
		}
		return;
	};

	useEffect(() => {
		if (isUpdate.isOnUpdate) {
			if (eventData) {
				form.setValues({
					startDate: dayjs(eventData?.startDate).toDate(),
					endDate: dayjs(eventData.endDate).toDate(),
					startTime: dayjs(eventData?.startDate).format('h:mm A'),
					endTime: dayjs(eventData.endDate).format('h:mm A'),
					title: eventData.title,
					meetingLink: eventData.meetingLink || '',
					note: eventData.note || '',
				});
				const colorKey = Object.keys(colors).find(
					(key) => colors[key as ColorType] === eventData.color,
				) as ColorType | undefined;

				if (colorKey) setColorSelected(colorKey);
			}
		} else {
			form.setValues({
				title: '',
				startDate: null,
				endDate: null,
				startTime: '',
				endTime: '',
				meetingLink: '',
				note: '',
			});
		}
	}, [isUpdate, open]); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<Modal
			opened={opened}
			size={508}
			onClose={close}
			radius={8}
			centered
			fullScreen={isMobile}
			scrollAreaComponent={ScrollArea.Autosize}
		>
			<Stack>
				<Stack gap={20}>
					<Title order={2} fz={25}>
						{isUpdate.isOnUpdate ? 'Update' : 'Create'} event
					</Title>
					<Group gap={12}>
						<Group>
							{isUpdate.isOnUpdate ? 'Update your event' : 'Add details to your new event'}
						</Group>
					</Group>
				</Stack>
			</Stack>

			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack mt={20}>
					<TextInput
						size='md'
						radius={'0.5rem'}
						placeholder='title'
						{...form.getInputProps('title')}
					/>
					<Group>
						<DateInput
							label='Start date'
							styles={{ label: { fontSize: '0.8rem' } }}
							size='md'
							radius={'0.5rem'}
							placeholder={'June 12, 2024'}
							disabled={isDateUpdate}
							leftSection={<Calendar size={16} color={'#353A44'} />}
							{...form.getInputProps('startDate')}
						/>
						<Select
							label='Start time'
							styles={{ label: { fontSize: '0.8rem' } }}
							flex={1}
							size='md'
							radius={'0.5rem'}
							data={timeOptions}
							placeholder='9:00 AM'
							disabled={isDateUpdate}
							{...form.getInputProps('startTime')}
							leftSectionPointerEvents='none'
							leftSection={<Clock size={16} color={'#353A44'} />}
							rightSection={<ArrowDown2 size={24} color='#0A0C0E' />}
						/>
					</Group>
					<Group>
						<DateInput
							label='End date'
							styles={{ label: { fontSize: '0.8rem' } }}
							size='md'
							radius={'0.5rem'}
							placeholder={'June 12, 2024'}
							disabled={isDateUpdate}
							leftSection={<Calendar size={16} color={'#353A44'} />}
							{...form.getInputProps('endDate')}
						/>
						<Select
							label='End time'
							styles={{ label: { fontSize: '0.8rem' } }}
							flex={1}
							size='md'
							radius={'0.5rem'}
							data={timeOptions}
							placeholder='9:00 AM'
							disabled={isDateUpdate}
							{...form.getInputProps('endTime')}
							leftSectionPointerEvents='none'
							leftSection={<Clock size={16} color={'#353A44'} />}
							rightSection={<ArrowDown2 size={24} color='#0A0C0E' />}
						/>
					</Group>
					<TextInput
						size='md'
						radius={'0.5rem'}
						placeholder='http://meetingLink.com'
						{...form.getInputProps('meetingLink')}
						leftSection={<Link2 size={16} color='#353A44' />}
					/>
					<Textarea
						size='md'
						radius={'0.5rem'}
						placeholder='description'
						styles={{ input: { height: 144 } }}
						{...form.getInputProps('note')}
					/>
				</Stack>

				<ColorSelector colorSelected={colorSelected} setColorSelected={setColorSelected} />
				<Box>
					<Group ml={'auto'} mt={48} w={'fit-content'}>
						<CancelButton
							size='md'
							onClick={() => {
								setIsUpdate({ isOnUpdate: false });
								close();
							}}
						/>
						<Button loading={loading} type='submit' size='md'>
							Save
						</Button>
					</Group>
				</Box>
			</form>
		</Modal>
	);
};
const ColorSelector = ({
	colorSelected,
	setColorSelected,
}: {
	colorSelected: ColorType | null;
	setColorSelected: (color: ColorType) => void;
}) => (
	<Group mt={20}>
		{Object.entries(colors).map(([colorKey, colorValue]) => (
			<ColorCircle
				key={colorKey}
				color={colorValue}
				isSelected={colorSelected === colorKey}
				onClick={() => setColorSelected(colorKey as ColorType)}
			/>
		))}
	</Group>
);

const ColorCircle = ({
	color,
	isSelected,
	onClick,
}: {
	color: string;
	isSelected: boolean;
	onClick: () => void;
}) => (
	<Center
		onClick={onClick}
		style={{
			border: `8px solid ${color}`,
			borderRadius: '50%',
			cursor: 'pointer',
		}}
	>
		<Box w={15} h={15} bg={isSelected ? 'white' : color} style={{ borderRadius: '50%' }} />
	</Center>
);

export default EventModal;
