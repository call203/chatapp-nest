import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(32)
  password: string;
}
