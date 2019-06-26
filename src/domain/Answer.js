import type {AuditingEntity} from "./AuditingEntity";
import type {Question} from "./Question";

export interface Answer extends AuditingEntity {
    id: number;
    answer: string;
    description: string;
    isTheBest: boolean;
    numberOfVotes: number;
    questionId: number;
    question: Question;
}