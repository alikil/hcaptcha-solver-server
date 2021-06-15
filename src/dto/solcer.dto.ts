import { IsString } from 'class-validator';

export class SolcerDTO {
  @IsString()
  host: string;

  @IsString()
  proxy: string;

  @IsString()
  sitekey: string;

  useragent: string;
}
