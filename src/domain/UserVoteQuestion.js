import type {AuditingEntity} from './AuditingEntity';
import type {User} from './User';
import type {Question} from './Question';

export interface UserVoteQuestion extends AuditingEntity {
    id: number;
    userId: number;
    questionId: number;
    isPositiveVote: boolean;
    reason: string;
    owner: User;
    question: Question;
}
