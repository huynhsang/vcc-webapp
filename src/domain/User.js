export interface User {
	id: number;
    avatar: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
    dateOfBirth: Date;
    headline: string;
    isEnable: boolean;
    nationality: string;
	phone: string;
    summary: string;
    realm: string;
    created: Date;
    createdBy: string;
    updated: Date;
    updatedBy: string;
    numberOfQuestions: number;
    numberOfAnswers: number;
    numberOfBestAnswers: number;
    points: number;
    level: string;
}