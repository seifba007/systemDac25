import { Text } from '@mantine/core';
import React, { Fragment } from 'react';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';

const GreetingComponent: React.FC = () => {
	const getCurrentGreeting = (): string => {
		const currentHour = new Date().getHours();
		if (currentHour < 12) {
			return 'Good morning';
		} else if (currentHour < 18) {
			return 'Good afternoon';
		} else {
			return 'Good evening';
		}
	};
	const user = useAppSelector(selectConnectedUser);

	return (
		<Fragment>
			<Text c={'#3573E4'} fw={'700'}>
				{getCurrentGreeting()}, {user?.fullName}!
			</Text>
			<Text c={'#686F7C'}>Let&apos;s take a look at today&apos;s current events.</Text>
		</Fragment>
	);
};

export default GreetingComponent;
