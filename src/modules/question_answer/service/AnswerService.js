import Result from './../../../global/Result';
import BasicService from "../../../common/abstract/services/BasicService";
import type {Filter} from "../../../global/Filter";
import RootScope from "../../../global/RootScope";
import type {IAnswerService} from "../../../common/abstract/services/IAnswerService";
import FilterBuilder from "../../../global/Filter";

const ANSWER_API = RootScope.appApiUrl + 'answers';

export default class AnswerService extends BasicService implements IAnswerService {

    save(data: any): Result {
        return super.save(data);
    }

    findAll(filter: Filter): Result {
        return super.findAll(filter);
    }

    findOne(id: number): Result {
        return super.findOne(id);
    }

    delete(id: number): Result {
        return super.delete(id);
    }

    getAnswersByQuestionId(id: number, filter: Filter): Result {
        const api = `${ANSWER_API}/find-all-by-question-id?id=${id}`;
        const fullUrl = `${api}&${FilterBuilder.toString(filter)}`;
        return AnswerService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    static builder(): IAnswerService {
        return new AnswerService();
    }
}