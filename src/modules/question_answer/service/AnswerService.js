import Result from './../../../global/Result';
import BasicService from "../../../common/abstract/services/BasicService";
import type {Pageable} from "../../../global/Pageable";
import RootScope from "../../../global/RootScope";
import type {IAnswerService} from "../../../common/abstract/services/IAnswerService";

const ANSWER_API = RootScope.appApiUrl + 'answer';

export default class AnswerService extends BasicService implements IAnswerService {

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

    static builder(): IAnswerService {
        return new AnswerService();
    }
}