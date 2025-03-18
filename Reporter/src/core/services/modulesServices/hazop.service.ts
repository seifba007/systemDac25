
import RequestService from '../requestServices/request';
import { ACTIONITEMS } from '../endPoint/actionitems.endPoint';
import { ListOptions } from '@/core/entities/http.entity';
import { HAZOPS } from '../endPoint/hazop.endPoint';

export const getHazopeAnalysis = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity:HAZOPS.HAZOPS_BASE_URL, options });
};
export const updateDelegateAction= <T extends Partial<any>>(data: T, id: string) => {
	return RequestService.update({
		entity: `${ACTIONITEMS.ACTIONITEMSDELEGATE}/${id}`, // Append the ID to the base URL
		data,
		method: 'put',
	});
};
export const createHazopeAnalysis = (data:any) => {
	return RequestService.createAndUpload({ entity: HAZOPS.HAZOPS_BASE_URL, data});
};

export const DeleteActionItems= ({ id }: { id: string }) => {
	return RequestService.delete({ entity: ACTIONITEMS.ACTIONITEMSDELETE + `/${id}` });
};
