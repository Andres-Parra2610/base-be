import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { ClsServiceManager } from 'nestjs-cls';

@EventSubscriber()
export class CreatedBySubscriber implements EntitySubscriberInterface {

  /* listenTo() {
    return Base;
  }

  beforeInsert(event: InsertEvent<Base>) {
    const user = this.getUser();
    if (user && event && event.entity) {
      event.entity.createdBy = user.id;
      event.entity.updatedBy = user.id;
    }
  }

  beforeUpdate(event: UpdateEvent<Base>) {
    const user = this.getUser();
    if (user && event && event.entity) {
      event.entity.updatedBy = user.id;
    }
  }

  private getUser() {
    const cls = ClsServiceManager.getClsService();
    const user = cls?.get('user');
    return user;
  } */
}
