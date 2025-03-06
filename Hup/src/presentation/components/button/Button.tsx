import React from 'react';
import { Button as Btn, ButtonProps, Flex, Text, rem } from '@mantine/core';
import { ArrowRight2, Star } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';

type ButtonPropss = ButtonProps & {
	name: string;
	onClick?: () => void;
};
const Button = ({ name, onClick, ...props }: ButtonPropss) => {
	return (
		<Btn
			type='submit'
			onClick={onClick}
			color='#2C74FF'
			fullWidth
			fw={400}
			h='3rem'
			style={{
				borderRadius: '8px',
			}}
			{...props}
		>
			{name}
		</Btn>
	);
};
export default Button;

export const RecommendationsButton = () => {
	const navigate = useNavigate();
	return (
		<Flex
			w={'90%'}
			h={rem(60)}
			p={'1.25rem 1rem'}
			mt={rem(32)}
			justify={'space-between'}
			onClick={() => navigate('/portfolio/recommendations')}
			style={{ border: '1px solid #E6E6E6', borderRadius: '12px', cursor: 'pointer' }}
		>
			<Flex gap={'sm'} align={'center'}>
				<Star size='32' color='#000' variant='Bold' />
				<Text fw={500}>Recommendations</Text>
			</Flex>
			<ArrowRight2 size='22' color='#000' />
		</Flex>
	);
};

export const CancelButton = ({ onClick, ...props }: ButtonProps & { onClick: () => void }) => {
	return (
		<Btn
			onClick={onClick}
			fw={500}
			bg={'none'}
			c={'black.0'}
			style={{ border: '1px solid #BDC0C6' }}
			{...props}
		>
			Cancel
		</Btn>
	);
};
