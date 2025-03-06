import React from 'react';
import { Icons } from '@/assets/icons/Icons';
import { useAppSelector } from '@/core/store/hooks';
import { selectDeviceWidth } from '@/core/store/modules/rootSlice';
import { TABLET_BREAKPOINT } from '@/utils/deviceBreakPoints';
import { Stepper } from '@mantine/core';

export const enum StepStatus {
	DONE = 'DONE',
	CURRENT = 'CURRENT',
	COMING = 'COMING',
}
interface StepsProps {
	text: string;
	status: string;
	nextStep: boolean;
}

interface IStepDesc {
	label: string;
	description: string;
}

export const Steps = (
	etape: number,
	orientation: 'vertical' | 'horizontal' = 'horizontal',
	data: IStepDesc[],
) => {
	return (
		<Stepper iconSize={32} active={etape - 1} orientation={orientation} color='green' w={'100%'}>
			{data.map((el, idx) => (
				<Stepper.Step key={idx} label={el.label} description={el.description} />
			))}
		</Stepper>
	);
};
const Step = ({ text, status, nextStep }: StepsProps) => {
	const deviceWidth = useAppSelector(selectDeviceWidth);
	return (
		<div className='step'>
			{status === StepStatus.DONE && (
				<div className='circle'>
					<Icons.check width={20} />
				</div>
			)}
			{status === StepStatus.CURRENT && <Icons.radio width={23} />}
			{status === StepStatus.COMING && <div className='circle white'></div>}
			{deviceWidth > TABLET_BREAKPOINT ? <label className='text'>{text}</label> : null}
			{nextStep && <span className='line' />}
		</div>
	);
};

export default Step;
