import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { Anamnesi } from 'src/app/professional/returns/anamnese_anam_id';
import { PatientClinic } from 'src/app/professional/returns/pacient_clinic_return';
import { ProfessionalService } from 'src/app/professional/services/professional.service';

@Component({
  selector: 'app-modal-anamnese',
  templateUrl: './modal-anamnese.component.html',
  styleUrls: ['./modal-anamnese.component.scss']
})
export class ModalAnamneseComponent implements OnInit {

  dialogTitle: string = "Detalhamento do quadro atual do paciente"
  formAnamnese: FormGroup;
  user: any;
  patient_clinic?: PatientClinic;
  pc_id: string;
  app_id: string

  dialogButton: string;

  anam_id: string;

  button = true;

  anamnese: Anamnesi;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private professionalService: ProfessionalService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ModalAnamneseComponent>
  ) {

    this.formAnamnese = new FormGroup({
      therapy: new FormControl('', Validators.required),
      therapy_desc: new FormControl(''),
      practice_exercises: new FormControl('', Validators.required),
      medical_follow_up: new FormControl('', Validators.required),
      symptoms: new FormControl('', Validators.required),
      family_history: new FormControl('', Validators.required),
      use_medication: new FormControl('', Validators.required),
      use_medication_desc: new FormControl(''),
      use_drugs: new FormControl('', Validators.required),
    });

    this.pc_id = data['pc_id'];
    this.app_id = data['app_id']
    if (data['anam_id'] != null) {
      this.anam_id = data['anam_id'];
      this.button = false;
      this.formAnamnese.disable(); 
      this.getAnamnese()
    }

  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);

    this.getPacientClinic()

  }

  onConfirmClick(): void {

    let data = this.formAnamnese.value;
    data.user_id = this.patient_clinic?.user_id;
    data.clinic_id = this.patient_clinic?.clinic_id;
    data.app_id = this.app_id
    data.who = this.user.user_id;

    // this.findInvalidControls()

    if (this.formAnamnese.valid) {
      this.professionalService.insertAnamnese(data).subscribe(
        data => {
          this.dialogRef.close(true);
        },
        err => {

        }
      ); 

    }
  }

  getPacientClinic() {
    this.professionalService.getPacientClinic(this.pc_id).subscribe(
      data => {
        this.patient_clinic = data.patient_clinic

      },
      err => {

      }
    );
  }

  getAnamnese() {
    this.professionalService.getAnamnese(this.anam_id).subscribe(
      data => {
        this.anamnese = data.anamnesis
        this.formAnamnese.controls['therapy'].setValue(data.anamnesis.therapy.toString());
        this.formAnamnese.controls['therapy_desc'].setValue(data.anamnesis.therapy_desc.toString());
        this.formAnamnese.controls['practice_exercises'].setValue(data.anamnesis.practice_exercises.toString());
        this.formAnamnese.controls['medical_follow_up'].setValue(data.anamnesis.medical_follow_up.toString());
        this.formAnamnese.controls['symptoms'].setValue(data.anamnesis.symptoms.toString());
        this.formAnamnese.controls['family_history'].setValue(data.anamnesis.family_history.toString());
        this.formAnamnese.controls['use_medication'].setValue(data.anamnesis.use_medication.toString());
        this.formAnamnese.controls['use_medication_desc'].setValue(data.anamnesis.use_medication_desc.toString());
        this.formAnamnese.controls['use_drugs'].setValue(data.anamnesis.use_drugs.toString());

      },
      err => {

      }
    );
  }

  onCloseClick(): void {
    this.dialogRef.close(false);
  }


  radioChangeTherapy(event: MatRadioChange) {

    if (event.value == '0') {

      this.formAnamnese.controls['therapy_desc'].setValue(null);

      //Validators
      this.formAnamnese.controls['therapy_desc'].setValidators(null);
      this.formAnamnese.controls['therapy_desc'].updateValueAndValidity();

    }
    else {

      //Validators
      this.formAnamnese.controls['therapy_desc'].setValidators(Validators.required);
      this.formAnamnese.controls['therapy_desc'].updateValueAndValidity();
      
    }

  }

  radioChangeUseMedication(event: MatRadioChange) {

    if (event.value == '0') {

      this.formAnamnese.controls['use_medication_desc'].setValue(null);

      //Validators
      this.formAnamnese.controls['use_medication_desc'].setValidators(null);
      this.formAnamnese.controls['use_medication_desc'].updateValueAndValidity();

    }
    else {

      //Validators
      this.formAnamnese.controls['use_medication_desc'].setValidators(Validators.required);
      this.formAnamnese.controls['use_medication_desc'].updateValueAndValidity();
      
    }

  }


  public findInvalidControls() {
    const invalid = [];
    const controls = this.formAnamnese.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    console.log(invalid)
    return invalid;
  }

}
