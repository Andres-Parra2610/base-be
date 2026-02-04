import { DataSource } from 'typeorm';
import {
  AppPermissions,
  ContextType,
  PermissionAction,
  PermissionResource,
} from '@/src/modules/roles/domain/types/roles.types';
import { RolesEntity } from '@/src/modules/roles/infrastucture/persistence/entities/roles.entity';

export const roleSeeder = async (source: DataSource) => {
  const repository = source.getRepository(RolesEntity);

  const rootRoleName = 'Root';

  // Generate full component permissions
  const fullPermissions: AppPermissions = Object.values(PermissionResource).reduce(
    (acc, resource) => {
      acc[resource] = Object.values(PermissionAction).reduce((actions, action) => {
        actions[action] = true;
        return actions;
      }, {});
      return acc;
    },
    {} as AppPermissions,
  );

  const existing = await repository.findOneBy({ name: rootRoleName });

  if (!existing) {
    await repository.save({
      name: rootRoleName,
      contextType: ContextType.system,
      permissions: fullPermissions,
      canDelete: false, // Root role should not be deletable
    });
    console.log(`Role '${rootRoleName}' created.`);
  } else {
    // Optional: Update permissions if they changed
    existing.permissions = fullPermissions;
    await repository.save(existing);
    console.log(`Role '${rootRoleName}' updated.`);
  }
};
