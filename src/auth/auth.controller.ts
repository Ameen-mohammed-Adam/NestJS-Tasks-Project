import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.singUp(authcredentialsDto);
  }
  @Post('/signIn')
  signIn(
    @Body() authcredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authcredentialsDto);
  }
}
