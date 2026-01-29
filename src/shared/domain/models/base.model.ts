export interface BaseModelParams {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

export abstract class BaseModel<T extends BaseModelParams> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;

  constructor(params: T) {
    Object.assign(this, {
      ...params,
      createdAt: params.createdAt || new Date(),
      updatedAt: params.updatedAt || new Date(),
    });
  }

  public cloneWith(changes: Partial<T>): this {
    const Constructor = this.constructor as new (params: T) => this;
    const newParams = {
      ...this,
      ...changes,
      updatedAt: new Date(),
    } as unknown as T;

    return new Constructor(newParams);
  }
}
