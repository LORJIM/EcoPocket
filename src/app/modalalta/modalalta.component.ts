import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modalalta',
  templateUrl: './modalalta.component.html',
  styleUrls: ['../login/login.component.css']
})
export class ModalaltaComponent implements OnInit {
value:number;
  constructor(public dialogRef: MatDialogRef<ModalaltaComponent>) { }

  ngOnInit(): void {
  }
onCancelar(): void {
    this.dialogRef.close();
  }
}
