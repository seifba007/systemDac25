import React, { ReactNode, useState } from 'react';
import { Modal, Text, Flex, Box, Stack, Button, Select, Textarea } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { ArrowDown2 } from 'iconsax-react';
import toast from 'react-hot-toast';
import { updateDelegateAction } from '@/core/services/modulesServices/actionitems.service';

interface ModelFilterProps {
	opened: boolean;
	idaction: any;
	getaction: () => void;
	isReject?: boolean;
	onClose: () => void;
	bnt?: ReactNode;
	roleData: {
		roles: { key: string; label: string }[];
	}[];
	datauser: {
		status: string;
		email: string;
		id: string;
		fullName: string;
		[key: string]: any;
	}[];
}

const ApproveItem: React.FC<ModelFilterProps> = ({
	opened,
	onClose,
	isReject,
	datauser,
	getaction,
	idaction,
}) => {
	// Prepare options for Select with unique IDs as values and fullName as labels
	const userOptions =
		datauser?.map((user) => ({
			value: user.id, // Unique ID as the value
			label: user.fullName, // Display name in the dropdown
		})) || [];

	// State for Select and Textarea
	const [selectedApprover, setSelectedApprover] = useState<string | null>(null);
	const [comments, setComments] = useState<string>('');

	// Handler for Save Changes button
	const handleSaveChanges = () => {
		const formData = {
			...(idaction && { itemId: idaction }),
			...(!isReject && { assignedPerson: selectedApprover }),
			...(!isReject && { approvalType: 'finalApproval' }),
			comments,
			actionType: isReject ? 'rejected' : 'approved',
		};

		updateDelegateAction(formData)
			.then(() => {
				toast.success('ApproveItemsuccessfully!');
				getaction();
				onClose();
			})
			.catch((error) => {
				console.error('Error  ApproveItem:', error);
				toast.error('Failed to ApproveItem');
			});
	};

	return (
		<Modal
			size='35em'
			opened={opened}
			onClose={onClose}
			title={<Text c={'#fff'}>{isReject ? 'Reject Item' : 'Approve Item'}</Text>}
			styles={{
				header: {
					gap: '6em',
					alignItems: 'flex-start',
					background: isReject ? '#f7473a' : '#159488',
				},
			}}
			radius='5px'
		>
			<Stack mt={'1em'}>
				<Text fw={'700'} fz={'13px'} c={'#868e96'}>
					{isReject
						? 'Confirm your rejection for this item.'
						: 'Confirm your approval for the initial stage. Please select the final approver:'}
					{isReject ? null : (
						<Select
							withCheckIcon={false}
							rightSection={<ArrowDown2 size='16' color='#6c757d' />}
							rightSectionPointerEvents='none'
							label={
								<Text pb={'0.5em'} c={'#868e96'}>
									Final Approver
								</Text>
							}
							data={userOptions} // Use the array with { value, label }
							placeholder='Select a user'
							value={selectedApprover} // Controlled value (ID)
							onChange={setSelectedApprover} // Update state with selected ID
						/>
					)}
				</Text>

				<Textarea
					label={
						<Text pb={'0.3em'} c={'#868e96'}>
							Comments
						</Text>
					}
					value={comments}
					onChange={(event) => setComments(event.currentTarget.value)}
				/>
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
						onClick={handleSaveChanges}
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
