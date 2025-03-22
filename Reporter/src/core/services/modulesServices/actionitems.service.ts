
import RequestService from '../requestServices/request';
import { ACTIONITEMS } from '../endPoint/actionitems.endPoint';
import { ListOptions } from '@/core/entities/http.entity';

export const getActionItems = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity:ACTIONITEMS.ACTIONITEMS_BASE_URL, options });
};
export const DelegateActionApi= <T extends Partial<any>>(data: T,id:string) => {
	return RequestService.update({
		entity: `${ACTIONITEMS.ACTIONITEMS_BASE_URL}delegate-action/`+id, // Append the ID to the base URL
		data,
		method: 'put',
	});
};

export const updateDelegateAction= <T extends Partial<any>>(data: T) => {
	return RequestService.update({
		entity: `${ACTIONITEMS.ACTIONITEMSDELEGATE}`, // Append the ID to the base URL
		data,
		method: 'put',
	});
};
export const updateAction= <T extends Partial<any>>(data: T,id:string) => {
	return RequestService.updateAndUpload({
		entity: `${ACTIONITEMS.ACTIONFOLLOWUP}/`+id, // Append the ID to the base URL
		data,
		method: 'put',
	});
};
export const RejectDelegateAction= <T extends Partial<any>>(data: T, id: string) => {
	return RequestService.update({
		entity: `${ACTIONITEMS.ACTIONITEMSDELEGATE}/${id}`, // Append the ID to the base URL
		data,
		method: 'put',
	});
};
export const DeleteActionItems= ({ id }: { id: string }) => {
	return RequestService.delete({ entity: ACTIONITEMS.ACTIONITEMSDELETE + `/${id}` });
};
