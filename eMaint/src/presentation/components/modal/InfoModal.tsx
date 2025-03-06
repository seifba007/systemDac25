import React from 'react';
import { Button, Center, Flex, Modal, Text, Title, rem } from '@mantine/core';
import { Icons } from '@/assets/icons/Icons';

const InfoModal = ({ opened, closeInfo }: { opened: boolean; closeInfo: () => void }) => {
	return (
		<Modal
			opened={opened}
			onClose={() => {}}
			withCloseButton={false}
			styles={{
				body: {
					padding: '0',
				},
			}}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			  }}
			radius={'md'}
			centered
		>
			<Center bg={'blue'} py={rem(64)}>
				<Icons.checked width={163} />
			</Center>
			<Flex direction={'column'} my={rem(28)} gap={rem(12)} align={'center'}>
				<Title order={4}>Request is sent</Title>
				<Text style={{ textAlign: 'center' }} c={'#53545E'} w={'90%'}>
					Wait for an admin to accept your request to delete this question
				</Text>
				<Button onClick={closeInfo} bg={'black'} c={'black.9'} size='lg' radius={'md'} mt={rem(12)}>
					Got it
				</Button>
			</Flex>
		</Modal>
	);
};

export default InfoModal;
