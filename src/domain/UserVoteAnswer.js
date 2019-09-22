import type {AuditingEntity} from './AuditingEntity';
import type {User} from './User';
import type {Question} from './Question';

export interface UserVoteAnswer extends AuditingEntity {
    id: number;
    userId: number;
    answerId: number;
    isPositiveVote: boolean;
    reason: string;
    owner: User;
    answer: Question;
}
