import { NOTIFICATIONS } from '../endPoint/notification.endPoint';
import { ListOptions } from '@/core/entities/http.entity';
import RequestService from '../requestServices/request';

export const listNotifications = ({ options = {} }: ListOptions) => {
	return RequestService.list({ entity: NOTIFICATIONS.NOTIFICATION_BASE_URL, options });
};
