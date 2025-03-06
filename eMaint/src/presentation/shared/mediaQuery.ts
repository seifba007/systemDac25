import { em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const useResponsive = () => {
	const isMobile = useMediaQuery(`(max-width: ${em(480)})`);
	const isTablet = useMediaQuery(`(max-width: ${em(768)})`);
	const isNoteBook = useMediaQuery(`(max-width: ${em(992)})`);
	const isComputerSmallScreen = useMediaQuery(`(max-width: ${em(1024)})`);
	const isComputer = useMediaQuery(`(max-width: ${em(1200)})`);
	const isLargeScreen = useMediaQuery(`(max-width: ${em(1500)})`);

	return {
		isMobile,
		isTablet,
		isComputer,
		isComputerSmallScreen,
		isNoteBook,
		isLargeScreen,
	};
};

export default useResponsive;
