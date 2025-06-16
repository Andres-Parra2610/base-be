import { User } from "src/modules/users/entities/user.entity";
import { DataSource } from "typeorm";
import * as bcrypt from 'bcryptjs'


export const userSeeder = async (source: DataSource) => {
  const repository = source.getRepository(User);

  /* Eliminar usuarios anteriores */
  await repository.delete({
    email: 'admin@admin.com'
  });

  await repository.insert([
    {
      name: 'Admin',
      lastname: 'a4agro',
      identityDocument: '123456789',
      typeDocument: 'J',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('123456', 10),
      userType: 'admin',
    }
  ]);


}