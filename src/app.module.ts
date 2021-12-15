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

@Module({
  imports: [
    AppConfigModule,
    CqrsModule,
    // EVENT STORE
    ClientsModule.register([
      {
        name: 'EVENT_STORE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'event_store',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'event_store',
          },
        },
      },
    ]),
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
