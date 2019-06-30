import type {AuditingEntity} from "./AuditingEntity";
import type {Question} from "./Question";
import type {User} from "./User";
import type {UsersVoteAnswers} from "./UsersVoteAnswers";

export interface Answer extends AuditingEntity {
    id: number;
    body: string;
    description: string;
    isTheBest: boolean;
    numberOfVotes: number;
    questionId: number;
    question: Question;
    answerBy: User;
    votes: Array<UsersVoteAnswers>;
}