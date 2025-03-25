// Queue for the api call's config
export type QueueItem = {
	config: ExecutorInterface;
	resolve: (value: any) => void;
	reject: (value: any) => void;
};

export type ExecutorInterface = {
	method: 'get' | 'post' | 'put' | 'patch' | 'delete';
	endPoint: string;
	data?: Record<string, any>;
	params?: Record<string, any>;
	token?: string;
};

export type Request = {
	entity: string;
	idToken?: string;
	data: Record<string, any>;
	method?: 'put' | 'patch';
};

export type EntityWithId = {
	entity: string;
	id?: string;
};

export type ListProps = {
	entity: string;
	options?: Record<string, string | number | boolean | undefined>;
};

export type ListOptions = {
	options?: Record<string, string | number | boolean | undefined>;
};
