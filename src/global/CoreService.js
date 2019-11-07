import { IExperienceService } from "../common/abstract/services/IExperienceService";
import ExperienceService from "../services/experience.service";

const EXPERIENCE_SERVICE: IExperienceService = ExperienceService.builder();

export default class CoreService {

    static get experienceService(): IExperienceService {
        return EXPERIENCE_SERVICE;
    }
}
