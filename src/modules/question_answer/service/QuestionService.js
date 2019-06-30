import BasicService from "../../../common/abstract/services/BasicService";
import Result from './../../../global/Result';
import RootScope from "../../../global/RootScope";
import FilterBuilder from "../../../global/Filter";
import type {IQuestionService} from "../../../common/abstract/services/IQuestionService";
import type {Filter} from "../../../global/Filter";

const QUESTION_API = RootScope.appApiUrl + 'questions';

export default class QuestionService extends BasicService implements IQuestionService {

    create(data: any): Result {
        const fullUrl: string = QuestionService.buildURLWithToken(QUESTION_API);
        return QuestionService.post(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    findAll(filter: Filter): Result {
        let fullUrl: string = FilterBuilder.buildUrlWithFilter(`${QUESTION_API}/find-all`, filter);
        if (RootScope.userId) {
            const api: string = QuestionService.buildURLWithToken(`${QUESTION_API}/find-all`);
            fullUrl = `${api}&${FilterBuilder.toString(filter)}`;
        }
        return QuestionService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    findOneById(id: number): Result {
        let fullUrl: string = `${QUESTION_API}/get-detail?id=${id}`;
        if (RootScope.userId) {
            fullUrl = `${fullUrl}&${QuestionService.getTokenString()}`
        }
        return QuestionService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    deleteById(id: number): Result {
        return super.deleteById(id);
    }

    doApproveAnswer(questionId: Number, answerId: Number): Result {
        const fullUrl: string = QuestionService.buildURLWithToken(`${QUESTION_API}/approve-answer`);
        const data: Object = {
            id: questionId,
            answerId: answerId,
        };
        return QuestionService.post(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    static builder(): IQuestionService {
        return new QuestionService();
    }
}