import RequestService from '../requestServices/request';
import {
	CERTIFICATE_BASE_URL,
	CERTIFICATEGET,
	CERTIFICATEGETASSIGNMENT,
	CERTIFICATEGETASSIGNMENT2,
} from '../endPoint/certificates.endPoint';

export const getCertificatesUserAssignments = () => {
	return RequestService.list({ entity: CERTIFICATEGETASSIGNMENT });
};
export const getUserAssignmentsbyCertificates = (id: string) => {
	return RequestService.list({ entity: CERTIFICATEGETASSIGNMENT2 + '/' + id });
};
export const getCertificates = () => {
	return RequestService.list({ entity: CERTIFICATEGET });
};
export const updateUserCertificate = <T extends Partial<any>>(
	data: T,
	userId: string,
	certId: string,
) => {
	return RequestService.update({
		entity: `${CERTIFICATE_BASE_URL}${userId}/update-user/${certId}`,
		data,
		method: 'put',
	});
};
export const AssignCertificates = <T extends Partial<any>>(data: T) => {
	return RequestService.create({
		entity: `${CERTIFICATE_BASE_URL}update-users-Assign`, // Append the ID to the base URL
		data,
	});
};
export const DeleteCertificates = ({ id }: { id: string }) => {
	return RequestService.delete({ entity: CERTIFICATE_BASE_URL + `delete/${id}` });
};
export const createCertificates = (data: any) => {
	return RequestService.create({ entity: CERTIFICATE_BASE_URL + 'upload-certificates', data });
};
