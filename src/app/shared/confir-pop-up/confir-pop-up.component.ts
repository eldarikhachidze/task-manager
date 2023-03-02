import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confir-pop-up',
  templateUrl: './confir-pop-up.component.html',
  styleUrls: ['./confir-pop-up.component.scss']
})
export class ConfirPopUpComponent {
 constructor(
   public dialogRef: MatDialogRef<ConfirPopUpComponent>
 ) {
 }
}
