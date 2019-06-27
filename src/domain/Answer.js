import type {AuditingEntity} from "./AuditingEntity";
import type {Question} from "./Question";
import type {User} from "./User";

export interface Answer extends AuditingEntity {
    id: number;
    body: string;
    description: string;
    isTheBest: boolean;
    numberOfVotes: number;
    questionId: number;
    question: Question;
    answerBy: User;
}