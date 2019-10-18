import Result from '../global/Result';
import BasicService from '../common/abstract/services/BasicService';
import RootScope from '../global/RootScope';
import FilterBuilder from '../global/Filter';

import { IExperienceService } from '../common/abstract/services/IExperienceService';

const EXPERIENCE_API = RootScope.appApiUrl + 'Experiences';

export default class ExperienceService extends BasicService
    implements IExperienceService {
    get(filter): Result {
        const fullUrl: string = FilterBuilder.buildUrlWithFilter(
            EXPERIENCE_API,
            filter
        );
        return ExperienceService.get(fullUrl, RootScope.axiosDefaultConfig);
    }

    create(data: any): Result {
        const fullUrl: string = ExperienceService.buildURLWithToken(
            EXPERIENCE_API
        );
        return ExperienceService.post(
            fullUrl,
            data,
            RootScope.axiosDefaultConfig
        );
    }

    update(data: any): Result {
        const fullUrl: string = ExperienceService.buildURLWithToken(
            EXPERIENCE_API
        );
        return ExperienceService.put(
            fullUrl,
            data,
            RootScope.axiosDefaultConfig
        );
    }

    static builder(): IExperienceService {
        return new ExperienceService();
    }
}
