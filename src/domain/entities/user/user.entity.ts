import { Profile } from './profile.entity';

export class User {
  constructor(
    private readonly id: string,
    private readonly username: string,
    private readonly email: string,
    private readonly password: string,
    private readonly profile?: Profile,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.profile = profile;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getProfile(): Profile | undefined {
    return this.profile;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public static register({
    id,
    username,
    email,
    password,
  }: {
    id: string;
    username: string;
    email: string;
    password: string;
  }): User {
    return new User(id, username, email, password, undefined, new Date());
  }

  updateProfile(data: Profile): User {
    return new User(
      this.id,
      this.username,
      this.email,
      this.password,
      data,
      new Date(),
      new Date(),
    );
  }
}
