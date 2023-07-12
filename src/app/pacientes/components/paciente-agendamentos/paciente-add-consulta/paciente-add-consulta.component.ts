import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'src/app/pacientes/returns/appointments_return';
import { Categories } from 'src/app/pacientes/returns/categories_online_return';
import { Category } from 'src/app/pacientes/returns/categories_return';
import { FreeTime } from 'src/app/pacientes/returns/free_times_return';
import { City } from 'src/app/pacientes/returns/pacient_clinics_cities_return';
import { Professionale } from 'src/app/pacientes/returns/prof_clinic_by_cat_return';
import { Professional } from 'src/app/pacientes/returns/professionalsbycity_return';
import { PacientesService } from 'src/app/pacientes/services/pacientes.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { PatientClinic } from 'src/app/pacientes/returns/pacientclinic_cpf_return';
import { Holder } from 'src/app/pacientes/returns/holders_return';


@Component({
  selector: 'app-paciente-add-consulta',
  templateUrl: './paciente-add-consulta.component.html',
  styleUrls: ['./paciente-add-consulta.component.scss']
})
export class PacienteAddConsultaComponent implements OnInit {

  progress: number = 6;
  etapa: number = 1;
  modalidade: number = 0;
  type: number = 0;
  especialidade: string = '';
  selectedCat: string;
  selectedClinic: string;
  titular: number = 0;
  showCpf: boolean = true;
  showErrorCPF: boolean = false;
  errorCPFMsg: string;
  cpfPacient: string;


  buttonsendemail = false;
  app_id: string;
  appointment: Appointment;
  pacientclinic: PatientClinic;
  holders: Holder[];



  categories: Category[];
  cities: City[];
  selectedCity: string;
  selectedHolders: string;
  categoriesonline: Categories[];
  professionals: Professionale[];
  professionalsAll: Professionale[] = [];

  professionalsAgenda: Professionale[];

  professional: Professional[];
  free_time: FreeTime[];
  free_time_selected?: FreeTime;
  disabledHour = true;
  lembreteEnviado: boolean = false;


  startAppointment: string;
  endAppointment: string;


  user?: any;



  minDate = new Date()
  dateSelected: Date = new Date();
  professionalSelected: Professionale;




  constructor(
    public dialogRef: MatDialogRef<PacienteAddConsultaComponent>,
    private pacientService: PacientesService
  ) {
    this.user = JSON.parse(localStorage.getItem("UserPacientObject")!);
    console.log(this.user)
    

  }

  ngOnInit(): void {
    this.getClinicsCities()
  }

  howToGet(lat_lng:string) {
    window.open(`http://www.google.com/maps/place/${lat_lng}`);

  }

  // sendReminderAppointment(){

  //   let phone = (this.user.user_phone).replace(/[^A-Z0-9]/ig, '')

  //   let texto = `Olá ${this.appointment.pacient.pc_name}, sua consulta com o Dr(a). ${this.appointment.professional.prof_name} foi agendada para o dia ${moment(this.appointment.appointment.date).format('DD/MM/YYYY')} às ${this.appointment.appointment.start_time}.\nClique no link abaixo para confirmar presença:\n ${environment.url}/agendamento/confirm/${encodeURIComponent(this.appointment.appointment.app_id)}`


  //   let url = `https://api.whatsapp.com/send?phone=55${phone}&text=${encodeURIComponent(texto)}`;
  //   window.open(url, '_blank')?.focus();
    

  // }

  finish() {
    this.dialogRef.close(true);
  }

  onValChange(value: any) {
    this.disabledHour = false;
    console.log(this.free_time[value])

    this.free_time_selected = this.free_time[value]
  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  onKeypressEvent(event: any) {


    this.professionals = this.professionalsAll.filter(item => {
      if (item.user_name.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    );

  }

  getClinicsCities() {
    this.pacientService.getClinicCities().subscribe(
      data => {
        this.cities = data.cities

      },
      err => {

      }
    );
  }

  getHolders() {
    this.pacientService.getHolders(this.user.user_id, this.pacientclinic.clinic_id).subscribe(
      data => {
        this.holders = data.holders
        console.log(this.holders)
        console.log(this.user.user_id)
        console.log(this.selectedClinic)
      }
    )
  }

  previousStep() {

    if (this.etapa > 0) {
      this.etapa--;
    }

    this.checkStep();

  }

  convertToDb(date: Date) {
    return date.toISOString().split('T')[0]
  }

  selectedProfessionalSpeciality() {

    if (this.modalidade == 1) {
      this.pacientService.getProfessionalByCategory(this.selectedCat, this.selectedCity, this.convertToDb(this.dateSelected)).subscribe(
        data => {

          console.log(data)

          this.professionalsAgenda = data.professionales;
          this.professionalsAll = data.professionales;


        },
        err => {

        }
      );
    }
  }

  selectedTypeAppointment() {
    if (this.type == 1) {
      this.pacientclinic
    }
  }

  selectProfessional(prof: Professionale) {

    this.professionalSelected = prof;

    this.pacientService.getProfessionalFreeTime(prof.clinic.clinic_id, prof.prof_id, this.convertToDb(this.dateSelected), this.modalidade).subscribe(
      data => {

        console.log(data)

        this.free_time = data.free_time;
        this.getPacientClinic()
        

        this.nextStep()
      },
      err => {

      }
    );

  }

  sendForm() {

    interface Appointment {
      user_id: string;
      user_cpf: string;
      prof_id: string;
      pc_id: string;
      date: string;
      start_time: string;
      end_time: string;
      status: number;
      app_type: number;
      tp_id: number;
      clinic_id: string;
      who: string;
    }

    let data: Appointment = {} as Appointment;

    this.buttonsendemail = true

    data.user_id = this.user.user_id
    data.user_cpf = this.pacientclinic.user_cpf
    data.prof_id = this.professionalSelected.prof_id;
    data.pc_id = this.pacientclinic.pc_id
    data.date = this.convertToDb(this.dateSelected);
    data.start_time = this.startAppointment;
    data.end_time = this.endAppointment;
    data.status = 1;
    data.app_type = this.modalidade;
    data.tp_id = 2;
    data.clinic_id = this.professionalSelected.clinic.clinic_id;
    data.who = this.user.user_id

    console.log(data)

    this.pacientService.insertAppointment(data).subscribe(
      data => {

        this.buttonsendemail = false
        this.app_id = data.app_id;
        // this.getAppoitmentById(this.app_id);
        this.finish()

      },
      err => {
        this.buttonsendemail = false
      }
    );

  }

  getAppoitmentById(app_id: string) {

    this.pacientService.getAppointmentById(app_id).subscribe(
      data => {

        console.log(data)

        this.appointment = data.appointment;

        this.nextStep()
      },
      err => {

      }
    );

  }

  getPacientClinic() {
    this.pacientService.getPacientClinic(this.professionalSelected.clinic.clinic_id, this.user.user_cpf).subscribe(
      data => {
        this.pacientclinic = data.patient_clinic
        console.log(this.pacientclinic)
      }
    )
  }



  selectHour() {

    if (
      (this.startAppointment >= this.free_time_selected?.start_time! && this.startAppointment < this.free_time_selected?.end_time!)
      &&
      (this.endAppointment <= this.free_time_selected?.end_time! && this.endAppointment > this.free_time_selected?.start_time!)
      &&
      (this.endAppointment > this.startAppointment)) {
      console.log('ok')
      this.nextStep();
    }
    else {
      console.log('erro')
    }



  }

  getCategories() {

    if (this.modalidade == 1) {
      this.pacientService.getCategoriesByClinic(this.selectedCity).subscribe(
        data => {
          this.categories = data.categories;

          console.log(this.categories)
        },
        err => {

        }
      );
    } else if (this.modalidade == 2) {
      this.pacientService.getCategoriesByClinicOnline().subscribe(
        data => {
          this.categoriesonline = data.categories;
        },
        err => {

        }
      );
    }
  }

  getProfessionals() {

    if (this.modalidade == 1) {
      this.pacientService.getProfessionalsByCity(this.selectedCity, this.selectedCat).subscribe(
        data => {
          this.professional = data.professionals
          console.log(this.professionals)
        },
        err => {

        }
      );
    } else if (this.modalidade == 2) {
      this.pacientService.getCategoriesByClinicOnline().subscribe(
        data => {
          this.categoriesonline = data.categories;
        },
        err => {

        }
      );
    }
  }

  handleDOBChange(event: any) {


    this.selectedProfessionalSpeciality();

  }

  nextStep() {

    if (this.etapa < 8) {
      this.etapa++;
    }

    this.checkStep();

  }

  checkStep() {

    console.log('etapa', this.etapa)

    switch (this.etapa) {
      case 2: {
        this.progress = 15;
        this.selectedCity
        console.log(this.type)
        console.log(this.selectedCity)
        break;
      }
      case 3: {
        this.progress = 30;
        this.selectedCat
        break;
      }
      case 4: {
        this.progress = 45;
        this.selectedHolders;
        console.log(this.selectedCity)
        break;
      }
      case 5: {
        this.progress = 60;
        break;
      }
      case 6: {
        this.progress = 80;
        break;
      }


      default: {
        this.progress = 0;
        break;
      }
    }

  }

}
