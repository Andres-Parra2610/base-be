import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @Column({name: 'created_by', nullable: true})
    createdBy?: string;

    @Column({name: 'updated_by', nullable: true})
    updatedBy?: string;

    @Column({name: 'deleted_by', nullable: true})
    deletedBy?: string;
}