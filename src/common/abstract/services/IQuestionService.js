import type {IService} from "./IService";
import Result from "../../../global/Result";
import type {Filter} from "../../../global/Filter";

export interface IQuestionService extends IService {
    doApproveAnswer(questionId: Number, answerId: Number): Result;

    getPopularQuestionsInMonth(filter: Filter): Result;

    getQuestionsWithTopAnswerInMonth(filter: Filter): Result;
}