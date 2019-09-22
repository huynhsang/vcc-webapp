import type {IService} from "./IService";
import Result from "../../../global/Result";
import type {UserVoteQuestion} from "../../../domain/UserVoteQuestion";
import type {UserVoteAnswer} from "../../../domain/UserVoteAnswer";

export interface IUserVoteService extends IService {
    voteQuestion(data: UserVoteQuestion): Result;

    reVoteQuestion(data: UserVoteQuestion): Result;

    voteAnswer(data: UserVoteAnswer): Result;

    reVoteAnswer(data: UserVoteAnswer): Result;
}
