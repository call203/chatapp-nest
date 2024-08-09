import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  @MaxLength(200)
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  image?: Express.Multer.File;
}
