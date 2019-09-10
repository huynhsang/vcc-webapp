import type {User} from "./User";

export interface AuditingEntity {
	createdBy: User;
	createdOn: Date;
	updatedBy: User;
	updatedOn: Date;
}
