import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type Override = Partial<NotificationProps>;
export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'example-reee-id2',
    content: new Content('Nova série disponível'),
    category: 'welcome',
    ...override,
  });
}
