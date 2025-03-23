
import RequestService from '../requestServices/request';
import { ACTIONITEMS } from '../endPoint/actionitems.endPoint';
import { ListOptions } from '@/core/entities/http.entity';
import { HAZOPS } from '../endPoint/hazop.endPoint';
import { Incident } from '../endPoint/incidentreporting.endPoint';

export const getHazopeAnalysis = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity:HAZOPS.HAZOPS_BASE_URL, options });
};
export const getincident = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity:Incident.IncidentReporting_BASE_URL, options });
};
export const updateDelegateAction= <T extends Partial<any>>(data: T, id: string) => {
	return RequestService.update({
		entity: `${ACTIONITEMS.ACTIONITEMSDELEGATE}/${id}`, // Append the ID to the base URL
		data,
		method: 'put',
	});
};
export const createIncidentReporting = (data: any, organization: string) => {
  if (!organization) {
    throw new Error('Organization ID is required');
  }
  const urlWithOrg = `${Incident.IncidentReporting_BASE_URL}?organization=${encodeURIComponent(organization)}`;
  return RequestService.createAndUpload({ entity: urlWithOrg, data });
};export const DeleteActionItems= ({ id }: { id: string }) => {
	return RequestService.delete({ entity: ACTIONITEMS.ACTIONITEMSDELETE + `/${id}` });
};
