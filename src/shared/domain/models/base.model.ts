export class BaseModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    deletedBy: string | null;

    constructor(id: string, createdAt: Date, updatedAt: Date, deletedAt: Date | null, createdBy: string | null, updatedBy: string | null, deletedBy: string | null) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
}