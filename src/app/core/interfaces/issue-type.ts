import {IssueTypeEnum} from "../enums/issue-type.enum";

export interface IIssueType {
    name: string;
    description: string;
    icon: string;
    color: string;
    isActive: boolean;
    type: IssueTypeEnum;
    issueTypeColumns: IssueTypeColumn[];
}
export interface IssueTypeColumn {
  id: number;
  name: string;
  filedName: string;
  type: string;
  isRequired: boolean;
  issueTypeId: number;
  issueType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}


