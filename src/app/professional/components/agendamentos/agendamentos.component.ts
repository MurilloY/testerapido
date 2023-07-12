import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from 'src/app/adm/returns/clinic.return';
import { EditarConsultaComponent } from 'src/app/clinics/components/consultas/editar-consulta/editar-consulta.component';
import { Appointment, Pacient } from '../../returns/appointments_prof.return';
import { Dashes } from '../../returns/dash_professional.return';
import { ProfessionalService } from '../../services/professional.service';
import { CancelarAgendamentoComponent } from './cancelar-agendamento/cancelar-agendamento.component';
import { RoutepreviousService } from '../../services/routeprevious.service';

export interface Lista {
  nome: string;
  paciente: string;
  data: string;
  status: string;
}

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss']
})
export class AgendamentosComponent implements OnInit {

  user: any;
  appointments: Appointment[] = [];
  scheduled: number = 0;
  closed: number = 0
  hoje: Date = new Date();
  clinic: Clinic;
  clinic_subdomain: string;



  mode: number | null;

  daySelected: number = 1;

  dashes?: Dashes;


  sortedData: Appointment[] = [];
  sortDirection: string = 'asc';

  today = new Date();

  p: number = 1;
  totalItens: number = 10;

  constructor(private dialog: MatDialog, private professionalService: ProfessionalService, private route: ActivatedRoute, 
    private router: Router,
    private routepreviousService: RoutepreviousService) {
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);


  }

  ngOnInit(): void {
    this.getProfAppointments(this.daySelected)

  }


  getProfAppointments(days: number) {
    this.professionalService.getAppointmentsByProfId(this.user.prof_id, days).subscribe(
      data => {

        this.appointments = data.appointments
        console.log(data)
        this.sortedData = this.appointments.slice();
        this.getDashes()

      },
      err => {

      }
    );
  }

  getClinica() {
    this.professionalService.selectClinicByUser(this.user?.user_id, this.clinic_subdomain).subscribe(
      data => {
        console.log(data);
        this.clinic = data.clinic;

        this.getProfAppointments(this.daySelected);
        this.getDashes()

      },
      err => {

      }
    );
  }

  days(n: number) {

    console.log(n)

    this.daySelected = n;

    this.getProfAppointments(this.daySelected);

  }

  calculateAge(date: string) {
    var diff_ms = Date.now() - new Date(date).getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  onKeypressEvent(event: any) {


    this.sortedData = this.appointments.filter(item => {
      if (item.pacient.pc_name.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
      ) {
        return true;
      }
      return false;
    }
    );

  }

  getBackgroundColor(appointment: any) {
    const statusName = appointment.status_name;
    const appTypeName = appointment.app_type_name;
    const appointmentDateTime = new Date(appointment.date + " " + appointment.end_time);
    const now = new Date();


    if (statusName === 'Cancelado' || statusName === 'Encerrado' || appTypeName === 'Atendimento Presencial' || (appointmentDateTime < now)) {
      return '#CCC'; // cinza
    } else {
      return '#FF2252'; // vermelho
    }
  }

  isButtonDisabled(appointment: any) {
    const statusName = appointment.status_name;
    const appTypeName = appointment.app_type_name;
    const appointmentDateTime = new Date(appointment.date + " " + appointment.end_time);
    const now = new Date();

    return (statusName === 'Cancelado' || statusName === 'Encerrado' || appTypeName === 'Atendimento Presencial' || (appointmentDateTime < now));
}


  getDashes() {
    this.professionalService.getDashesProfessional(this.user.prof_id).subscribe(
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

  // days(n: number) {

  //   console.log(n)

  //   this.daySelected = n;

  //   this.getAppointments(this.daySelected);

  // }

  ordenacao(tipoOrdenacao: string) {

    const data = this.appointments.slice();

    this.sortedData = data.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      switch (tipoOrdenacao) {
        case 'data':
          return compare(a.appointment.date, b.appointment.date, isAsc);
        case 'status':
          return compare(a.appointment.status_name, b.appointment.status_name, isAsc);
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

  cancelarAgendamento(consulta: Appointment) {
    console.log(consulta)
    const dialogRef = this.dialog.open(CancelarAgendamentoComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        consulta: consulta,

      }

    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getProfAppointments(this.daySelected);
        this.getDashes();
      }

    });

  }


  editarConsulta(consulta: Appointment) {
    const dialogRef = this.dialog.open(EditarConsultaComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: true,
      data: {
        consulta: consulta

      }

    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.getProfessionalsClinic();
        // this.getDashes();
      }

    });

  }


  openLink(url: string): void {
    window.open(url, '_blank');
  }

  prontuario(app_id: string, pc_id: string) {

    this.router.navigate([`profissional/agendamento/${app_id}/paciente/${pc_id}/anamnese`])
    this.routepreviousService.changeMessage("1")


  }




}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}