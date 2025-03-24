import RequestService from '../requestServices/request';
import { ListOptions } from '@/core/entities/http.entity';
import { RISKASSESMENT } from '../endPoint/riskassessment.endPoint';

export const getRiskAssessment = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity: RISKASSESMENT.RISKASSESMENT_BASE_URL, options });
};
export const updateRiskAssessment = <T extends Partial<any>>(data: T, id: string) => {
	return RequestService.update({
		entity: `${RISKASSESMENT.RISKASSESMENT_BASE_URL}/update-risk-assessment/${id}`,
		data,
		method: 'put',
	});
};

export const DeleteRiskAssessment = ({ id }: { id: string }) => {
	return RequestService.delete({ entity: RISKASSESMENT.RISKASSESMENT_BASE_URL + `/delete/${id}` });
};
export const createRiskAssessment = (data: any, organization: string) => {
	if (!organization) {
		throw new Error('Organization ID is required');
	}
	const urlWithOrg = `${RISKASSESMENT.RISKASSESMENT_ADD}?organization=${encodeURIComponent(
		organization,
	)}`;
	return RequestService.create({ entity: urlWithOrg, data });
};
