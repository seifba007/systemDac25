import { Button, createTheme } from '@mantine/core';

const theme = createTheme({
	fontFamily: 'Inter, sans-serif',
	colors: {
		blue: [
			'#2C74FF',
			'#2C74FF',
			'#2C74FF',
			'#2C74FF',
			'#2C74FF',
			'#2C74FF',
			'#2C74FF',
			'#2C74FF',
			'#2C74FF',
			'#2C74FF',
		],
		teal: [
			'#12B886',
			'#30C096',
			'#4FD1A6',
			'#6FDAB7',
			'#8EDDC6',
			'#AEF0D6',
			'#CEFAE6',
			'#E0FDF1',
			'#F0FEF8',
			'#F7FFFC',
		],
		black: [
			'#0A0C0E',
			'#53545E',
			'#CDD1D6',
			'#828C98',
			'#DFDFE4',
			'#CCCED3',
			'#F3F5F9',
			'#FFFFFF',
			'#eeeeef',
			'#FFFFFF',
			'#2C2E3A',
		],
	},
	fontSizes: {
		xs: '0.75rem',
		sm: '0.875rem',
		md: '1rem',
		lg: '1.125rem',
		xl: '1.25rem',
		xxl: '1.5rem',
		xxxl: '2rem',
	},
	spacing: {
		xs: '0.25rem',
		sm: '0.5rem',
		md: '1rem',
		lg: '1.25rem',
		xl: '1.5rem',
		xxl: '2.5rem',
	},
	breakpoints: {
		xs: '360px', // $mobile-breakpoint
		sm: '768px', // $tablet-breakpoint
		md: '1366px', // $small-screen-breakpoint
		lg: '1440px', // $large-screen-breakpoint
		xl: '1920px', // $xtra-large-screen-breakpoint
	},
	components: {
		Button: Button.extend({
			styles: {
				inner: { fontWeight: 500 },
			},
		}),
	},
});

export default theme;
