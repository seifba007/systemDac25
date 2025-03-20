
import RequestService from '../requestServices/request';
import { ListOptions } from '@/core/entities/http.entity';
import { MeetingReport } from '../endPoint/meetingreport.endPoint';

export const getMeetingReport = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity:MeetingReport.BASE_URLMeetingReport, options });
};
export const updateDelegateAction= <T extends Partial<any>>(data: T, id: string) => {
	return RequestService.update({
		entity: `${MeetingReport.BASE_URLMeetingReport}/${id}`, 
		data,
		method: 'put',
	});
};

export const DeleteMeetingReport= ({ id }: { id: string }) => {
	return RequestService.delete({ entity:MeetingReport.MeetingReportDELETE + `/${id}` });
};
export const createMeetingReport = (data: any, organization: string) => {
	if (!organization) {
	  throw new Error('Organization ID is required');
	}
	const urlWithOrg = `${MeetingReport.BASE_URLMeetingReport}?organization=${encodeURIComponent(organization)}`;
	return RequestService.createAndUpload({ entity: urlWithOrg, data });
  };