import { ListOptions } from '@/core/entities/http.entity';
import RequestService from '../requestServices/request';
import { CALENDAR_EVENT } from '../endPoint/calendar.endPoint';
export const getEventsList = ({ options }: ListOptions) => {
	return RequestService.list({ entity: CALENDAR_EVENT.LIST_EVENT, options });
};

export const getCalendarEventById = ({ id }: { id: string }) => {
	return RequestService.read({
		entity: CALENDAR_EVENT.BASE_EVENT + `/${id}`,
	});
};

export const createCalendarEvent = (data: Partial<any>) => {
	return RequestService.create({ entity: CALENDAR_EVENT.CREATE_EVENT, data });
};

export const updateCalendarEvent = (data: Partial<any>, id: string) => {
	return RequestService.update({
		method: 'patch',
		entity: CALENDAR_EVENT.BASE_EVENT + `/${id}`,
		data: data,
	});
};

export const DeleteCalendarEvent = ({ id }: { id: string }) => {
	return RequestService.delete({ entity: CALENDAR_EVENT.CREATE_EVENT + `/${id}` });
};
