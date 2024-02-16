import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notification';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository.';

describe('Count recipients Notifications', () => {
  it('should be able to count recipients notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotifications(
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

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-reee-id',
    });
    expect(count).toEqual(2);
  });
});
