import React from 'react';
import { Box, Button, Modal, Stack, Text, Title } from '@mantine/core';
import { useAppSelector } from '@/core/store/hooks';
import { selectRootLoading } from '@/core/store/modules/rootSlice';

interface DeleteModalProps {
	title: string;
	subtitle: string;
	deleteText: string;
	opened: boolean;
	close: () => void;
	handleDelete: () => void;
}

const DeleteModal = ({
	title,
	subtitle,
	deleteText,
	opened,
	close,
	handleDelete,
}: DeleteModalProps) => {
	const isRootLoading = useAppSelector(selectRootLoading);

	return (
		<Modal
		overlayProps={{
			backgroundOpacity: 0.55,
			blur: 3,
		  }}
			opened={opened}
			onClose={close}
			centered
			withCloseButton={false}
			size={'32rem'}
			radius={'0.75rem'}
		>
			<Box p={{ base: '0.8rem', md: '2rem' }} style={{ textAlign: 'center' }}>
				<Title order={1}>{title}</Title>
				<Text c={'#53545E'} mt={'1rem'} mb={'1.5rem'}>
					{subtitle}
				</Text>
				<Stack>
					<Button
						h={'2.75rem'}
						radius={'0.5rem'}
						fw={500}
						style={{ border: '1px solid #DFDFE4' }}
						onClick={close}
						bg={'black.9'}
						c={'black.0'}
					>
						Cancel
					</Button>
					<Button
						fw={500}
						h={'2.75rem'}
						bg={'#0A0C0E'}
						radius={'0.5rem'}
						style={{ outline: 'none' }}
						onClick={handleDelete}
						loading={isRootLoading}
					>
						{deleteText}
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

export default DeleteModal;
