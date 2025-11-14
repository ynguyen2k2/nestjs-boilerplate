import {
  // common
  Module,
} from '@nestjs/common'
import fileConfig from '~/files/config/file-config'
import { FilesService } from '~/files/file.service'
import { RelationalFilePersistenceModule } from '~/files/infrastructure/persistence/relational/relational-persistence.module'

// // <database-block>
// const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
//   .isDocumentDatabase
//   ? DocumentFilePersistenceModule
//   : RelationalFilePersistenceModule
// // </database-block>

// const infrastructureUploaderModule =
//   (fileConfig() as FileConfig).driver === FileDriver.LOCAL
//     ? FilesLocalModule
//     : (fileConfig() as FileConfig).driver === FileDriver.S3
//       ? FilesS3Module
//       : FilesS3PresignedModule

// <database-block>
const infrastructurePersistenceModule = RelationalFilePersistenceModule
// </database-block>

const infrastructureUploaderModule =
  (fileConfig() as FileConfig).driver === FileDriver.LOCAL
    ? FilesLocalModule
    : (fileConfig() as FileConfig).driver === FileDriver.S3
      ? FilesS3Module
      : FilesS3PresignedModule

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    infrastructureUploaderModule,
  ],
  providers: [FilesService],
  exports: [FilesService, infrastructurePersistenceModule],
})
export class FilesModule {}
