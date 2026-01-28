import { dataSource } from '../database.providers';
import { citySeeder } from './city.seeder';
import { stateSeeder } from './state.seeder';
import { userSeeder } from './user.seeder';

void (async () => {
  const source = await dataSource.initialize();
  try {
    await stateSeeder(source);
    await citySeeder(source);
    await userSeeder(source);
    console.log('\x1b[32m%s\x1b[0m', 'Seeds inicializados correctamente');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error al inicializar los seeds:', error);
  } finally {
    await source.destroy().catch((error) => console.error('Error al destruir la conexión:', error));
    process.exit(0);
  }
})();
