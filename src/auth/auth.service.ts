import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async singUp(authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authcredentialsDto);
  }
  async singIn(
    authcredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authcredentialsDto;
    const user = await this.userRepository.findUser(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials');
  }
  async protect(jwtToken: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const verifyToekn = await this.jwtService.verifyAsync(jwtToken, {
      secret: 'Very Strong',
    });
    console.log(verifyToekn);
  }
}
