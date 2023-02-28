import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {IIssueType} from "../interfaces/issue-type";

@Injectable({
  providedIn: 'root'
})
export class IssueTypeService extends BaseService {
  getIssueTypes(): Observable<IIssueType[]> {
    return this.get<IIssueType[]>('IIssueType');
  }

  createIssueType(data: any): Observable<IIssueType> {
    return this.post<IIssueType>('IIssueType', data);
  }
  updateIssueType(data: any): Observable<IIssueType> {
    return this.put<IIssueType>(`IIssueType/${data.id}`, data)

  }
  getIssueType(id: number): Observable<IIssueType> {
    return this.get<IIssueType>(`IIssueType/${id}`)
  }


  deleteIssueType(id: number): Observable<any> {
    return this.delete(`IIssueType/${id}`)
  }
}
