import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { ReadNotification } from './read-notifications';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository.';

describe('Read Notification', () => {
  it('should read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);
    const notification = new Notification({
      recipientId: 'example-reee-id',
      content: new Content('Nova série disponível'),
      category: 'welcome',
    });

    await notificationsRepository.create(notification);
    await readNotification.execute({
      notificationId: notification.id,
    });
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });
  it('should not cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrowError('Notification not found');
  });
});
