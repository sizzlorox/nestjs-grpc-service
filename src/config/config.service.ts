import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}
  get databaseHost(): string {
    return this.configService.get<string>('DB_HOST');
  }

  get databasePort(): number {
    return +this.configService.get<Number>('DB_PORT');
  }

  get databaseUser(): string {
    return this.configService.get<string>('DB_USER');
  }

  get databasePwd(): string {
    return this.configService.get<string>('DB_PWD');
  }

  get databaseDB(): string {
    return this.configService.get<string>('DB_DATABASE');
  }

  get databaseSchema(): string {
    return this.configService.get<string>('DB_SCHEMA');
  }
}
