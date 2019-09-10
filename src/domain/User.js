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
    createdOn: Date;
    updatedOn: Date;
    numberOfQuestions: number;
    numberOfAnswers: number;
    numberOfBestAnswers: number;
    points: number;
    level: string;
}
