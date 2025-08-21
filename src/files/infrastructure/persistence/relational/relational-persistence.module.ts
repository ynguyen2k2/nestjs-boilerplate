import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileRepository } from '../file-repository'
import { FileRelationalRepository } from './repositories/file-repositories'
import { FileEntity } from './entities/file-entity'

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [
    {
      provide: FileRepository,
      useClass: FileRelationalRepository,
    },
  ],
  exports: [FileRepository],
})
export class RelationalFilePersistenceModule {}
