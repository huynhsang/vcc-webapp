import Result from '../global/Result';
import BasicService from "../common/abstract/services/BasicService";
import type {Filter} from "../../../global/Filter";
import RootScope from "../global/RootScope";
import type {IAnswerService} from "../../../common/abstract/services/IAnswerService";
import FilterBuilder from "../global/Filter";

const ANSWER_API = RootScope.appApiUrl + 'answers';

export default class AnswerService extends BasicService implements IAnswerService {

    create(data: any): Result {
        const fullUrl: string = AnswerService.buildURLWithToken(ANSWER_API);
        return AnswerService.post(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    findAll(filter: Filter): Result {
        return super.findAll(filter);
    }

    deleteById(id: number): Result {
        return super.deleteById(id);
    }

    getAnswersByQuestionId(id: number, filter: Filter): Result {
        const api: string = `${ANSWER_API}/find-all-by-question-id?id=${id}`;
        const fullUrl: string = `${api}&${FilterBuilder.toString(filter)}`;
        return AnswerService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    static builder(): IAnswerService {
        return new AnswerService();
    }
}