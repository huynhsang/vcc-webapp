import type {IService} from "./IService";
import Result from "../../../global/Result";
import type {UsersVoteQuestions} from "../../../domain/UsersVoteQuestions";
import type {UsersVoteAnswers} from "../../../domain/UsersVoteAnswers";

export interface IUsersVoteService extends IService {
    voteQuestion(data: UsersVoteQuestions): Result;

    reVoteQuestion(data: UsersVoteQuestions): Result;

    voteAnswer(data: UsersVoteAnswers): Result;

    reVoteAnswer(data: UsersVoteAnswers): Result;
}
