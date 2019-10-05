import type {IService} from "./IService";
import Result from "../../../global/Result";
import type {Filter} from "../../../global/Filter";

export interface IExperienceService extends IService {
    create(data: any): Result;
}
