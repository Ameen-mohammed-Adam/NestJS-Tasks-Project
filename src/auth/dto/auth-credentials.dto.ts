import { IsString, Matches, Max, Min } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @Min(4)
  @Max(20)
  username!: string;
  @IsString()
  @Min(8)
  @Max(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passwords must contain at least 1 upper case letter, 1 lower case letter and 1 number or special character',
  })
  password!: string;
}
