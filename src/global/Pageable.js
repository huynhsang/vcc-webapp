export interface Pageable {
	currentPage: number;
	orderBy: string;
	sortType: string;
	length: number;
	size: number;
}

export default class PageableBuilder {
	static getUrlWithPageable(url: string, pageable: Pageable): string {
		return `${url}?page=${pageable.currentPage}&size=${pageable.size}&sort=${pageable.orderBy},${pageable.sortType}`;
	}

	static build(size: number, orderBy: string, isASC: boolean): Pageable {
		let pageable: Pageable = {};
		pageable.currentPage = 0;
		pageable.size = size;
		pageable.orderBy = orderBy;
		pageable.sortType = isASC ? "asc" : "desc";
		return pageable;
	}

	static toggleSortType(pageable: Pageable): Pageable {
		pageable.sortType = (pageable.sortType === "asc") ? "desc" : "asc";
		return pageable;
	}
}