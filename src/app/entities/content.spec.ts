import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    expect(() => new Content('Este conteúdo é válido')).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 3 characters', () => {
    expect(() => new Content('ab')).toThrow();
  });

  it('should not be able to create a notification content with more than 250 characters', () => {
    expect(() => new Content('a'.repeat(251))).toThrow();
  });
});
