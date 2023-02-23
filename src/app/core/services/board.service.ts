import { Injectable } from '@angular/core';
import {Board} from "../interfaces/board";
import {Observable} from "rxjs";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class BoardService extends BaseService{
  getBoards(): Observable<Board[]> {
    return this.get<Board[]>('board');
  }

  createBoard(data: any): Observable<Board> {
    return this.post<Board>('board', data);
  }

}
