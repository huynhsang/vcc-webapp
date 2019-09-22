import type {AuditingEntity} from './AuditingEntity';

export interface Category extends AuditingEntity {
    slug: string;
    nameEn: string;
    nameVi: string;
    numberOfQuestions: number;
}
