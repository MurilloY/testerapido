import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';
import * as moment from 'moment';
import { Category } from 'src/app/adm/returns/categories.retunr';
import { Appointment } from 'src/app/clinics/returns/appointment.return';
import { Insurance } from 'src/app/clinics/returns/insurance_by_clinic';
import { environment } from 'src/environments/environment';
import { ReturnCities } from '../../../returns/cities.return';

import { Clinic } from '../../../returns/clinic_by_user.return';
import { FreeTime } from '../../../returns/free_time.return';
import { Agenda, Professionale } from '../../../returns/prof_clinic_cat.return';
import { User } from '../../../returns/user-cpf.return';

import { ClinicService } from '../../../services/clinic.service';
import { ModalConfirmacaoComponent } from './modal-confirmacao/modal-confirmacao.component';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.scss']
})
export class NovaConsultaComponent implements OnInit {

  CadastroPacienteForm: FormGroup;
  dateSelected: Date = new Date();
  etapa: number = 1;
  progress: number = 5;
  modalidade: number = 0;
  especialidade: string = '';
  profissional: number = 0;
  lembreteEnviado: boolean = false;
  user: any;
  professionals: Professionale[];
  professionalSelected: Professionale;
  professionalsAll: Professionale[];
  free_time: FreeTime[];
  free_time_selected?: FreeTime;
  disabledHour = true;
  userAccomp: User;
  userPatient: User;
  photopatient: string = '/assets/images/user.png';

  minDate = new Date()
  categories: Category[];

  buttonsendemail = false;

  clinic: Clinic

  subdomain: string;
  photodefault = true;

  selectedHour: Agenda2 | null = null;

  showErrorCPF: boolean = false;
  errorCPFMsg: string;
  acompanhante: string;
  endereco: string;
  cpfPacient: string;

  showCpf: boolean = true;
  showForm: boolean = false;

  dados?: ReturnCities;
  cities?: string[];

  dadosTitular?: ReturnCities;
  citiesTitular?: string[];

  insurances: Insurance[];

  showErrorCPFTitular: boolean = false;
  showFormTitular: boolean = false;

  app_id: string;

  appointment: Appointment;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NovaConsultaComponent>,
    private clinicService: ClinicService
  ) {

    this.CadastroPacienteForm = new FormGroup({

      user_name: new FormControl('', [Validators.required]),
      birth_data: new FormControl('', [Validators.required]),
      user_rg: new FormControl(),
      user_cpf: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ua_cep: new FormControl('', [Validators.required]),
      user_gender: new FormControl('', [Validators.required]),
      ua_uf: new FormControl('', [Validators.required]),
      ua_city: new FormControl('', [Validators.required]),
      ua_district: new FormControl('', [Validators.required]),
      ua_name_street: new FormControl('', [Validators.required]),
      ua_house_number: new FormControl('', [Validators.required]),
      companion: new FormControl('', [Validators.required]),
      health_plan: new FormControl(),
      user_phone: new FormControl(),
      user_email: new FormControl('', [Validators.email]),
      has_insurance: new FormControl('', [Validators.required]),
      ins_id: new FormControl(),
      //of_age: new FormControl('', [Validators.required]),

      titular_same_address: new FormControl(),
      titular_cpf: new FormControl(),
      titular_name: new FormControl(),
      titular_birthdate: new FormControl(),
      titular_rg: new FormControl(),
      titular_cep: new FormControl(),
      titular_uf: new FormControl(),
      titular_city: new FormControl(),
      titular_district: new FormControl(),
      titular_name_street: new FormControl(),
      titular_house_number: new FormControl(),
      titular_phone: new FormControl(),
      titular_email: new FormControl(),


    });

    this.getJsonCities();


  }

  ngOnInit(): void {
    // document.body.classList.add('body-etapas');

    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);

    let url = this.router.url;
    let split = url.split("/");
    this.subdomain = split[2];

    this.getClinicByUser();

  }

  openAlertDialog() {
    const dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
      data: {
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.lembreteEnviado = true;
      }
    );
  }

  nextStep() {

    if (this.etapa < 8) {
      this.etapa++;
    }

    this.checkStep();

  }

  previousStep() {

    if (this.etapa > 0) {
      this.etapa--;
    }

    this.checkStep();

  }

  previousStepPactient() {

    this.showCpf = true;
    this.showForm = false;
    this.cpfPacient = "";


    this.CadastroPacienteForm.controls['user_name'].setValue(null);
    this.CadastroPacienteForm.controls['birth_data'].setValue(null);
    this.CadastroPacienteForm.controls['user_rg'].setValue(null);
    this.CadastroPacienteForm.controls['user_cpf'].setValue(null);
    this.CadastroPacienteForm.controls['ua_cep'].setValue(null);
    this.CadastroPacienteForm.controls['ua_uf'].setValue(null);
    this.CadastroPacienteForm.controls['ua_city'].setValue(null);
    this.CadastroPacienteForm.controls['ua_district'].setValue(null);
    this.CadastroPacienteForm.controls['ua_name_street'].setValue(null);
    this.CadastroPacienteForm.controls['companion'].setValue(null);
    this.CadastroPacienteForm.controls['health_plan'].setValue(null);
    this.CadastroPacienteForm.controls['ua_house_number'].setValue(null);
    this.CadastroPacienteForm.controls['user_phone'].setValue(null);
    this.CadastroPacienteForm.controls['user_email'].setValue(null);
    this.CadastroPacienteForm.controls['has_insurance'].setValue(null);
    this.CadastroPacienteForm.controls['ins_id'].setValue(null);



    this.CadastroPacienteForm.controls['titular_name'].setValue(null);
    this.CadastroPacienteForm.controls['titular_phone'].setValue(null);
    this.CadastroPacienteForm.controls['titular_email'].setValue(null);
    this.CadastroPacienteForm.controls['titular_same_address'].setValue(null);
    this.CadastroPacienteForm.controls['titular_birthdate'].setValue(null);
    this.CadastroPacienteForm.controls['titular_rg'].setValue(null);
    this.CadastroPacienteForm.controls['titular_cpf'].setValue(null);


    this.CadastroPacienteForm.controls['titular_cep'].setValue(null);
    this.CadastroPacienteForm.controls['titular_uf'].setValue(null);
    this.CadastroPacienteForm.controls['titular_city'].setValue(null);
    this.CadastroPacienteForm.controls['titular_district'].setValue(null);
    this.CadastroPacienteForm.controls['titular_name_street'].setValue(null);
    this.CadastroPacienteForm.controls['titular_house_number'].setValue(null);

    this.previousStep();

  }

  checkStep() {

    console.log('etapa', this.etapa)

    switch (this.etapa) {
      case 2: {
        this.progress = 20;
        break;
      }
      case 3: {
        this.progress = 40;
        break;
      }
      case 4: {
        this.progress = 60;
        break;
      }
      case 5: {
        this.progress = 80;
        break;
      }


      default: {
        this.progress = 0;
        break;
      }
    }

  }

  getJsonCities() {


    this.clinicService.getJSON().subscribe(data => {
      this.dados = data;
      this.dadosTitular = data;

    })

  }

  selectedState(state: string) {

    for (let i = 0; i < this.dados!.estados.length; i++) {         // percorre o array principal

      if (this.dados!.estados[i].sigla == state) {                // pega o estado conforme a seleção                             // mostra o select de cidades escondido
        this.cities = this.dados!.estados[i].cidades;                   // guarda as cidades respectivas
      }
    }


  }

  selectedStateTitular(state: string) {

    for (let i = 0; i < this.dadosTitular!.estados.length; i++) {         // percorre o array principal

      if (this.dadosTitular!.estados[i].sigla == state) {                // pega o estado conforme a seleção                             // mostra o select de cidades escondido
        this.citiesTitular = this.dadosTitular!.estados[i].cidades;                   // guarda as cidades respectivas
      }
    }


  }

  getClinicByUser() {

    this.clinicService.selectClinicByUser(this.user?.user_id, this.subdomain).subscribe(
      data => {

        this.clinic = data.clinic;

        this.getCategories();
        this.getInsurances();


      },
      err => {

      }
    );

  }

  sendReminderAppointment(){

    let phone = (this.appointment.pacient.pc_phone).replace(/[^A-Z0-9]/ig, '')

    let texto = `Olá ${this.appointment.pacient.pc_name}, sua consulta com o Dr(a). ${this.appointment.professional.prof_name} foi agendada para o dia ${moment(this.appointment.appointment.date).format('DD/MM/YYYY')} às ${this.appointment.appointment.start_time}.\nClique no link abaixo para confirmar presença:\n ${environment.url}/agendamento/confirm/${encodeURIComponent(this.appointment.appointment.app_id)}`


    let url = `https://api.whatsapp.com/send?phone=55${phone}&text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank')?.focus();
    

  }

  dateFormat(inputDate: Date) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
  }

  formStep(){


    this.findInvalidControls()

    if (this.CadastroPacienteForm.valid) {
      this.nextStep()
    }
  }


  sendForm() {

    let data = this.CadastroPacienteForm.getRawValue();


    this.findInvalidControls()

    if (this.CadastroPacienteForm.valid) {

      this.buttonsendemail = true

      data.clinic_id = this.clinic.clinic_id;
      data.prof_id = this.professionalSelected.prof_id;
      data.date = this.convertToDb(this.dateSelected);
      data.start_time = this.selectedHour?.start_time;
      data.end_time = this.selectedHour?.end_time;
      data.app_type = this.modalidade;
      data.tp_id = 2;
      data.status = 1;
      data.who = this.user.user_id
      data.user_photo = 'users/user.png';

      console.log(data)

      this.clinicService.insertAppointment(data).subscribe(
        data => {

          let desc = "Agendamento registrado com sucesso."

          this.dialog.open(ConfirmdialogComponent, {
            data: {
              version: 1,
              title: "SUCESSO",
              desc: desc,
              button_confirm: "OK",
              button_cancel: "Cancelar"
            },
          });

          this.finish()

        },
        err => {
          this.buttonsendemail = false
        }
      );

    }
  }


  getAppoitmentById(app_id: string) {

    this.clinicService.getAppointmentById(app_id).subscribe(
      data => {

        console.log(data)

        this.appointment = data.appointment;

        this.nextStep()
      },
      err => {

      }
    );

  }


  getInsurances() {

    this.clinicService.getInsurancesByClinic(this.clinic.clinic_id).subscribe(
      data => {
        console.log(data)
        this.insurances = data.insurances;

      },
      err => {

      }
    );

  }

  handleDOBChange(event: any) {

    this.selectedHour = null
    this.selectedProfessionalSpeciality(3);

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

  onKeypressEventCPFTitular(event: any) {

    let numberCPf = event.target.value;

    if (numberCPf.length == 14) {

      if (cpf.isValid(numberCPf)) {

        if (numberCPf == this.CadastroPacienteForm.controls['user_cpf'].value) {

          this.showErrorCPFTitular = true;
          this.errorCPFMsg = "O CPF do titular não pode ser o mesmo do dependente";

        }
        else {

          this.showErrorCPFTitular = false;

          this.clinicService.getUserCPF(numberCPf).subscribe(data => {

            this.showFormTitular = true;


            this.userAccomp = data.user;

            console.log(data.user)

            this.CadastroPacienteForm.controls['titular_name'].setValue(data.user.user_name);
            this.CadastroPacienteForm.controls['titular_phone'].setValue(data.user.user_phone);
            this.CadastroPacienteForm.controls['titular_email'].setValue(data.user.user_email);
            this.CadastroPacienteForm.controls['titular_birthdate'].setValue(data.user.birth_data);
            this.CadastroPacienteForm.controls['titular_rg'].setValue(data.user.user_rg);
            this.CadastroPacienteForm.controls['titular_cpf'].setValue(data.user.user_cpf);
            this.CadastroPacienteForm.controls['titular_cep'].setValue(data.user.address.ua_cep);
            this.CadastroPacienteForm.controls['titular_uf'].setValue(data.user.address.ua_uf);

            this.selectedStateTitular(data.user.address.ua_uf);

            this.CadastroPacienteForm.controls['titular_city'].setValue(data.user.address.ua_city);
            this.CadastroPacienteForm.controls['titular_district'].setValue(data.user.address.ua_district);
            this.CadastroPacienteForm.controls['titular_name_street'].setValue(data.user.address.ua_name_street);
            this.CadastroPacienteForm.controls['titular_house_number'].setValue(data.user.address.ua_house_number);





          })

        }


      }
      else {
        this.showErrorCPFTitular = true;
        this.errorCPFMsg = "CPF inválido";
      }
    }
    else {
      this.showErrorCPFTitular = true;
      this.showFormTitular = false;
      this.errorCPFMsg = "Digite um CPF válido";

      this.CadastroPacienteForm.controls['titular_name'].setValue(null);
      this.CadastroPacienteForm.controls['titular_phone'].setValue(null);
      this.CadastroPacienteForm.controls['titular_email'].setValue(null);
      this.CadastroPacienteForm.controls['titular_same_address'].setValue(null);
      this.CadastroPacienteForm.controls['titular_birthdate'].setValue(null);
      this.CadastroPacienteForm.controls['titular_rg'].setValue(null);
      // this.CadastroPacienteForm.controls['titular_cpf'].setValue(null);
      this.CadastroPacienteForm.controls['titular_cep'].setValue(null);
      this.CadastroPacienteForm.controls['titular_uf'].setValue(null);


      this.CadastroPacienteForm.controls['titular_city'].setValue(null);
      this.CadastroPacienteForm.controls['titular_district'].setValue(null);
      this.CadastroPacienteForm.controls['titular_name_street'].setValue(null);
      this.CadastroPacienteForm.controls['titular_house_number'].setValue(null);
    }
  }



  radioChangeOfAge(event: MatRadioChange) {
    if (event.value == '1') {

      this.CadastroPacienteForm.controls['companion'].setValue('1');
      this.CadastroPacienteForm.controls['companion'].disable();
    }
    else {
      this.CadastroPacienteForm.controls['companion'].enable();
    }
  }

  radioChangeInsurance(event: MatRadioChange) {
    if (event.value == '1') {

      this.CadastroPacienteForm.controls['ins_id'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['ins_id'].updateValueAndValidity();
    }
    else {
      this.CadastroPacienteForm.controls['ins_id'].setValidators(null);
      this.CadastroPacienteForm.controls['ins_id'].updateValueAndValidity();
    }
  }

  radioChangeTitularAddress(event: MatRadioChange) {

    if (event.value == '0') {

      this.CadastroPacienteForm.controls['titular_cep'].setValue(null);
      this.CadastroPacienteForm.controls['titular_uf'].setValue(null);
      this.CadastroPacienteForm.controls['titular_city'].setValue(null);
      this.CadastroPacienteForm.controls['titular_district'].setValue(null);
      this.CadastroPacienteForm.controls['titular_name_street'].setValue(null);
      this.CadastroPacienteForm.controls['titular_house_number'].setValue(null);


      this.CadastroPacienteForm.controls['titular_cep'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_cep'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_uf'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_uf'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_city'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_city'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_district'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_district'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_name_street'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_name_street'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_house_number'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_house_number'].updateValueAndValidity();

    }
    else {

      this.CadastroPacienteForm.controls['titular_cep'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_cep'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_uf'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_uf'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_city'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_city'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_district'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_district'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_name_street'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_name_street'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_house_number'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_house_number'].updateValueAndValidity();


    }

  }

  radioChangeTitular(event: MatRadioChange) {

    if (event.value == '0') {

      this.CadastroPacienteForm.controls['titular_name'].setValue(null);
      this.CadastroPacienteForm.controls['titular_phone'].setValue(null);
      this.CadastroPacienteForm.controls['titular_email'].setValue(null);
      this.CadastroPacienteForm.controls['titular_same_address'].setValue(null);
      this.CadastroPacienteForm.controls['titular_birthdate'].setValue(null);
      this.CadastroPacienteForm.controls['titular_rg'].setValue(null);
      this.CadastroPacienteForm.controls['titular_cpf'].setValue(null);


      this.CadastroPacienteForm.controls['titular_cep'].setValue(null);
      this.CadastroPacienteForm.controls['titular_uf'].setValue(null);
      this.CadastroPacienteForm.controls['titular_city'].setValue(null);
      this.CadastroPacienteForm.controls['titular_district'].setValue(null);
      this.CadastroPacienteForm.controls['titular_name_street'].setValue(null);
      this.CadastroPacienteForm.controls['titular_house_number'].setValue(null);


      //Validators
      this.CadastroPacienteForm.controls['titular_name'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_name'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_phone'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_phone'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_email'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_email'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_same_address'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_same_address'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_birthdate'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_birthdate'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_rg'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_rg'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_cpf'].setValidators(null)
      this.CadastroPacienteForm.controls['titular_cpf'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_cep'].setValidators(null)
      this.CadastroPacienteForm.controls['titular_cep'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_uf'].setValidators(null);
      this.CadastroPacienteForm.controls['titular_uf'].updateValueAndValidity();


    }
    else {

      //Validators
      this.CadastroPacienteForm.controls['titular_name'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_name'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_phone'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_phone'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_email'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_email'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_same_address'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_same_address'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_birthdate'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_birthdate'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_rg'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_rg'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_cpf'].setValidators(Validators.required)
      this.CadastroPacienteForm.controls['titular_cpf'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_cep'].setValidators(Validators.required)
      this.CadastroPacienteForm.controls['titular_cep'].updateValueAndValidity();
      this.CadastroPacienteForm.controls['titular_uf'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['titular_uf'].updateValueAndValidity();

    }

    console.log(event.value);
  }

  onKeypressEventCPF(event: any) {

    let numberCPf = event.target.value;

    if (numberCPf.length == 14) {

      if (cpf.isValid(numberCPf)) {
        this.showErrorCPF = false;
        

        this.clinicService.getUserorPacientclinicCPF(this.clinic.clinic_id, numberCPf).subscribe(data => {
          this.showCpf = false;
          this.showForm = true

          if ('user' in data) {
            this.photopatient = data.user.user_photo
            this.CadastroPacienteForm.controls['user_name'].setValue(data.user.user_name);
            this.CadastroPacienteForm.controls['user_email'].setValue(data.user.user_email);
            this.CadastroPacienteForm.controls['user_phone'].setValue(data.user.user_phone);
            this.CadastroPacienteForm.controls['birth_data'].setValue(data.user.birth_data);
            this.CadastroPacienteForm.controls['user_rg'].setValue(data.user.user_rg);
            this.CadastroPacienteForm.controls['user_cpf'].setValue(data.user.user_cpf);
            this.CadastroPacienteForm.controls['ua_cep'].setValue(data.user.address.ua_cep);
            this.CadastroPacienteForm.controls['ua_uf'].setValue(data.user.address.ua_uf);
            this.CadastroPacienteForm.controls['user_gender'].setValue(data.user.user_gender);
            this.CadastroPacienteForm.controls['companion'].setValue(data.user.companion === null? '0' : '1')

            this.selectedState(data.user.address.ua_uf);

            this.CadastroPacienteForm.controls['ua_city'].setValue(data.user.address.ua_city);
            this.CadastroPacienteForm.controls['ua_district'].setValue(data.user.address.ua_district);
            this.CadastroPacienteForm.controls['ua_name_street'].setValue(data.user.address.ua_name_street);
            this.CadastroPacienteForm.controls['ua_house_number'].setValue(data.user.address.ua_house_number);

            if (data.user.companion != null) {
              this.showFormTitular = true
            
              this.CadastroPacienteForm.controls['titular_cpf'].setValue(data.user.companion.user_cpf);
              this.CadastroPacienteForm.controls['titular_name'].setValue(data.user.companion.user_name);
              this.CadastroPacienteForm.controls['titular_birthdate'].setValue(data.user.companion.birth_data);
              this.CadastroPacienteForm.controls['titular_rg'].setValue(data.user.companion.user_rg);
              this.CadastroPacienteForm.controls['titular_phone'].setValue(data.user.companion.user_phone);
              this.CadastroPacienteForm.controls['titular_email'].setValue(data.user.companion.user_email);
            
              this.selectedStateTitular(data.user.companion.address.ua_uf);
            
              this.CadastroPacienteForm.controls['titular_same_address'].setValue(data.user);
              this.CadastroPacienteForm.controls['titular_cep'].setValue(data.user.companion.address.ua_cep);
              this.CadastroPacienteForm.controls['titular_uf'].setValue(data.user.companion.address.ua_uf);
              this.CadastroPacienteForm.controls['titular_city'].setValue(data.user.companion.address.ua_city);
              this.CadastroPacienteForm.controls['titular_district'].setValue(data.user.companion.address.ua_district);
              this.CadastroPacienteForm.controls['titular_name_street'].setValue(data.user.companion.address.ua_name_street);
              this.CadastroPacienteForm.controls['titular_house_number'].setValue(data.user.companion.address.ua_house_number);
            }


            
          } else { // paciente da clinica
            this.photopatient = data.patient_clinic.user_photo
            console.log(data.patient_clinic.ins_id)
            this.CadastroPacienteForm.controls['user_name'].setValue(data.patient_clinic.user_name);
            this.CadastroPacienteForm.controls['user_email'].setValue(data.patient_clinic.user_email);
            this.CadastroPacienteForm.controls['user_phone'].setValue(data.patient_clinic.user_phone);
            this.CadastroPacienteForm.controls['birth_data'].setValue(data.patient_clinic.birth_data);
            this.CadastroPacienteForm.controls['user_rg'].setValue(data.patient_clinic.user_rg);
            this.CadastroPacienteForm.controls['user_cpf'].setValue(data.patient_clinic.user_cpf);
            this.CadastroPacienteForm.controls['ua_cep'].setValue(data.patient_clinic.ua_cep);
            this.CadastroPacienteForm.controls['ua_uf'].setValue(data.patient_clinic.ua_uf);
            this.CadastroPacienteForm.controls['user_gender'].setValue(data.patient_clinic.gender);

            this.selectedState(data.patient_clinic.ua_uf);

            this.CadastroPacienteForm.controls['ua_city'].setValue(data.patient_clinic.ua_city);
            this.CadastroPacienteForm.controls['ua_district'].setValue(data.patient_clinic.ua_district);
            this.CadastroPacienteForm.controls['ua_name_street'].setValue(data.patient_clinic.ua_name_street);
            this.CadastroPacienteForm.controls['ua_house_number'].setValue(data.patient_clinic.ua_house_number);
            this.CadastroPacienteForm.controls['has_insurance'].setValue(data.patient_clinic.ins_id === null? '0' : '1');
            this.CadastroPacienteForm.controls['ins_id'].setValue(data.patient_clinic.ins_id);
            this.CadastroPacienteForm.controls['companion'].setValue(data.patient_clinic.companion === null? '0' : '1')
            
            // TITULAR
            
            if (data.patient_clinic.companion != null) {
              this.showFormTitular = true
            
              this.CadastroPacienteForm.controls['titular_cpf'].setValue(data.patient_clinic.companion.user_cpf);
              this.CadastroPacienteForm.controls['titular_name'].setValue(data.patient_clinic.companion.user_name);
              this.CadastroPacienteForm.controls['titular_birthdate'].setValue(data.patient_clinic.companion.birth_data);
              this.CadastroPacienteForm.controls['titular_rg'].setValue(data.patient_clinic.companion.user_rg);
              this.CadastroPacienteForm.controls['titular_phone'].setValue(data.patient_clinic.companion.user_phone);
              this.CadastroPacienteForm.controls['titular_email'].setValue(data.patient_clinic.companion.user_email);
            
              this.selectedStateTitular(data.patient_clinic.companion.address.ua_uf);
            
              this.CadastroPacienteForm.controls['titular_same_address'].setValue('0');
              this.CadastroPacienteForm.controls['titular_cep'].setValue(data.patient_clinic.companion.address.ua_cep);
              this.CadastroPacienteForm.controls['titular_uf'].setValue(data.patient_clinic.companion.address.ua_uf);
              this.CadastroPacienteForm.controls['titular_city'].setValue(data.patient_clinic.companion.address.ua_city);
              this.CadastroPacienteForm.controls['titular_district'].setValue(data.patient_clinic.companion.address.ua_district);
              this.CadastroPacienteForm.controls['titular_name_street'].setValue(data.patient_clinic.companion.address.ua_name_street);
              this.CadastroPacienteForm.controls['titular_house_number'].setValue(data.patient_clinic.companion.address.ua_house_number);
            }
          }
        },
          err => {

            if (err.status == 404) {

              this.showCpf = false;
              this.showForm = true;
              this.showErrorCPF = false;

              this.CadastroPacienteForm.controls['user_cpf'].setValue(numberCPf);

            }

            if (err.status == 400) {

              this.showCpf = true;
              this.showForm = false;
              this.showErrorCPF = true;
              this.errorCPFMsg = err.error.message;

            }



          })

      }
      else {
        this.showErrorCPF = true;
        this.errorCPFMsg = "CPF inválido"
      }

    }
    // else {
    //   this.showErrorCPF = true;
    //   this.errorCPFMsg = "Digite um CPF"
    // }

  }


  selectedProfessionalSpeciality(step: number) {

    this.clinicService.getProfessionalByCategory(this.clinic.clinic_id, this.especialidade, this.convertToDb(this.dateSelected), this.modalidade).subscribe(
      data => {

        console.log(data)

        this.professionals = data.professionales;
        this.professionalsAll = data.professionales;

        if (step == 2) {
          this.nextStep();
        }

      },
      err => {

      }
    );
  }


  getCategories() {

    this.clinicService.getCategoriesByClinic(this.clinic.clinic_id).subscribe(
      data => {

        this.categories = data.categories;


      },
      err => {

      }
    );

  }

  selectProfessional(prof: Professionale) {

    this.professionalSelected = prof;

    this.clinicService.getProfessionalFreeTime(this.clinic.clinic_id, this.professionalSelected.prof_id, this.convertToDb(this.dateSelected), this.modalidade).subscribe(
      data => {

        console.log(data)

        this.free_time = data.free_time;

        this.nextStep()
      },
      err => {

      }
    );

  }


  // selectHour() {

  //   if (
  //     (this.startAppointment >= this.free_time_selected?.start_time! && this.startAppointment < this.free_time_selected?.end_time!)
  //     &&
  //     (this.endAppointment <= this.free_time_selected?.end_time! && this.endAppointment > this.free_time_selected?.start_time!)
  //     &&
  //     (this.endAppointment > this.startAppointment)) {
  //     console.log('ok')
  //     this.nextStep();
  //   }
  //   else {
  //     console.log('erro')
  //   }



  // }


  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
  }

  onValChange(value: any) {
    this.disabledHour = false;
    console.log(this.free_time[value])

    this.free_time_selected = this.free_time[value]
  }

  convertToDb(date: Date) {
    return date.toISOString().split('T')[0]
  }

  finish() {
    this.dialogRef.close(true);
  }

  howToGet(lat_lng:string) {
    window.open(`http://www.google.com/maps/place/${lat_lng}`);

  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.CadastroPacienteForm.controls[controlName].hasError(errorName);
  }

  toggleSelection(item: Agenda, index: number): void {

    if(item.available){
      if (this.selectedHour?.hour === item.hour){
        this.selectedHour = null
      }
      else{
        this.selectedHour = { available: item.available,  hour: item.hour,  index: index, start_time: item.start_time, end_time: item.end_time}
      }
    }
   
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.CadastroPacienteForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid);
  }
}

interface Agenda2 {
  hour: string
  start_time: string
  end_time: string
  available: boolean,
  index?: number
}
