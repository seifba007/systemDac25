export type ClientSliceStateEntity = {
	id: string;
	phone: string | null;
	address: string | null;
	emailPreference: {
		marketing: boolean;
		confirmation_updates: boolean;
		payments: boolean;
		projects_updates: boolean;
		job_application: boolean;
	};
};

export type ClientEntity = Omit<ClientSliceStateEntity, 'id'>;
