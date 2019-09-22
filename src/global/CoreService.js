import type {IAccountService} from "../common/abstract/services/IAccountService";
import AccountService from "../services/AccountService";
import type {IQuestionService} from "../common/abstract/services/IQuestionService";
import QuestionService from "../services/QuestionService";
import type {IAnswerService} from "../common/abstract/services/IAnswerService";
import AnswerService from "../services/AnswerService";
import type {ISubCategoryService} from "../common/abstract/services/ISubCategoryService";
import SubCategoryService from "../services/SubCategoryService";
import type {IUserVoteService} from "../common/abstract/services/IUserVoteService";
import UserVoteService from "../services/UserVoteService";

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
