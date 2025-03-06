import useResponsive from '@/presentation/shared/mediaQuery';
import { Button, Flex, Modal, ScrollArea, Text } from '@mantine/core';
import React from 'react';

export default function FormModal({
	opened,
	close,
	children,
	title,
	submit,
	loading,
	headerAdditionalContent,
}: {
	opened: boolean;
	close: () => void;
	children: React.ReactNode;
	title: string;
	submit?: () => void;
	loading: boolean;
	headerAdditionalContent?: React.ReactNode;
}) {
	const { isMobile } = useResponsive();

	return (
		<Modal.Root fullScreen={isMobile} opened={opened} onClose={close}>
			<Modal.Overlay />
			<form onSubmit={submit}>
				<Modal.Content
					p={isMobile ? 10 : 20}
					mih='90vh'
					w='100%'
					maw='35rem'
					style={{
						overflow: 'hidden',
						display: 'flex',
						flexDirection: 'column',
						margin: 'auto',
						borderRadius: 15,
					}}
				>
					<Modal.Header>
						<Modal.Title>
							<Text fz={24} fw={600}>
								{title}
							</Text>
						</Modal.Title>
						<Modal.CloseButton />
					</Modal.Header>
					{headerAdditionalContent && <>{headerAdditionalContent}</>}
					<ScrollArea h='100%' px={20} py={10}>
						{children}
					</ScrollArea>
					<Flex p={10} gap={20} justify='end'>
						<Button
							variant='outline'
							size='md'
							color='black'
							onClick={close}
							miw={{ base: 'auto', sm: '10rem' }}
							w='fit-content'
							radius={10}
						>
							Cancel
						</Button>
						<Button
							variant='filled'
							size='md'
							color='black'
							loading={loading}
							type='submit'
							w='fit-content'
							miw={{ base: 'auto', sm: '10rem' }}
							radius={10}
						>
							Confirm
						</Button>
					</Flex>
				</Modal.Content>
			</form>
		</Modal.Root>
	);
}
