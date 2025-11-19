import { State } from "src/shared/entities/state.entity";
import { DataSource } from "typeorm";

export const stateSeeder = async (source: DataSource) => {
  const repository = source.getRepository(State);

  await repository.upsert([
    { name: 'Amazonas' },
    { name: 'Anzoátegui' },
    { name: 'Apure' },
    { name: 'Aragua' },
    { name: 'Barinas' },
    { name: 'Bolívar' },
    { name: 'Carabobo' },
    { name: 'Cojedes' },
    { name: 'Delta Amacuro' },
    { name: 'Falcón' },
    { name: 'Guárico' },
    { name: 'Lara' },
    { name: 'Mérida' },
    { name: 'Miranda' },
    { name: 'Monagas' },
    { name: 'Nueva Esparta' },
    { name: 'Portuguesa' },
    { name: 'Sucre' },
    { name: 'Táchira' },
    { name: 'Trujillo' },
    { name: 'La Guaira' },
    { name: 'Yaracuy' },
    { name: 'Zulia' },
    { name: 'Distrito Capital' },
    { name: 'Dependencias Federales' }
  ], { conflictPaths: ['name'] });
}
