import BasicService from "../../../common/abstract/services/BasicService";
import Result from './../../../global/Result';
import RootScope from "../../../global/RootScope";
import FilterBuilder from "../../../global/Filter";
import type {IQuestionService} from "../../../common/abstract/services/IQuestionService";
import type {Filter} from "../../../global/Filter";

const QUESTION_API = RootScope.appApiUrl + 'questions';

export default class QuestionService extends BasicService implements IQuestionService {

    create(data: any): Result {
        return super.save(data);
    }

    findAll(filter: Filter): Result {
        const fullUrl: string = FilterBuilder.buildUrlWithFilter(`${QUESTION_API}/find-all`, filter);
        return QuestionService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    findOneById(id: number): Result {
        const fullUrl: string = `${QUESTION_API}/get-detail?id=${id}`;
        return QuestionService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    deleteById(id: number): Result {
        return super.deleteById(id);
    }

    static builder(): IQuestionService {
        return new QuestionService();
    }
}