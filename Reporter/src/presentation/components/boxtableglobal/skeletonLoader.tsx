import React, { useState, useEffect } from 'react';
import '@/sass/pages/skeletonLoader/skeletonLoader.scss';
import { Box, Flex } from '@mantine/core';

const SkeletonLoader = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 480); // 480px is the breakpoint for mobile
		};

		handleResize(); // Check on component mount
		window.addEventListener('resize', handleResize); // Listen for window resize events

		return () => {
			window.removeEventListener('resize', handleResize); // Clean up event listener
		};
	}, []);

	return (
		<Box className='skeleton' style={{ padding: '20px' }}>

			{isMobile ? (
				<>
					{/* Render double skeleton header only for mobile */}
					{[...Array(2)].map((_, index) => (
						<Box className='skeleton-header' key={index}>
							<Box className='skeleton-header-left'>
								<Box className='skeleton-cell skeleton-rectangle' id='halfBigSkeleton'></Box>
							</Box>
							<Box className='skeleton-header-right'>
								<Box className='skeleton-cell skeleton-rectangle rightBigSkeletons'></Box>
								<Box className='skeleton-cell skeleton-rectangle rightBigSkeletons'></Box>
							</Box>
						</Box>
					))}
				</>
			) : (
				<>
					{/* Original skeleton header for larger screens */}
					<Box className='skeleton-header'>
						<Box className='skeleton-header-left'>
							<Box className='skeleton-cell skeleton-rectangle' id='halfBigSkeleton'></Box>
						</Box>
					
					</Box>

					{/* Render 6 skeleton container only for larger screens */}
					<Flex gap={'1em'} id='sixSkeletonContainer'>
						{[...Array(4)].map((_, index) => (
							<Box key={index} className='skeleton-cell skeleton-rectangle sixSkeletonHeader'></Box>
						))}
						<Box id='rightTwoSkeletonsContainer'>
							<Box className='skeleton-cell skeleton-rectangle sixSkeletonHeader'></Box>
						</Box>
					</Flex>
				</>
			)}

			{[...Array(isMobile ? 7 : 11)].map((_, rowIndex) => (
				<Box className='skeleton-row' key={rowIndex}>
					<Box className='skeleton-cell skeleton-box'></Box>
					<Box className='skeleton-cell skeleton-snake'></Box>
					<Box className='skeleton-cell skeleton-ellipse singleSkeleton-ellipse'></Box>
					<Box className='skeleton-cell skeleton-rectangle1'></Box>
					<Box className='skeleton-cell skeleton-rectangle2'></Box>
					<Box className='skeleton-cell skeleton-rectangle3'></Box>
					<Box className='skeleton-cell skeleton-rectangle4'></Box>
					<Box id='dotsContainer'>
						{[...Array(5)].map((_, index) => (
							<Box
								className='skeleton-cell skeleton-ellipse'
								key={index}
								style={{ marginLeft: '0px' }}
							></Box>
						))}
					</Box>
					<Box className='skeleton-cell skeleton-rectangle5'></Box>
				</Box>
			))}
		</Box>
	);
};

export default SkeletonLoader;
