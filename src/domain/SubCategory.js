import type {AuditingEntity} from "./AuditingEntity";
import type {Category} from "./Category";

export interface SubCategory extends AuditingEntity {
    id: number;
    slug: string;
    nameEn: string;
    nameVi: string;
    numberOfQuestions: number;
    type: string;
    categoryId: number;
    category: Category;
}