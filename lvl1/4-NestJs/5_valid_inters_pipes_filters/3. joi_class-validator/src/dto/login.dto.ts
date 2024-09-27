import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsDefined()
  public email: string;
  @IsString()
  @IsDefined()
  public password: string;
  @IsBoolean()
  @IsOptional()
  public remember: boolean;
}
