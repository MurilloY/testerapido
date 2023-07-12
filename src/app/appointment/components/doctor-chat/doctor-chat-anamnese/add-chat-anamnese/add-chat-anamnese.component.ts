import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { Anamnesi } from 'src/app/appointment/returns/anamnese_anam_id';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';

@Component({
  selector: 'app-add-chat-anamnese',
  templateUrl: './add-chat-anamnese.component.html',
  styleUrls: ['./add-chat-anamnese.component.scss']
})
export class AddChatAnamneseComponent implements OnInit {

  dialogTitle: string = "Detalhamento do quadro atual do paciente"
  formAnamnese: FormGroup;
  token:string;
  pc_id: string;
  app_id: string
  url: string;
  who: string
  user_id: string;
  clinic_id: string;

  dialogButton: string;

  anam_id: string;

  button = true;

  anamnese: Anamnesi;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private appointmentService: AppointmentService,
    private router: Router,
    private dialogRef: MatDialogRef<AddChatAnamneseComponent>
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
      this.formAnamnese.disable();
      
    }

  }

  ngOnInit(): void {

    let url = this.router.url;
    let split = url.split("/");
    this.url = decodeURIComponent(split[3]);
    this.getVerifyUrl();


  }

  getVerifyUrl() {

    this.appointmentService.getVerifyUrl(this.url).subscribe(
      data => {

        console.log(data)

        this.token = data.token
        this.pc_id = data.appointment.pc_id;
        this.user_id = data.appointment.user_id_pacient;
        this.who = data.room.participant == 0 ? data.appointment.user_id_pacient : data.appointment.user_id_prof;
        this.clinic_id = data.appointment.clinic_id;



        this.app_id = data.appointment.app_id

        if (this.anam_id != null) {
          this.button = false;
          this.getAnamnese()
        }

      },
      err => {
        console.log(err)
      }
    );

  }

  onConfirmClick(): void {

    let data = this.formAnamnese.value;
    data.user_id = this.user_id;
    data.clinic_id = this.clinic_id;
    data.app_id = this.app_id
    data.who = this.who;

    // this.findInvalidControls()

    if (this.formAnamnese.valid) {
      this.appointmentService.insertAnamnese(data, this.token).subscribe(
        data => {
          this.dialogRef.close(true);
        },
        err => {

        }
      ); 

    }
  }

  getAnamnese() {
    this.appointmentService.getAnamnese(this.anam_id, this.token).subscribe(
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
