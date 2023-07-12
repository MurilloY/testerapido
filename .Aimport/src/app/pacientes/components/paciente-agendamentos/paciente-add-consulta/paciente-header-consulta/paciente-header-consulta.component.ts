import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdialogComponent } from 'src/app/clinics/components/confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-paciente-header-consulta',
  templateUrl: './paciente-header-consulta.component.html',
  styleUrls: ['./paciente-header-consulta.component.scss']
})
export class PacienteHeaderConsultaComponent implements OnInit {

  @Input() progress: number = 0;
  @Input() showBtnHome: boolean = false;
  @Input() showProgress: boolean = false;
  @Input() showBtnClose: boolean = false;
  @Input() showBtnNotification: boolean = false;
  @Input() showUser: boolean = false;
  @Input() fixedHeader: boolean = true;
  @Input() menu: boolean = false;
  @Input() dialogVersion: number = 0;

  @Output() closeEvent = new EventEmitter<string>();

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  closeDialog() {

    if (this.dialogVersion == 0) {

      const dialogRef = this.dialog.open(ConfirmdialogComponent, {
        data: {
          version: 3,
          title: "Fechar atendimento?",
          desc: "Tem certeza que deseja fechar ? todas as informações serão perdidas",
          button_confirm: "Sim",
          button_cancel: "Não"
        },
      });

      dialogRef.afterClosed().subscribe(dialogResult => {

        if (dialogResult) {
          this.closeEvent.emit()
        }

      });


    }

    if (this.dialogVersion == 1) {

      this.closeEvent.emit()

    }

    if (this.dialogVersion == 2) {

      const dialogRef = this.dialog.open(ConfirmdialogComponent, {
        data: {
          version: 3,
          title: "Fechar cadastro pacientes?",
          desc: "Tem certeza que deseja fechar ? todas as informações serão perdidas.",
          button_confirm: "Sim",
          button_cancel: "Não"
        },
      });

      dialogRef.afterClosed().subscribe(dialogResult => {

        if (dialogResult) {
          this.closeEvent.emit()
        }

      });


    }

    if (this.dialogVersion == 3) {
      this.closeEvent.emit()



    }
    

  }

}
