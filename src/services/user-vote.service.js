import Result from '../global/Result';
import BasicService from "../common/abstract/services/BasicService";
import RootScope from "../global/RootScope";
import type {IUserVoteService} from "../../../common/abstract/services/IUserVoteService";
import type {UserVoteQuestion} from "../../../domain/UserVoteQuestion";
import type {UserVoteAnswer} from "../../../domain/UserVoteAnswer";

const VOTE_QUESTION_API = RootScope.appApiUrl + 'UserVoteQuestions';
const VOTE_ANSWER_API = RootScope.appApiUrl + 'UserVoteAnswers';

export default class UserVoteService extends BasicService implements IUserVoteService {

    voteQuestion(data: UserVoteQuestion): Result {
        const fullUrl: string = UserVoteService.buildURLWithToken(VOTE_QUESTION_API);
        return UserVoteService.post(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    reVoteQuestion(data: UserVoteQuestion): Result {
        const fullUrl: string = UserVoteService.buildURLWithToken(VOTE_QUESTION_API);
        return UserVoteService.put(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    voteAnswer(data: UserVoteAnswer): Result {
        const fullUrl: string = UserVoteService.buildURLWithToken(VOTE_ANSWER_API);
        return UserVoteService.post(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    reVoteAnswer(data: UserVoteAnswer): Result {
        const fullUrl: string = UserVoteService.buildURLWithToken(VOTE_ANSWER_API);
        return UserVoteService.put(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    static builder(): IUserVoteService {
        return new UserVoteService();
    }
}
