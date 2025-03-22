
import RequestService from '../requestServices/request';
import { CERTIFICATE_BASE_URL, CERTIFICATEGET } from '../endPoint/certificates.endPoint';

export const getCertificates = () => {
	return RequestService.list({ entity:CERTIFICATEGET });
};
export const updateCertificates= <T extends Partial<any>>(data: T,id:string) => {
	return RequestService.update({
		entity: `${CERTIFICATE_BASE_URL}delegate-action/`+id, // Append the ID to the base URL
		data,
		method: 'put',
	});
};

export const AssignCertificates= <T extends Partial<any>>(data: T) => {
	return RequestService.update({
		entity: `${CERTIFICATE_BASE_URL}update-users-Assign`, // Append the ID to the base URL
		data,
		method: 'put',
	});
};
export const DeleteCertificates= ({ id }: { id: string }) => {
	return RequestService.delete({ entity: CERTIFICATE_BASE_URL + `delete/${id}` });
};
export const createCertificates = (data:any) => {
	return RequestService.create({ entity: CERTIFICATE_BASE_URL+'upload-certificates', data});
};