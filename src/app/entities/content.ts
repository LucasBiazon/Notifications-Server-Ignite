export class Content {
  private readonly content: string;
  get value(): string {
    return this.content;
  }
  private validateContentLenght(content: string): boolean {
    return content.length >= 3 && content.length <= 250;
  }

  constructor(content: string) {
    const isContentValid = this.validateContentLenght(content);
    if (!isContentValid) {
      throw new Error('Content must be 3-250 characters long');
    }
    this.content = content;
  }
}
