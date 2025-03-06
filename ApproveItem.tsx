import React, { ReactNode } from 'react';
import { Modal, Text, Flex, Box, Stack, Button, Autocomplete, Textarea } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { ArrowDown2 } from 'iconsax-react';
interface ModelFilterProps {
	opened: boolean;
	isReject?: boolean;
	onClose: () => void;
	bnt?: ReactNode;
	roleData: {
		roles: { key: string; label: string }[]; // Role structure corrected
	}[];
}
const ApproveItem: React.FC<ModelFilterProps> = ({ opened, onClose, isReject }) => {
	return (
		<Modal
			size='35em'
			opened={opened}
			onClose={onClose}
			title={<Text c={'#fff'}>{isReject ? 'Reject Item  ' : 'Delegate Action'}</Text>}
			styles={{
				header: {
					gap: '6em',
					alignItems: 'flex-start',
					background: isReject ? '#f7473a' : '#159488',
				},
			}}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			  }}
			radius='5px'
		>
			<Stack mt={'1em'}>
				<Text fw={'700'} fz={'13px'} c={'#868e96'}>
					{isReject
						? 'Confirm your rejection for this item.'
						: 'Confirm your approval for the initial stage. Please select the final approver:'}
					{isReject ? null : (
						<Autocomplete
							rightSectionPointerEvents='none'
							rightSection={<ArrowDown2 size='16' color='#6c757d' />}
							label={
								<Text pb={'0.5em'} c={'#868e96'}>
									Final Approver
								</Text>
							}
							data={['React', 'Angular', 'Vue', 'Svelte']}
						/>
					)}
				</Text>
				<Textarea
					label={
						<Text pb={'0.3em'} c={'#868e96'}>
							Comments
						</Text>
					}
				/>{' '}
				<Box
					style={{
						height: '0.7px',
						background: '#DFDFDF',
					}}
				></Box>
				<Flex gap={20} justify='end'>
					<Button
						variant='outline'
						size='md'
						color={isReject ? '#f7473a' : '#159488'}
						onClick={onClose}
						radius={10}
					>
						Cancel
					</Button>
					<Button
						variant='filled'
						size='md'
						color={isReject ? '#f7473a' : '#159488'}
						loading={false}
						type='submit'
						radius={10}
					>
						Save Changes
					</Button>
				</Flex>
			</Stack>
		</Modal>
	);
};

export default ApproveItem;
