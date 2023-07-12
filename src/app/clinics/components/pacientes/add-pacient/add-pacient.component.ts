import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { cpf } from 'cpf-cnpj-validator';
import { ReturnCities } from 'src/app/clinics/returns/cities.return';
import { Clinic } from 'src/app/clinics/returns/clinic_by_user.return';
import { Insurance } from 'src/app/clinics/returns/insurance_by_clinic';
import { User } from 'src/app/clinics/returns/user-cpf.return';
import { ClinicService } from 'src/app/clinics/services/clinic.service';

@Component({
  selector: 'app-add-pacient',
  templateUrl: './add-pacient.component.html',
  styleUrls: ['./add-pacient.component.scss']
})
export class AddPacientComponent implements OnInit {

  @ViewChild('fileInput') el: ElementRef;

  user: any;
  clinic_subdomain: string;
  clinic: Clinic;

  CadastroPacienteForm: FormGroup;

  insurances: Insurance[];

  imageUrl: any = "/assets/images/user.png";

  photodefault = true;
  photobase64: any;
  editFile = true;
  removeUpload = false;

  showErrorCPF: boolean = false;
  errorCPFMsg: string;
  acompanhante: string;
  endereco: string;

  showCpf: boolean = true;
  showForm: boolean = false;

  dados?: ReturnCities;
  cities?: string[];

  dadosTitular?: ReturnCities;
  citiesTitular?: string[];

  maxDate: Date = new Date();

  userAccomp: User;


  constructor(public dialogRef: MatDialogRef<AddPacientComponent>, private clinicService: ClinicService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private cd: ChangeDetectorRef
    ) {

      this.getJsonCities();

      this.clinic = data['clinic'];
      console.log(data)
      console.log("local:", this._locale)

    this.CadastroPacienteForm = new FormGroup({

      user_name: new FormControl('', [Validators.required]),
      birth_data: new FormControl('', [Validators.required]),
      user_rg: new FormControl('', [Validators.required]),
      user_cpf: new FormControl('', [Validators.required]),
      ua_cep: new FormControl('', [Validators.required]),
      ua_uf: new FormControl('', [Validators.required]),
      ua_city: new FormControl('', [Validators.required]),
      ua_district: new FormControl('', [Validators.required]),
      ua_name_street: new FormControl('', [Validators.required]),
      ua_house_number: new FormControl('', [Validators.required]),
      companion: new FormControl(),
      user_phone: new FormControl('', [Validators.required]),
      user_email: new FormControl('', [Validators.email]),
      has_insurance: new FormControl('', [Validators.required]),
      insurance: new FormControl(),
      user_gender: new FormControl('', [Validators.required]),
      user_photo: new FormControl(this.photobase64),

      titular_gender: new FormControl(),
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

    if(data['pc_id'] != null ){

      this.showCpf = false;
      this.getPacientClinica(data['pc_id'])


    }

  }

  ngOnInit(): void {

    this.getInsurances();
    
  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  async getJsonCities(): Promise<void> {


    await this.clinicService.getJSON().subscribe(data => {
      this.dados = data;
      this.dadosTitular = data;

    })

  }

  


  selectedState(state: string) {

    console.log(state)

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

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = '/assets/images/user.png';
    this.editFile = true;
    this.removeUpload = false;
    this.photodefault = true

    // When file uploads set it to file formcontrol
    this.CadastroPacienteForm.patchValue({
      user_photo:  this.photobase64
    });

  }



  uploadFile(event: any) {

    let reader = new FileReader(); // HTML5 FileReader API
    let photo = event.target.files[0];
    console.log("Erro aqui", photo)




    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(photo);

      // When file uploads set it to file formcontrol
      reader.onload = () => {

        this.imageUrl = reader.result;

        this.CadastroPacienteForm.patchValue({
          user_photo: reader.result
        });


        this.photodefault = false;
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
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
    else{

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

  radioChangeOfAge(event: MatRadioChange){
    if(event.value == '1'){

      this.CadastroPacienteForm.controls['companion'].setValue('1');
      this.CadastroPacienteForm.controls['companion'].disable();
    }
    else{
      this.CadastroPacienteForm.controls['companion'].enable();
    }
  }

  radioChangeInsurance(event: MatRadioChange) {
    if (event.value == '1') {

      this.CadastroPacienteForm.controls['insurance'].setValidators(Validators.required);
      this.CadastroPacienteForm.controls['insurance'].updateValueAndValidity();
    }
    else {
      this.CadastroPacienteForm.controls['insurance'].setValidators(null);
      this.CadastroPacienteForm.controls['insurance'].updateValueAndValidity();
    }
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

  enviarDados() {
    let data = this.CadastroPacienteForm.getRawValue();

    data.clinic_id = this.clinic.clinic_id;
    data.photoisdefault = this.photodefault
    data.birth_data = this.convertToDb(new Date(this.CadastroPacienteForm.value.birth_data))

    if (this.CadastroPacienteForm.valid) {
      this.clinicService.insertPacient(data).subscribe(
        data => {
          console.log(data);
          this.dialogRef.close(true);
        },
        err => {
  
        }
      );
    }

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.CadastroPacienteForm.controls[controlName].hasError(errorName);
  }

  convertToDb(date: Date) {
    console.log(date)
    return date.toISOString().split('T')[0];
  }


  onKeypressEventCPF(event: any) {

    let numberCPf = event.target.value;

    if (numberCPf.length == 14) {

      if (cpf.isValid(numberCPf)) {
        this.showErrorCPF = false;

        this.clinicService.getUserCPFVerify(this.clinic.clinic_id, numberCPf).subscribe(data => {

          console.log("Oi")
          
          this.showCpf = false;
          this.showForm = true

          this.CadastroPacienteForm.controls['user_gender'].setValue(data.user.user_gender);
          this.CadastroPacienteForm.controls['user_name'].setValue(data.user.user_name);
          this.CadastroPacienteForm.controls['user_email'].setValue(data.user.user_email);
          this.CadastroPacienteForm.controls['user_phone'].setValue(data.user.user_phone);
          this.CadastroPacienteForm.controls['birth_data'].setValue(new Date(data.user.birth_data));
          this.CadastroPacienteForm.controls['user_rg'].setValue(data.user.user_rg);
          this.CadastroPacienteForm.controls['user_cpf'].setValue(data.user.user_cpf);
          this.CadastroPacienteForm.controls['ua_cep'].setValue(data.user.address.ua_cep);
          this.CadastroPacienteForm.controls['ua_uf'].setValue(data.user.address.ua_uf);

          this.selectedState(data.user.address.ua_uf);

          this.CadastroPacienteForm.controls['ua_city'].setValue(data.user.address.ua_city);
          this.CadastroPacienteForm.controls['ua_district'].setValue(data.user.address.ua_district);
          this.CadastroPacienteForm.controls['ua_name_street'].setValue(data.user.address.ua_name_street);
          this.CadastroPacienteForm.controls['ua_house_number'].setValue(data.user.address.ua_house_number);


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
    else {
      this.showErrorCPF = false;
      // this.errorCPFMsg = "Digite um CPF"
    }

  }

  getClinica() {
    this.clinicService.selectClinicByUser(this.user?.user_id, this.clinic_subdomain).subscribe(
      data => {
        console.log(data);
        this.clinic = data.clinic;

        this.getInsurances();

      },
      err => {

      }
    );
  }

  onKeypressEventCPFacc(event: any) {

    let numberCPf = event.target.value;

    if (numberCPf.length == 14) {

      if (cpf.isValid(numberCPf)) {
        this.showErrorCPF = false;

        this.clinicService.getUserCPF(numberCPf).subscribe(data => {

          if (data.user.user_cpf == numberCPf) {
            this.userAccomp = data.user;
            
            this.CadastroPacienteForm.controls['titular_name'].setValue(data.user.user_name)
            this.CadastroPacienteForm.controls['titular_same_address'].setValue(data.user.address === null? '1' : '0');
            this.CadastroPacienteForm.controls['titular_birthdate'].setValue(data.user.birth_data);
            this.CadastroPacienteForm.controls['titular_rg'].setValue(data.user.user_rg);
            this.CadastroPacienteForm.controls['titular_cpf'].setValue(data.user.user_cpf);
            this.CadastroPacienteForm.controls['titular_cep'].setValue(data.user.address.ua_cep);
            
            this.CadastroPacienteForm.controls['titular_uf'].setValue(data.user.address.ua_uf);
            this.CadastroPacienteForm.controls['titular_phone'].setValue(data.user.user_phone);
            this.CadastroPacienteForm.controls['titular_email'].setValue(data.user.user_email);
            this.CadastroPacienteForm.controls['titular_gender'].setValue(data.user.user_gender);

            this.selectedState(data.user.address.ua_uf);

            this.CadastroPacienteForm.controls['titular_city'].setValue(data.user.address.ua_city);
            this.CadastroPacienteForm.controls['titular_district'].setValue(data.user.address.ua_district);
            this.CadastroPacienteForm.controls['titular_name_street'].setValue(data.user.address.ua_name_street);
            this.CadastroPacienteForm.controls['titular_house_number'].setValue(data.user.address.ua_house_number);

          }
        })
      }
      else {
        this.showErrorCPF = true;
        this.errorCPFMsg = "CPF inválido";
      }
    }
  }

  getPacientClinica(pc_id:string) {
    this.clinicService.getPacientClinic(pc_id).subscribe(
      data => {

        this.imageUrl = data.patient_clinic.user_photo;
        console.log(data);

        this.showCpf = false;
        this.showForm = true


        this.CadastroPacienteForm.controls['ua_city'].setValue(data.patient_clinic.ua_city);
        this.CadastroPacienteForm.controls['ua_district'].setValue(data.patient_clinic.ua_district);
        this.CadastroPacienteForm.controls['ua_name_street'].setValue(data.patient_clinic.ua_name_street);
        this.CadastroPacienteForm.controls['ua_house_number'].setValue(data.patient_clinic.ua_house_number);

        this.CadastroPacienteForm.controls['user_gender'].setValue(data.patient_clinic.gender);
        this.CadastroPacienteForm.controls['user_name'].setValue(data.patient_clinic.user_name);
        this.CadastroPacienteForm.controls['user_email'].setValue(data.patient_clinic.user_email);
        this.CadastroPacienteForm.controls['user_phone'].setValue(data.patient_clinic.user_phone);
        this.CadastroPacienteForm.controls['birth_data'].setValue(data.patient_clinic.birth_data);
        this.CadastroPacienteForm.controls['user_rg'].setValue(data.patient_clinic.user_rg);
        this.CadastroPacienteForm.controls['user_cpf'].setValue(data.patient_clinic.user_cpf);
        this.CadastroPacienteForm.controls['ua_cep'].setValue(data.patient_clinic.ua_cep);
        this.CadastroPacienteForm.controls['ua_uf'].setValue(data.patient_clinic.ua_uf);

        this.selectedState(data.patient_clinic.ua_uf);

        this.CadastroPacienteForm.controls['companion'].setValue(data.patient_clinic.companion === null? '0' : '1');
        this.CadastroPacienteForm.controls['has_insurance'].setValue(data.patient_clinic.ins_id === null? '0' : '1');
        this.CadastroPacienteForm.controls['insurance'].setValue(data.patient_clinic.ins_id);

        if (data.patient_clinic.companion != null){

          this.selectedStateTitular(data.patient_clinic.companion.address.ua_uf);

          
          this.CadastroPacienteForm.controls['titular_cpf'].setValue(data.patient_clinic.companion?.user_cpf);
          this.CadastroPacienteForm.controls['titular_gender'].setValue(data.patient_clinic.companion?.user_gender);
          this.CadastroPacienteForm.controls['titular_name'].setValue(data.patient_clinic.companion?.user_name);
          this.CadastroPacienteForm.controls['titular_birthdate'].setValue(data.patient_clinic.companion?.birth_data);
          this.CadastroPacienteForm.controls['titular_rg'].setValue(data.patient_clinic.companion?.user_rg);
          this.CadastroPacienteForm.controls['titular_phone'].setValue(data.patient_clinic.companion?.user_phone);
          this.CadastroPacienteForm.controls['titular_email'].setValue(data.patient_clinic.companion?.user_email);
          this.CadastroPacienteForm.controls['titular_same_address'].setValue('0')

          this.CadastroPacienteForm.controls['titular_cep'].setValue(data.patient_clinic.companion?.address.ua_cep);
          this.CadastroPacienteForm.controls['titular_uf'].setValue(data.patient_clinic.companion?.address.ua_uf);
          this.CadastroPacienteForm.controls['titular_city'].setValue(data.patient_clinic.companion?.address.ua_city);
          console.log(data.patient_clinic.companion?.address.ua_city)
          this.CadastroPacienteForm.controls['titular_district'].setValue(data.patient_clinic.companion?.address.ua_district);
          this.CadastroPacienteForm.controls['titular_name_street'].setValue(data.patient_clinic.companion?.address.ua_name_street);
          this.CadastroPacienteForm.controls['titular_house_number'].setValue(data.patient_clinic.companion?.address.ua_house_number);


        }
        
      },
      err => {

      }

    );
  
  }

  

}

