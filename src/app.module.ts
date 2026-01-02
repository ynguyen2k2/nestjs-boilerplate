import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import databaseConfig from './database/config/database-config'
import appConfig from './config/app-config'

import { TypeOrmConfigService } from './database/typeorm-config.services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import { UsersModule } from '~/user/users.module'
import { AuthModule } from '~/auth/auth.module'
import authConfig from './auth/config/auth.config'

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
      load: [databaseConfig, appConfig, authConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
