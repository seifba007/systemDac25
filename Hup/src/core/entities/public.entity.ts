export type DeatilsEntity = {
	id: string;
	createdAt: string;
	updatedAt: string;
	deleted: boolean;
	status: string;
};

export type IdEntity = {
	id: string;
};

export enum EVisibility {
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
}

export enum ECurrency {
	TND = 'TND',
	USD = 'USD',
	EUR = 'EUR',
}

export enum EEventStatus {
	CANCELLED = 'CANCELLED',
	CONFIRMED = 'CONFIRMED',
	COMPLETED = 'COMPLETED',
}
