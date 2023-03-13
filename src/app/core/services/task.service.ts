import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {Task} from "../interfaces/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService{
  getTask(id: number): Observable<Task> {
    return this.get<Task>(`task/${id}`)
  }

  getTasks(params = {}): Observable<Task[]> {
    return this.get<Task[]>(`task`, params )
  }

  createTask(data: any): Observable<Task> {
    return this.post<Task>(`task`, data)
  }

  updateTask(id: number, data: any): Observable<Task> {
    return this.put<Task>(`task/${id}`, data)
  }

  deleteTask(id: number): Observable<any> {
    return this.delete<Task>(`task/${id}`)
  }
}
