import type {AuditingEntity} from "./AuditingEntity";

export interface User extends AuditingEntity {
	id: number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	born: Date;
	gender: boolean;
	address: string;
	phone: string;
	career: string;
	avatar: string;
	langKey: string;
	enabled: boolean;
	authorities: Array<string>;
}