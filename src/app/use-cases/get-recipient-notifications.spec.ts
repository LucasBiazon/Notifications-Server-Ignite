import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository.';
import { GetRecipientNotifications } from './get-recipient-notification';

describe('Get recipients Notifications', () => {
  it('should be able to get recipients notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-reee-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-reee-id' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-reee-id2' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'example-reee-id',
    });
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-reee-id' }),
        expect.objectContaining({ recipientId: 'example-reee-id' }),
      ]),
    );
  });
});
