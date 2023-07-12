import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.scss']
})
export class ConfirmdialogComponent implements OnInit {

  version: number = 1;
  title: string;
  desc: string;

  buttonConfirm: string;
  buttonCancel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmdialogComponent>
  ) { 
    this.version = data.version;
    this.title = data.title;
    this.desc = data.desc;
    this.buttonConfirm = data.button_confirm;
    this.buttonCancel = data.button_cancel;

  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }


  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
