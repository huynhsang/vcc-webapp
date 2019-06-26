import type {IService} from "./IService";
import Result from "../../../global/Result";
import type {Filter} from "../../../global/Filter";

export interface IAnswerService extends IService {
    getAnswersByQuestionId(id: number, filter: Filter): Result;
}
