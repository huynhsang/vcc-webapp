import type {AuditingEntity} from "./AuditingEntity";
import type {Category} from "./Category";
import type {User} from "./User";

export interface Question extends AuditingEntity {
    id: number;
    body: string;
    categoryId: string;
    isHidden: boolean;
    isVerified: boolean;
    numberOfAndroidViews: number;
    numberOfIosViews: number;
    numberOfViews: number;
    tags: string;
    title: string;
    numberOfAnswers: number;
    numberOfVotes: number;
    hasAcceptedAnswer: boolean;
    expectPeopleAnswer: string;
    slug: string;
    category: Category;
    askedBy: User;
}