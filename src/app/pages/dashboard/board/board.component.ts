import { Component } from '@angular/core';
import {BoardService} from "../../../core/services/board.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}
}
