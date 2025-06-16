import { dataSource } from './database/database.providers';

async function runMigrations() {
  try {
    await dataSource.initialize();
    await dataSource.runMigrations();
    console.log('Migraciones ejecutadas correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando migraciones:', error);
    process.exit(1);
  }
}

void runMigrations();