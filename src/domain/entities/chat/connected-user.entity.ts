export class ConnectedUser {
  constructor(
    private readonly userId: string,
    private readonly socketId: string,
  ) {
    this.userId = userId;
    this.socketId = socketId;
  }

  getUserId(): string {
    return this.userId;
  }

  getSocketId(): string {
    return this.socketId;
  }
}
