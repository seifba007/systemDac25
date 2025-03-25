import React from 'react';
import { Box, Button, Flex, Modal, Text, Title, rem } from '@mantine/core';

interface ConfirmationModalProps {
	title: string;
	subtitle: string;
	opened: boolean;
	close: () => void;
	handleConfirm: () => void;
	isLoading: boolean;
	confirmText?: string;
}

const ConfirmationModal = ({
	title,
	subtitle,
	opened,
	close,
	handleConfirm,
	isLoading,
	confirmText = 'Confirm',
}: ConfirmationModalProps) => {
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
			<Box p={{ base: '1rem', sm: '2rem' }} style={{ textAlign: 'center' }}>
				<Title order={1} fz={{ base: rem(25), md: rem(34) }}>
					{title}
				</Title>
				<Text fz={{ base: rem(14), md: rem(16) }} c={'#53545E'} mt={'1rem'} mb={'1.5rem'}>
					{subtitle}
				</Text>
				<Flex align={'center'} gap={'0.5rem'}>
					<Button
						w={'13rem'}
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
						w={'13rem'}
						h={'2.75rem'}
						radius={'0.5rem'}
						style={{ outline: 'none' }}
						onClick={handleConfirm}
						loading={isLoading}
					>
						{confirmText}
					</Button>
				</Flex>
			</Box>
		</Modal>
	);
};

export default ConfirmationModal;
