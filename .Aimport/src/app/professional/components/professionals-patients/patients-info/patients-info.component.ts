import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/professional/returns/appointments_by_pc_prof';
import { PatientClinic } from 'src/app/professional/returns/pacient_clinic_return';
import { Pacient } from 'src/app/professional/returns/pacients_by_prof';
import { ProfessionalService } from 'src/app/professional/services/professional.service';
import { RoutepreviousService } from 'src/app/professional/services/routeprevious.service';


@Component({
  selector: 'app-patients-info',
  templateUrl: './patients-info.component.html',
  styleUrls: ['./patients-info.component.scss']
})
export class PatientsInfoComponent implements OnInit {

  showMenu: boolean = false;
  pc_id: string
  user_id: string
  pacient?: PatientClinic
  totalItens: number = 4;
  p: number = 1;

  appointments: Appointment[];
  sortedData: Appointment[] = []

  prof_id: string
  user?: any;
  app_id: string
  previousUrl: string



  constructor(private router: Router, private professionalService: ProfessionalService, 
    private route: ActivatedRoute,
    private routepreviousService: RoutepreviousService) {
    const previousUrl = this.router.routerState.snapshot.url;
    console.log(previousUrl);
    document.body.classList.add('body-etapas');
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    this.prof_id = this.user['prof_id']
    this.route.params.subscribe(params => {
      console.log(params)
      this.pc_id = params['pc_id'];


    });

  }

  ngOnInit(): void {
    this.getPatient()
    this.previousUrl = this.router.url;

  }

  backRoute() {
    this.router.navigate([`profissional/pacientes`])


  }

  visualizarProntuario(item: any) {
    this.router.navigate([`profissional/agendamento/${item.appointment.app_id}/paciente/${this.pc_id}/anamnese`])
    this.routepreviousService.changeMessage("2")

  }
  

  calculateAge(date: string) {
    var diff_ms = Date.now() - new Date(date).getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  getPatient() {
    this.professionalService.getPacientClinic(this.pc_id).subscribe(
      data => {
        this.pacient = data.patient_clinic;
        this.user_id = data.patient_clinic.user_id
        this.getAppointmentsByProfAndPac()

      },
      err => {

      }
    );
  }

  getAppointmentNumber(idx: number): number {
    return (this.p - 1) * this.totalItens + idx + 1;
  }

  getAppointmentsByProfAndPac() {
    this.professionalService.getAppointmentByProfAndPac(this.prof_id, this.user_id).subscribe(
      data => {
        this.appointments = data.appointments;
        this.sortedData = data.appointments

      },
      err => {

      }
    );
  }



}
