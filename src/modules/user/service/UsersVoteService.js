import Result from './../../../global/Result';
import BasicService from "../../../common/abstract/services/BasicService";
import RootScope from "../../../global/RootScope";
import type {IUsersVoteService} from "../../../common/abstract/services/IUsersVoteService";
import type {UsersVoteQuestions} from "../../../domain/UsersVoteQuestions";
import type {UsersVoteAnswers} from "../../../domain/UsersVoteAnswers";

const VOTE_QUESTION_API = RootScope.appApiUrl + 'UsersVoteQuestions';
const VOTE_Answer_API = RootScope.appApiUrl + 'UsersVoteAnswers';

export default class UsersVoteService extends BasicService implements IUsersVoteService {

    voteQuestion(data: UsersVoteQuestions): Result {
        const fullUrl: string = UsersVoteService.buildURLWithToken(VOTE_QUESTION_API, RootScope.token);
        return UsersVoteService.post(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    reVoteQuestion(data: UsersVoteQuestions): Result {
        const fullUrl: string = UsersVoteService.buildURLWithToken(VOTE_QUESTION_API, RootScope.token);
        return UsersVoteService.put(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    voteAnswer(data: UsersVoteAnswers): Result {
        const fullUrl: string = UsersVoteService.buildURLWithToken(VOTE_Answer_API, RootScope.token);
        return UsersVoteService.post(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    reVoteAnswer(data: UsersVoteAnswers): Result {
        const fullUrl: string = UsersVoteService.buildURLWithToken(VOTE_Answer_API, RootScope.token);
        return UsersVoteService.put(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    static builder(): IUsersVoteService {
        return new UsersVoteService();
    }
}