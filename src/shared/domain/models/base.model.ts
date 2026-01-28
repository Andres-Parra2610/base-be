export interface BaseModelParams {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

export class BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;

  constructor(params: BaseModelParams) {
    Object.assign(this, {
      ...params,
      createdAt: params.createdAt || new Date(),
      updatedAt: params.updatedAt || new Date(),
    });
  }
}
