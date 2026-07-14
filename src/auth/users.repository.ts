import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authcredentialsDto;
    const salt = 12;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.repository.create({ username, password: hashedPassword });
    try {
      await this.repository.save(user);
    } catch (error) {
      if ((error as { code: string }).code == '23505') {
        throw new ConflictException('User Already Exists.');
      }
    }
  }
  async findUser(username?: string): Promise<User> {
    const user = await this.repository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(
        `user with username : '${username} was not found`,
      );
    }
    return user;
  }
}
