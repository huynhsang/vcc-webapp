import type {AuditingEntity} from "./AuditingEntity";

export interface Category extends AuditingEntity {
    id: number;
    slug: string;
    nameEn: string;
    nameVi: string;
    numberOfQuestions: number;
}