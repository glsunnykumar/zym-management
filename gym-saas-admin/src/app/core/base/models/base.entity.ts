// core/base/models/base.entity.ts

export interface BaseEntity {

  id: string;

  createdAt: Date;

  updatedAt: Date;

  createdBy?: string;

  updatedBy?: string;

  isActive: boolean;

}