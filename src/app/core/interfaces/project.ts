import {Datum} from "./datum";

export interface Project {
    data: Datum[];
    totalCount: number;
    page: number;
    limit: number;
}


