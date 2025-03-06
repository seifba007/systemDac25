import React, { ReactNode } from 'react';
import { Button, Flex } from '@mantine/core';
import { Add } from 'iconsax-react';

interface CreateTalentButtonProps {
	isResponsive: boolean;
	changebutton: (value: boolean) => void;
	lable: string;
	icon: ReactNode;
	w?: string;
}

const CreateButton: React.FC<CreateTalentButtonProps> = ({
	isResponsive,
	changebutton,
	lable,
	icon,
}) => {
	return (
		<Button disabled={lable == 'Add Project'} className={'bnt1'} onClick={() => changebutton(true)}>
			{isResponsive ? (
				<Add size='18px' />
			) : icon ? (
				<Flex align={'center'} gap={'0.5em'}>
					{icon}
					<p className={'txtbnt'}>{lable}</p>
				</Flex>
			) : (
				<p className={'txtbnt'}>{lable}</p>
			)}
		</Button>
	);
};

export default CreateButton;
