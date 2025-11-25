import { BadRequestException } from '@nestjs/common';
import { FindOneOptions, FindOptionsWhere, In, Not, ObjectLiteral, Repository } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {

  async findOneByIdOrThrow(id: string, message: string = 'El registro no existe'): Promise<T> {
    const entity = await this.findOne({ where: { id } } as FindOneOptions);
    if (!entity) {
      throw new BadRequestException(message);
    }
    return entity;
  }

  async findOneOrThrow(options: FindOneOptions<T>, message: string = 'El registro no existe'): Promise<T> {
    const entity = await this.findOne(options);
    if (!entity) {
      throw new BadRequestException(message);
    }
    return entity;
  }

  async validateUniqueUpdate(id: string, where: FindOptionsWhere<T>, message: string = 'El registro ya existe'): Promise<void> {
    const entity = await this.findOne({
      where: {
        ...where,
        id: Not(id),
      } as FindOptionsWhere<T>,
    });

    if (entity) {
      throw new BadRequestException(message);
    }
  }

  async findManyByIdsAndReturnNotFounds(ids: string[]): Promise<{ entities: T[], notFound: string[] }> {
    const entities = await this.find({ where: { id: In(ids) } as any });
    const notFound = ids.filter(id => !entities.some(entity => entity.id === id));
    return { entities, notFound };
  }
}
