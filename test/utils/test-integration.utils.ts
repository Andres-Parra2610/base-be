import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { APP_MODULES } from '@/src/modules';

export class TestIntegrationUtils {
  static async createTestingModule() {
    return Test.createTestingModule({
      imports: [...APP_MODULES],
    }).compile();
  }

  static async clearDatabase(dataSource: DataSource) {
    const entities = dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
    }
  }
}
