import {Component, Input, OnInit} from '@angular/core';
import {PageOptions} from "../../core/interfaces/page-options";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit{
  @Input() project: PageOptions = {} as PageOptions

  ngOnInit(): void {
  }

}
