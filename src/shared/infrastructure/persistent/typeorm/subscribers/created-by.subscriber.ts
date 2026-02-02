import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { ClsServiceManager } from 'nestjs-cls';
import { BaseEntity } from '../entity/base-entity';

@EventSubscriber()
export class CreatedBySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return BaseEntity;
  }

  beforeInsert(event: InsertEvent<BaseEntity>) {
    const user = this.getUser();
    if (user && event && event.entity) {
      event.entity.createdBy = user.id;
      event.entity.updatedBy = user.id;
    }
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    const user = this.getUser();
    if (user && event && event.entity) {
      event.entity.updatedBy = user.id;
    }
  }

  beforeSoftRemove(event: SoftRemoveEvent<BaseEntity>): Promise<any> | void {
    const user = this.getUser();
    if (user && event && event.entity) {
      event.entity.deletedBy = user.id;
    }
  }

  private getUser() {
    const cls = ClsServiceManager.getClsService();
    const user = cls?.get('user');
    return user;
  }
}
