import type {AuditingEntity} from './AuditingEntity';
import type {Category} from './Category';
import type {User} from './User';
import type {UserVoteQuestion} from './UserVoteQuestion';

export interface Question extends AuditingEntity {
    id: number;
    body: string;
    categorySlug: string;
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
    votes: Array<UserVoteQuestion>;
}
