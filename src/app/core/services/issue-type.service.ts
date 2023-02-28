import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IIssueType} from "../interfaces/issue-type";

@Injectable({
  providedIn: 'root'
})
export class IssueTypeService extends BaseService {
  getIssueTypes(): Observable<IIssueType[]> {
    return this.get<IIssueType[]>('issue-type');
  }

  createIssueType(data: any): Observable<IIssueType> {
    return this.post<IIssueType>('issue-type', data);
  }
  updateIssueType(data: any): Observable<IIssueType> {
    return this.put<IIssueType>(`issue-type/${data.id}`, data)

  }
  getIssueType(id: number): Observable<IIssueType> {
    return this.get<IIssueType>(`issue-type/${id}`)
  }


  deleteIssueType(id: number): Observable<any> {
    return this.delete(`issue-type/${id}`)
  }
}
