import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';

@Component({
  selector: 'app-visualizar-receituario',
  templateUrl: './visualizar-receituario.component.html',
  styleUrls: ['./visualizar-receituario.component.scss']
})
export class VisualizarReceituarioComponent implements OnInit {

  pre_id: string;
  pre_date: string
  pre_desc: string
  app_id: string


  app_type_name: string;
  clinic_name: string;
  clinic_cnpj: string;
  clinic_phone: string;
  clinic_address: string;
  clinic_number: string;
  clinic_cep: string;
  pc_name: string;
  pc_cpf: string;
  prof_name: string;
  cat_name: string;
  rt_number: string;
  token: string


  constructor(private appointmentService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.token = data.token
      this.pre_id = data.pre_id
      this.app_id = data.app_id

    if (this.pre_id != null) {
      this.getPrescriptionById()
    }else {
      this.pre_date = moment.utc(data.pre_date).format('DD/MM/YYYY')
      this.pre_desc = data.pre_desc
      this.getAppointment()
    }
  }

  ngOnInit(): void {
  }

  getPrescriptionById() {
    this.appointmentService.getPrescriptionById(this.pre_id, this.token).subscribe(
      data => {

        this.clinic_name = data.prescriptions.clinic.clinic_name
        this.clinic_cnpj = data.prescriptions.clinic.clinic_cnpj
        this.clinic_phone = data.prescriptions.clinic.clinic_phone
        this.clinic_address = data.prescriptions.clinic.clinic_address
        this.clinic_number = data.prescriptions.clinic.clinic_number
        this.clinic_cep = data.prescriptions.clinic.clinic_cep
        this.pc_name = data.prescriptions.paciente.pc_name
        this.pc_cpf = data.prescriptions.paciente.pc_cpf
        this.prof_name = data.prescriptions.professional.prof_name
        this.rt_number = data.prescriptions.professional.rt_number
        this.app_type_name = data.prescriptions.appointment.app_type_name
        this.pre_date = data.prescriptions.pre_date
        this.pre_desc = data.prescriptions.pre_desc
        this.cat_name = data.prescriptions.professional.cat_name

      },
      err => {

      }
    );
  }

  getAppointment() {
    this.appointmentService.getAppointment(this.app_id, this.token).subscribe(
      data => {
        
        this.clinic_name = data.appointment.professional.clinic_name
        this.clinic_cnpj = data.appointment.professional.clinic_cnpj
        this.clinic_phone = data.appointment.professional.clinic_phone
        this.clinic_address = data.appointment.professional.clinic_address
        this.clinic_number = data.appointment.professional.clinic_number
        this.clinic_cep = data.appointment.professional.clinic_cep
        this.pc_name = data.appointment.pacient.pc_name
        this.pc_cpf = data.appointment.pacient.pc_cpf
        this.prof_name = data.appointment.professional.prof_name
        this.rt_number = data.appointment.professional.rt_number
        this.app_type_name = data.appointment.appointment.app_type_name
        this.cat_name = data.appointment.professional.cat_name

        

      },
      err => {

      }
    );
  }
  

}
