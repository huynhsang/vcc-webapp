import Result from './../../../global/Result';
import BasicService from "../../../common/abstract/services/BasicService";
import type {Pageable} from "../../../global/Pageable";
import RootScope from "../../../global/RootScope";
import type {IQuestionService} from "../../../common/abstract/services/IQuestionService";

const QUESTION_API = RootScope.appApiUrl + 'question';

export default class QuestionService extends BasicService implements IQuestionService {

    save(data: any): Result {
        return super.save(data);
    }

    findAll(pageable: Pageable): Result {
        return super.findAll(pageable);
    }

    findOne(id: number): Result {
        return super.findOne(id);
    }

    delete(id: number): Result {
        return super.delete(id);
    }

    static builder(): IQuestionService {
        return new QuestionService();
    }
}