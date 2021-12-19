import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { Hello } from './app.entity';
import { AppRepository } from './app.repository';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HelloSagas } from './sagas/hello.saga';
import { AppService } from './app.service';
import { EventStoreModule } from './eventstore/eventstore.module';

@Module({
  imports: [
    AppConfigModule,
    CqrsModule,
    // EVENT STORE
    EventStoreModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => ({
        host: config.eventStoreHost,
      }),
    }),
    // READ DATABASE
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
  providers: [AppService, ...CommandHandlers, ...QueryHandlers, HelloSagas],
})
export class AppModule {}
