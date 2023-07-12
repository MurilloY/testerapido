import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { ProfessionalService } from 'src/app/professional/services/professional.service';

@Component({
  selector: 'app-visualizar-atestado',
  templateUrl: './visualizar-atestado.component.html',
  styleUrls: ['./visualizar-atestado.component.scss']
})
export class VisualizarAtestadoComponent implements OnInit {

  cert_id: string;
  app_id: string;

  pre_date: string
  pre_desc: string

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


  @ViewChild('myDiv') myDiv: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private professionalService: ProfessionalService, ) {

    this.cert_id = data.cert_id
    this.app_id = data.app_id

    if (this.cert_id != null) {
      this.getCertificateById()
    }else {
      this.pre_date = moment.utc(data.pre_date).format('DD/MM/YYYY')

      console.log(data)

      this.pre_desc = data.pre_desc
      this.getAppointment()
    }

   }

  ngOnInit(): void {
  }

  getCertificateById() {
    this.professionalService.getCertificateById(this.cert_id).subscribe(
      data => {

        this.clinic_name = data.certificate.clinic.clinic_name
        this.clinic_cnpj = data.certificate.clinic.clinic_cnpj
        this.clinic_phone = data.certificate.clinic.clinic_phone
        this.clinic_address = data.certificate.clinic.clinic_address
        this.clinic_number = data.certificate.clinic.clinic_number
        this.clinic_cep = data.certificate.clinic.clinic_cep
        this.pc_name = data.certificate.paciente.pc_name
        this.pc_cpf = data.certificate.paciente.pc_cpf
        this.prof_name = data.certificate.professional.prof_name
        this.app_type_name = data.certificate.appointment.app_type_name
        this.pre_date = data.certificate.cert_date
        this.pre_desc = data.certificate.cert_desc
        this.cat_name = data.certificate.professional.cat_name
        this.rt_number = data.certificate.professional.rt_number


        

      },
      err => {

      }
    );
  }

  getAppointment() {
    this.professionalService.getAppointment(this.app_id).subscribe(
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
