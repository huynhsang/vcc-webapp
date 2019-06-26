// import type {IService} from "../common/abstract/services/IService";
import type {IAccountService} from "../common/abstract/services/IAccountService";
import AccountService from "../modules/user/service/AccountService";
import type {IQuestionService} from "../common/abstract/services/IQuestionService";
import QuestionService from "../modules/question_answer/service/QuestionService";
import type {IAnswerService} from "../common/abstract/services/IAnswerService";
import AnswerService from "../modules/question_answer/service/AnswerService";

const ACCOUNT_SERVICE: IAccountService = AccountService.builder();
const QUESTION_SERVICE: IQuestionService = QuestionService.builder();
const ANSWER_SERVICE: IAnswerService = AnswerService.builder();

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
}