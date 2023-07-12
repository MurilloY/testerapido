import { Component, OnInit } from '@angular/core';
import { PacienteAddConsultaComponent } from './paciente-add-consulta/paciente-add-consulta.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-paciente-agendamentos',
  templateUrl: './paciente-agendamentos.component.html',
  styleUrls: ['./paciente-agendamentos.component.scss']
})
export class PacienteAgendamentosComponent implements OnInit {
  user?: any;
  today = new Date();

  constructor(private dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem("UserPacientObject")!);
  }

  ngOnInit(): void {

  }

  addConsulta() {
    const dialogRef = this.dialog.open(PacienteAddConsultaComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: true,
      data: {}
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.getAppointments(this.daySelected);
        // this.getDashes();
      }

    });
  }

}
