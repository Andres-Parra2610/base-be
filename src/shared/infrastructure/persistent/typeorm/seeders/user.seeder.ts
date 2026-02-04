import { DataSource } from 'typeorm';
import { UserEntity } from '@/src/modules/user/infrastucture/persistence/entities/user.entity';
import { RolesEntity } from '@/src/modules/roles/infrastucture/persistence/entities/roles.entity';
import { UserRoleEntity } from '@/src/modules/user/infrastucture/persistence/entities/user-role.entity';

export const userSeeder = async (source: DataSource) => {
  const userRepository = source.getRepository(UserEntity);
  const roleRepository = source.getRepository(RolesEntity);
  const userRoleRepository = source.getRepository(UserRoleEntity);

  const email = 'aparra@a4agro.com';
  // Password: RootUser@2026.A4Agro
  const passwordHash = '$2b$10$4Z0BbwVNvBhJE.VIwAbujew7cYYEFH8Lvt0PKPZqRIdNynpZ.HBbG';

  let user = await userRepository.findOneBy({ email });

  if (!user) {
    user = await userRepository.save({
      fullName: 'Andres Parra',
      email,
      password: passwordHash,
      isStaff: true,
    });
    console.log(`User '${email}' created.`);
  } else {
    console.log(`User '${email}' already exists.`);
  }

  // Assign Root Role
  const rootRole = await roleRepository.findOneBy({ name: 'Root' });
  if (rootRole) {
    const existingUserRole = await userRoleRepository.findOneBy({
      userId: user.id,
      roleId: rootRole.id,
    });

    if (!existingUserRole) {
      await userRoleRepository.save({
        userId: user.id,
        roleId: rootRole.id,
      });
      console.log(`Assigned 'Root' role to user '${email}'.`);
    }
  } else {
    console.error('Root role not found! Run roleSeeder first.');
  }
};
