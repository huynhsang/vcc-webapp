import type {IService} from "./IService";
import Result from "../../../global/Result";

export interface IQuestionService extends IService {
    doApproveAnswer(questionId: Number, answerId: Number): Result;
}