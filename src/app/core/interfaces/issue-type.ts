import {IssueTypeColumn} from "./issue-type-column";
import {IssueTypeEnum} from "../enums/issue-type.enum";

export interface RootObject {
    name: string;
    description: string;
    icon: string;
    color: string;
    isActive: boolean;
    type: IssueTypeEnum;
    issueTypeColumns: IssueTypeColumn[];
}



