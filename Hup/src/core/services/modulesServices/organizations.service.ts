import { UserEntity } from '@/core/entities/auth/authSlice.entity';
import { ResetPasswordEntity, SendCodeEntity } from '@/core/entities/user/user.entity';
import { CLIENT, EDUCATOR, EXPERT, USER } from '../endPoint/user.endPoint';
import HttpService from '../httpServices/http.service';
import RequestService from '../requestServices/request';
import { ListOptions } from '@/core/entities/http.entity';
import { ORGANIZATION } from '../endPoint/organizations.endPoint';

export const getOrganizations = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity: ORGANIZATION.ORGANIZATION_BASE_URL, options });
};
export const createOrganizations = (data: any) => {
	return RequestService.createAndUpload({ entity: ORGANIZATION.ORGANIZATION_BASE_URL, data });
};
export const AssingAppOrganizations = (data: any, id: string) => {
	return RequestService.create({ entity: ORGANIZATION.ORGANIZATION_BASE_URL + '/' + id, data });
};
export const DeleteOrganizations = ({ id }: { id: string }) => {
	return RequestService.delete({ entity: ORGANIZATION.ORGANIZATION_BASE_URL + `/${id}` });
};

export const updateOrganizations = (data: any, id: string) => {
	return RequestService.updateAndUpload({
		entity: `${ORGANIZATION.ORGANIZATION_BASE_URL}/${id}`,
		data,
		method: 'put',
	});
};
