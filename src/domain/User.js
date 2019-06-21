import type {AuditingEntity} from "./AuditingEntity";

export interface User extends AuditingEntity {
	id: number;
    avatar: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
    dateOfBirth: Date;
    headline: string;
    isEnable: boolean;
    nationality: string;
	phone: string;
    summary: string;
    realm: string;
    created: Date;
    createdBy: string;
    updated: Date;
    updatedBy: string;
}