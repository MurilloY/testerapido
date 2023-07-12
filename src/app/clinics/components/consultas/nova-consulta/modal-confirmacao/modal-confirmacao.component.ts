import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss']
})
export class ModalConfirmacaoComponent implements OnInit {

  message: string = 'Mantenha seu paciente informado sobre todos os detalhes da consulta.';
  msgEnviada: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ModalConfirmacaoComponent>
  ) { }

  ngOnInit(): void {
  }

  enviarMsg(){
    this.message = 'Enviamos um lembrete para o WhatsApp do paciente e agenda do profissional de saúde.';
    this.msgEnviada = true;
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
