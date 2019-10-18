import {IService} from "./IService";
import Result from "../../../global/Result";

export interface IExperienceService extends IService {
    create(data: any): Result;
    get(data: any): Result;
    update(data: any): Result;
}
