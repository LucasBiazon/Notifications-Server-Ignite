import { UnreadNotification } from './unread-notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository.';
import { makeNotification } from '@test/factories/notification-factory';

describe('Unread Notification', () => {
  it('should Unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);
    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);
    await unreadNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrowError('Notification not found');
  });
});
