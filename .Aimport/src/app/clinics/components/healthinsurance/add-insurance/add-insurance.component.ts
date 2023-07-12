import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReturnCities } from 'src/app/clinics/returns/cities.return';
import { Insurance } from 'src/app/clinics/returns/insurance_by_clinic';
import { ClinicService } from 'src/app/clinics/services/clinic.service';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.scss']
})
export class AddInsuranceComponent implements OnInit {

  dados?: ReturnCities;
  dadosTitular?: ReturnCities;
  cities?: string[];
  formAddInsurance: FormGroup;

  ins_name: string;
  ins_state: String;
  ins_city: string;
  ins_status: string = "1";
  cep: string;
  tittle: string = 'Adicionar Convênio';

  insert: boolean;

  clinic_id: string;
  insurance: Insurance;

  



  constructor(
    private clinicService: ClinicService,
    public dialogRef: MatDialogRef<AddInsuranceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

    this.getJsonCities();
    this.clinic_id = data['clinic_id']
    this.insurance = data['insurance']

    if (this.insurance != null){
      this.tittle = 'Editar Convênio'
      this.ins_name = this.insurance.ins_name
      this.ins_state = this.insurance.ins_state
      this.ins_city = this.insurance.ins_city
      this.ins_status = this.insurance.ins_status.toString()
      // this.selectedState(this.insurance.ins_state)

    }

    this.formAddInsurance = new FormGroup({

      ins_name: new FormControl(this.ins_name, [Validators.required]),
      ins_state: new FormControl(this.ins_state, [Validators.required]),
      ins_city: new FormControl(this.ins_city, [Validators.required]),
      ins_status: new FormControl(this.ins_status, [Validators.required]),

    });
  }

  ngOnInit(): void {
    // this.addInsurance();

  }

  convertToDb(date: Date) {
    return date.toISOString().split('T')[0]
  }

  // onConfirmClick(): void {
  //   // this.dialogRef.close(true);

  //   if(this.insert){

  //     if(this.formAddInsurance.valid){

  //       let value = this.formAddInsurance.value
  //       value.app_id = this.formAddInsurance.app_id
  //       value.date = this.convertToDb(new Date(this.formAddInsurance.value.date))

  //       this.clinicService.insertPayment(value).subscribe(
  //         data => {

  //           this.dialogRef.close(true);

  //         }
  //       )

  //     }
  //     console.log('insert')
  //   }
  //   else{

  //     if(this.formAddInsurance.valid){
  //       let value = this.formAddInsurance.value
  //       value.app_id = this.appointment.app_id
  //       value.date = this.convertToDb(new Date(this.formAddInsurance.value.date))

  //       this.clinicService.updatePayment(this.appointmentsPayment.ap_id, value).subscribe(
  //         data => {
  //           this.dialogRef.close(true);
  //         }
  //       )

  //     }
      
  //     console.log('update')
  //   }
  // }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  getJsonCities() {

    this.clinicService.getJSON().subscribe(data => {
      this.dados = data;
      this.dadosTitular = data;

      if (this.insurance != null) {
        this.selectedState(this.insurance.ins_state)

      }

    })

  }

  selectedState(state: string) {

    for (let i = 0; i < this.dados!.estados.length; i++) {         // percorre o array principal

      if (this.dados!.estados[i].sigla == state) {                // pega o estado conforme a seleção                             // mostra o select de cidades escondido
        this.cities = this.dados!.estados[i].cidades;                   // guarda as cidades respectivas
      }
    }


  }

  addInsurance() {
    if (this.formAddInsurance.valid) {
      let data = this.formAddInsurance.value
      data.clinic_id = this.clinic_id

      if (this.insurance != null) {
        this.clinicService.updateInsurance(this.insurance.ins_id ,data).subscribe(
          data => {
            this.dialogRef.close(true);
          },
          err => {
    
          }
        ); 
      }else {
        this.clinicService.insertInsurance(data).subscribe(
          data => {
            this.dialogRef.close(true);
          },
          err => {
    
          }
        ); 
      }
    }
    // console.log(this.formAddInsurance.value)

  }

}
