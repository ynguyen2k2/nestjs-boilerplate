/* eslint-disable @typescript-eslint/no-unsafe-call */
import path from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import databaseConfig from './database/config/database-config'
import appConfig from './config/app-config'

import { TypeOrmConfigService } from './database/typeorm-config.services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { UsersModule } from '~/user/users.module'
// <database-block>
const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize()
  },
})
// </database-block>

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    UsersModule,
    // AuthModule,
  ],
})
export class AppModule {}
