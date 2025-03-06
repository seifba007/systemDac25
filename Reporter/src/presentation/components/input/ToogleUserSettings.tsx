import React from 'react';
import { EmailPreferenceType, keysEmailPreference } from '@/core/entities/auth/authSlice.entity';
import { Checkbox } from '@mantine/core';

interface ItoggleUserSettingsProps {
	settingKey: string;
	value: boolean;
	setEmailPreferenceData: React.Dispatch<React.SetStateAction<EmailPreferenceType>>;
	emailPreferenceData: EmailPreferenceType;
}
const ToggleUserSettings = ({
	settingKey,
	value,
	setEmailPreferenceData,
	emailPreferenceData,
}: ItoggleUserSettingsProps) => {
	return (
		<Checkbox
			size='20'
			color='#1FDDAD'
			style={{ marginTop: '0.1rem' }}
			onChange={(event) => {
				setEmailPreferenceData({
					...emailPreferenceData,
					[settingKey as keysEmailPreference]: event.currentTarget.checked,
				});
			}}
			defaultChecked={value}
		/>
	);
};

export default ToggleUserSettings;
