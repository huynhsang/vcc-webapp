
export interface ExperienceRequest {
    title: String;
    employment: String;
    company: String;
    location: String;
    isWorking: Boolean;
    startDate: Date;
    endDate: Date;
    description: string;
}

export default class ExperienceRequestBuilder {
    static
        build(
            title: string,
            employment: string,
            company: string,
            location: string,
            isWorking: Boolean,
            startDate: Date,
            endDate: Date,
            description: string
        ): ExperienceRequest {
        let experienceRequest: ExperienceRequest = {};
        
        experienceRequest.title = title;
        experienceRequest.employment = employment;
        experienceRequest.company = company;
        experienceRequest.location = location;
        experienceRequest.isWorking = isWorking;
        experienceRequest.startDate = startDate;
        experienceRequest.endDate = endDate;
        experienceRequest.description = description;

        return experienceRequest;
    }
}
