import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../register-user.command';
import { User } from '@/domain/entities/user/user.entity';
import { UserService } from '@/domain/services/user/user.service';
import { randomUUID } from 'crypto';
import { BcryptService } from '@/shared/bcrypt';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly service: UserService,
    private readonly bcrypt: BcryptService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    const { email, password, username } = command;

    const id = randomUUID();

    const hashPassword = await this.bcrypt.hashPassword(password);

    const newUser = User.register({
      id,
      username,
      email,
      password: hashPassword,
    });

    return await this.service.create(newUser);
  }
}
