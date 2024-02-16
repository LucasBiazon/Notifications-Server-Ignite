import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository.';

describe('Cancel Notification', () => {
  it('should cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    const notification = new Notification({
      recipientId: 'example-reee-id',
      content: new Content('Nova série disponível'),
      category: 'welcome',
    });

    await notificationsRepository.create(notification);
    await cancelNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrowError('Notification not found');
  });
});
