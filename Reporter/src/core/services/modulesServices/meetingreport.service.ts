
import RequestService from '../requestServices/request';
import { ACTIONITEMS } from '../endPoint/actionitems.endPoint';
import { ListOptions } from '@/core/entities/http.entity';
import { HAZOPS } from '../endPoint/hazop.endPoint';
import { Incident } from '../endPoint/incidentreporting.endPoint';
import { MeetingReport } from '../endPoint/meetingreport.endPoint';

export const getHazopeAnalysis = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity:HAZOPS.HAZOPS_BASE_URL, options });
};
export const updateDelegateAction= <T extends Partial<any>>(data: T, id: string) => {
	return RequestService.update({
		entity: `${ACTIONITEMS.ACTIONITEMSDELEGATE}/${id}`, 
		data,
		method: 'put',
	});
};

export const DeleteActionItems= ({ id }: { id: string }) => {
	return RequestService.delete({ entity: ACTIONITEMS.ACTIONITEMSDELETE + `/${id}` });
};
export const createMeetingReport = (data: any, organization: string) => {
	if (!organization) {
	  throw new Error('Organization ID is required');
	}
	const urlWithOrg = `${MeetingReport.BASE_URLMeetingReport}?organization=${encodeURIComponent(organization)}`;
	return RequestService.createAndUpload({ entity: urlWithOrg, data });
  };