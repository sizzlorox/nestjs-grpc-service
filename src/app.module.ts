import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Hello } from './app.entity';
import { AppRepository } from './app.repository';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        type: 'postgres',
        host: config.databaseHost,
        port: config.databasePort,
        username: config.databaseUser,
        password: config.databasePwd,
        database: config.databaseDB,
        schema: config.databaseSchema,
        entities: [Hello],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([AppRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
