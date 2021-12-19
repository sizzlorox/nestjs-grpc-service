import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'ci')
          .default('development'),

        SERVICE_NAME: Joi.string().required(),

        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required(),
        DB_PWD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SCHEMA: Joi.string().required(),

        EVENTSTORE_HOST: Joi.string().default('localhost:2113'),
      }),
    }),
  ],

  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
