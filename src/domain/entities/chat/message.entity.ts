export class Message {
  constructor(
    private readonly id: string,
    private readonly receiverId: string,
    private readonly senderId: string,
    private readonly content: string,
    private readonly timestamp: Date,
  ) {
    this.id = id;
    this.receiverId = receiverId;
    this.senderId = senderId;
    this.content = content;
    this.timestamp = timestamp;
  }

  getId(): string {
    return this.id;
  }

  getReceiverId(): string {
    return this.receiverId;
  }

  getSenderId(): string {
    return this.senderId;
  }

  getContent(): string {
    return this.content;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }
}
