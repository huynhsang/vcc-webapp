export interface Filter {
    fields: Array<string>;
    include: Object;
    order: string;
    skip: number;
    limit: number;
    where: Object;
}

export default class FilterBuilder {

    static build(fields: Object, include: Object, order: string, skip: number, limit: number, where: Object): Filter {
        let filter: Filter = {};
        filter.fields = fields;
        filter.include = include;
        filter.order = order;
        filter.skip = skip;
        filter.limit = limit;
        filter.where = where;
        return filter;
    }

    static buildPaginationFilter(order: string, skip: number, limit: number): Filter {
        let filter: Filter = {};
        filter.order = order;
        filter.skip = skip;
        filter.limit = limit;
        return filter;
    }

    static toggleOrderBy(filter: Filter, order): Filter {
        filter.order = order;
        return filter;
    }

    static toString(filter: Filter): string {
        return `filter=${JSON.stringify(filter)}`;
    }

    static buildUrlWithFilter(url: string, filter: Filter): string {
        return `${url}?${this.toString(filter)}`
    }
}