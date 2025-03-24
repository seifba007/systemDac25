import RequestService from '../requestServices/request';
import { ListOptions } from '@/core/entities/http.entity';
import { HAZOPS } from '../endPoint/hazop.endPoint';

export const getHazopeAnalysis = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity: HAZOPS.HAZOPS_BASE_URL, options });
};
export const updateDelegateAction = <T extends Partial<any>>(data: T, id: string) => {
	return RequestService.update({
		entity: `${HAZOPS.HAZOPS_BASE_URL}/${id}`, // Append the ID to the base URL
		data,
		method: 'put',
	});
};
export const createHazopeAnalysis = (data: any) => {
	return RequestService.createAndUpload({ entity: HAZOPS.HAZOPS_BASE_URL, data });
};

export const DeleteHazopeAnalysis = ({ id }: { id: string }) => {
	return RequestService.delete({ entity: HAZOPS.HAZOPS_BASE_URL + `/delete/${id}` });
};
