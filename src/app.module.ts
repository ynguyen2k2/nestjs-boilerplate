/* eslint-disable @typescript-eslint/no-unsafe-call */
import path from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthAppleModule } from './auth-apple/auth-apple.module'
import { AuthFacebookModule } from './auth-facebook/auth-facebook.module'
import { AuthGoogleModule } from './auth-google/auth-google.module'
import { HeaderResolver, I18nModule } from 'nestjs-i18n'

// <database-block>
// const infrastructureDatabaseModule = (databaseConfig() as DatabaseConfig)
//   .isDocumentDatabase
//   ? MongooseModule.forRootAsync({
//       useClass: MongooseConfigService,
//     })
//   : TypeOrmModule.forRootAsync({
//       useClass: TypeOrmConfigService,
//       dataSourceFactory: async (options: DataSourceOptions) => {
//         return new DataSource(options).initialize()
//       },
//     })
// </database-block>

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig],
      envFilePath: ['.env'],
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
