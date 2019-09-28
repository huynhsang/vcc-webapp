import {IAccountService} from "../common/abstract/services/IAccountService";
import AccountService from "../services/account.service";
import {IQuestionService} from "../common/abstract/services/IQuestionService";
import QuestionService from "../services/question.service";
import {IAnswerService} from "../common/abstract/services/IAnswerService";
import AnswerService from "../services/answer.service";
import {ISubCategoryService} from "../common/abstract/services/ISubCategoryService";
import SubCategoryService from "../services/sub-category.service";
import {IUserVoteService} from "../common/abstract/services/IUserVoteService";
import UserVoteService from "../services/user-vote.service";

const ACCOUNT_SERVICE: IAccountService = AccountService.builder();
const QUESTION_SERVICE: IQuestionService = QuestionService.builder();
const ANSWER_SERVICE: IAnswerService = AnswerService.builder();
const SUBCATEGORY_SERVICE: ISubCategoryService = SubCategoryService.builder();
const USERS_VOTE_SERVICE: IUserVoteService = UserVoteService.builder();

export default class CoreService {
	static get accountService(): IAccountService {
		return ACCOUNT_SERVICE;
	}

    static get questionService(): IQuestionService {
        return QUESTION_SERVICE;
    }

    static get answerService(): IAnswerService {
        return ANSWER_SERVICE;
    }

    static get subCategoryService(): ISubCategoryService {
        return SUBCATEGORY_SERVICE;
    }

    static get userVoteService(): IUserVoteService {
        return USERS_VOTE_SERVICE;
    }
}
