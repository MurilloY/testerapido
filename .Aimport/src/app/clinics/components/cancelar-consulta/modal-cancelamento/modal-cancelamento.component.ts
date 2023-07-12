import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cancelamento',
  templateUrl: './modal-cancelamento.component.html',
  styleUrls: ['./modal-cancelamento.component.scss']
})
export class ModalCancelamentoComponent implements OnInit {

  version: number = 1;
  title: string;
  desc: string;

  buttonConfirm: string;
  buttonCancel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ModalCancelamentoComponent>
  ) { 
    this.version = data.versao;
    this.title = data.title;
    this.desc = data.desc;

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
