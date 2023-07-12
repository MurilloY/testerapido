import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../returns/appointments.return';
import { Clinic } from '../../returns/clinic_by_user.return';
import { Dashes } from '../../returns/dashes.return';
import { ClinicService } from '../../services/clinic.service';
import { CancelarConsultaComponent } from '../cancelar-consulta/cancelar-consulta.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { EditarPagamentoComponent } from './editar-pagamento/editar-pagamento.component';
import { NovaConsultaComponent } from './nova-consulta/nova-consulta.component';

export interface Lista {
  nome: string;
  paciente: string;
  data: string;
  status: string;
}

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})



export class ConsultasComponent implements OnInit {

  user: any;
  clinic_subdomain: string;
  clinic: Clinic;
  appointments: Appointment[] = [];

  daySelected: number = 1;

  dashes?: Dashes;


  sortedData: Appointment[] = [];
  sortDirection: string = 'asc';

  today = new Date();

  p: number = 1;
  totalItens: number = 10;

  constructor(private dialog: MatDialog, private clinicService: ClinicService, private route: ActivatedRoute, private router: Router) {
    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);

    let url = this.router.url;
    let split = url.split("/");
    this.clinic_subdomain = split[2];

  }

  ngOnInit(): void {
    this.getClinica();

  }

  onKeypressEvent(event: any) {


    this.sortedData = this.appointments.filter(item => {
      if (item.prof_name.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ||
        item.pc_name.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1

      ) {
        return true;
      }
      return false;
    }
    );

  }

  getAppointments(days: number) {
    this.clinicService.selectAppointmentsDays(this.clinic.clinic_id, days).subscribe(
      data => {
        console.log(data);
        this.appointments = data.appointments;

        this.sortedData = this.appointments.slice();

      },
      err => {

      }
    );
  }


  getClinica() {
    this.clinicService.selectClinicByUser(this.user?.user_id, this.clinic_subdomain).subscribe(
      data => {
        console.log(data);
        this.clinic = data.clinic;

        this.getAppointments(this.daySelected);
        this.getDashes()

      },
      err => {

      }
    );
  }

  getDashes() {
    this.clinicService.getDashes(this.clinic.clinic_id).subscribe(
      data => {
        console.log(data);
        this.dashes = data.dashes;

        if (data.refreshToken) {
          localStorage.setItem("clinicToken", data.refreshToken)
        }

      },
      err => {

      }
    );
  }

  days(n: number) {

    console.log(n)

    this.daySelected = n;

    this.getAppointments(this.daySelected);

  }

  ordenacao(tipoOrdenacao: string) {

    const data = this.appointments.slice();

    this.sortedData = data.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      switch (tipoOrdenacao) {
        case 'data':
          return compare(a.date, b.date, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });

    if (this.sortDirection == 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = 'asc';
    }
  }

  addConsult() {
    const dialogRef = this.dialog.open(NovaConsultaComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: true,
      data: {}
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAppointments(this.daySelected);
        this.getDashes();
      }

    });

  }

  editarConsulta(consulta: Appointment) {
    const dialogRef = this.dialog.open(EditarConsultaComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: true,
      data: {
        consulta: consulta,
        clinic: this.clinic,

      }

    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.getProfessionalsClinic();
        // this.getDashes();
      }

    });

  }

  editPagamento(consulta: Appointment) {
    const dialogRef = this.dialog.open(EditarPagamentoComponent, {
      width: '520px',
      maxHeight: '90vh',
      disableClose: true,
      data: consulta
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAppointments(this.daySelected);

      }

    });

  }

  cancelarAgendamento(consulta: Appointment) {
    const dialogRef = this.dialog.open(CancelarConsultaComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: true,
      data: {
        consulta: consulta,
        clinic: this.clinic,

      }

    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAppointments(this.daySelected);
        this.getDashes();
      }

    });

  }

}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}