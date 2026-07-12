import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}
  async singUp(authcredentialsDto: AuthCredentialsDto) {
    return this.userRepository.createUser(authcredentialsDto);
  }
}
