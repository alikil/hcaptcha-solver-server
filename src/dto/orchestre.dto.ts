import { IsString } from 'class-validator';

export class OrchestreDto {
  @IsString()
  html: string;
}
