import type {IAccountService} from "../common/abstract/services/IAccountService";
import AccountService from "../modules/user/service/AccountService";
import type {IQuestionService} from "../common/abstract/services/IQuestionService";
import QuestionService from "../modules/question_answer/service/QuestionService";
import type {IAnswerService} from "../common/abstract/services/IAnswerService";
import AnswerService from "../modules/question_answer/service/AnswerService";
import type {ISubCategoryService} from "../common/abstract/services/ISubCategoryService";
import SubCategoryService from "../modules/sub_category/service/SubCategoryService";
import type {IUsersVoteService} from "../common/abstract/services/IUsersVoteService";
import UsersVoteService from "../modules/user/service/UsersVoteService";

const ACCOUNT_SERVICE: IAccountService = AccountService.builder();
const QUESTION_SERVICE: IQuestionService = QuestionService.builder();
const ANSWER_SERVICE: IAnswerService = AnswerService.builder();
const SUBCATEGORY_SERVICE: ISubCategoryService = SubCategoryService.builder();
const USERS_VOTE_SERVICE: IUsersVoteService = UsersVoteService.builder();

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

    static get usersVoteService(): IUsersVoteService {
        return USERS_VOTE_SERVICE;
    }
}
