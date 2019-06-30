import type {AuditingEntity} from "./AuditingEntity";
import type {Category} from "./Category";
import type {User} from "./User";
import type {Question} from "./Question";

export interface UsersVoteAnswers extends AuditingEntity {
    id: number;
    userId: number;
    answerId: number;
    isPositiveVote: boolean;
    reason: string;
    owner: User,
    answer: Question,
}