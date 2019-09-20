import BasicService from "../common/abstract/services/BasicService";
import Result from '../global/Result';
import RootScope from "../global/RootScope";
import FilterBuilder from "../global/Filter";
import type {IQuestionService} from "../../../common/abstract/services/IQuestionService";
import type {Filter} from "../../../global/Filter";

const QUESTION_API = RootScope.appApiUrl + 'questions';
const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

export default class QuestionService extends BasicService implements IQuestionService {

    create(data: any): Result {
        const fullUrl: string = QuestionService.buildURLWithToken(QUESTION_API);
        return QuestionService.post(fullUrl, data, RootScope.axiosDefaultConfig);
    }

    findAll(filter: Filter): Result {
        let fullUrl: string = FilterBuilder.buildUrlWithFilter(`${QUESTION_API}/find-all`, filter);
        // if (RootScope.userId) {
        //     const api: string = QuestionService.buildURLWithToken(`${QUESTION_API}/find-all`);
        //     fullUrl = `${api}&${FilterBuilder.toString(filter)}`;
        // }
        return QuestionService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    findOneBySlug(slug: string): Result {
        let fullUrl: string = `${QUESTION_API}/get-detail?slug=${slug}`;
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

    getPopularQuestionsInMonth(filter: Filter): Result {
        filter.include = [{
            relation: 'askedBy',
            scope: {
                fields: ['id', 'avatar', 'firstName', 'lastName', 'numberOfQuestions',
                    'numberOfAnswers', 'numberOfBestAnswers', 'points', 'level'],
            }
        }];
        filter.where = {
            created: {
                gt: new Date(Date.now() - ONE_MONTH)
            }
        };
        filter.order = "numberOfViews DESC";
        const fullUrl: string = FilterBuilder.buildUrlWithFilter(QUESTION_API, filter);
        return QuestionService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    getQuestionsWithTopAnswerInMonth(filter: Filter): Result {
        filter.include = [{
            relation: 'askedBy',
            scope: {
                fields: ['id', 'avatar', 'firstName', 'lastName', 'numberOfQuestions',
                    'numberOfAnswers', 'numberOfBestAnswers', 'points', 'level'],
            }
        }];
        filter.where = {
            created: {
                gt: new Date(Date.now() - ONE_MONTH)
            }
        };
        filter.order = "numberOfAnswers DESC";
        const fullUrl: string = FilterBuilder.buildUrlWithFilter(QUESTION_API, filter);
        return QuestionService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    static builder(): IQuestionService {
        return new QuestionService();
    }
}
