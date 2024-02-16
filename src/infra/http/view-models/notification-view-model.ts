import { Notification } from '@app/entities/notification';
export class NotificationViewModel {
  static toHttp(notifiation: Notification) {
    return {
      id: notifiation.id,
      content: notifiation.content.value,
      category: notifiation.category,
      recipientId: notifiation.recipientId,
    };
  }
}
