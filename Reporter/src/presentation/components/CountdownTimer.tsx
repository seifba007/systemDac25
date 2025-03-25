import { Group, Text, rem } from '@mantine/core';
import React, { useState, useEffect, useCallback, Fragment } from 'react';

interface CountdownTimerProps {
	targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
	const calculateTimeLeft = useCallback(() => {
		const difference = +new Date(targetDate) - +new Date();
		let timeLeft: { days?: number; hours?: number; minutes?: number; seconds?: number } = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	}, [targetDate]);

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	const [isDateArrived, setIsDateArrived] = useState(false);

	useEffect(() => {
		const currentDate = new Date();
		const comingDate = new Date(targetDate);
		if (currentDate > comingDate) {
			setIsDateArrived(true);
		}
	}, [targetDate]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	}, [timeLeft, calculateTimeLeft]);

	const timerComponents: JSX.Element[] = [];

	Object.keys(timeLeft).forEach((interval) => {
		if (!timeLeft[interval as keyof typeof timeLeft]) {
			return;
		}

		timerComponents.push(
			<Text
				style={{ borderLeft: '1px solid white', textAlign: 'center' }}
				key={interval}
				span
				fz={{ base: rem(12), sm: rem(30) }}
				p={10}
				bg={'black.0'}
				c={'white'}
				w={190}
			>
				{timeLeft[interval as keyof typeof timeLeft]} {interval}{' '}
			</Text>,
		);
	});

	return (
		<Fragment>
			{!isDateArrived ? (
				<Group gap={15} m={'auto'} my={80} justify='center' align='center' w={'100%'}>
					{timerComponents.length ? timerComponents : <span>Time&apos;s up!</span>}
				</Group>
			) : null}
		</Fragment>
	);
};

export default CountdownTimer;
