import type {User} from "./User";

export interface AuditingEntity {
	createdBy: User;
	created: Date;
	updatedBy: User;
	updated: Date;
}