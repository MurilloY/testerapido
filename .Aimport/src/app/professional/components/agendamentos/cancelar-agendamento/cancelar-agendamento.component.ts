import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from 'src/app/professional/returns/appointment_by_id';
import { CancellationQuestion } from 'src/app/professional/returns/cancel_questions';
import { ProfessionalService } from 'src/app/professional/services/professional.service';

@Component({
  selector: 'app-cancelar-agendamento',
  templateUrl: './cancelar-agendamento.component.html',
  styleUrls: ['./cancelar-agendamento.component.scss']
})
export class CancelarAgendamentoComponent implements OnInit {

  etapa: number = 1;
  questions: CancellationQuestion[];
  appointment?: Appointment;
  formQuestions: FormGroup;
  cq_id: string
  app_id: any;
  usersystem: any;
  user: any;





  constructor(public dialogRef: MatDialogRef<CancelarAgendamentoComponent>, private professionalService: ProfessionalService,  @Inject(MAT_DIALOG_DATA) private data: any,) { 
    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);
    console.log(this.user)
    
    this.getAppointmentInfo(data['consulta']['appointment']['app_id'])
    console.log(data)

    this.formQuestions = new FormGroup({

      cq_id: new FormControl(),
      question_text: new FormControl(),

    });
  }

  ngOnInit(): void {
  }

  alternaEtapa() {
    if(this.etapa == 2){
      this.etapa = 1
    }
  }

  onDismiss() {
    this.dialogRef.close()
  }

  getAppointmentInfo(app_id: string) {
    this.professionalService.getAppointmentInfo(app_id).subscribe(
      data => {
        this.appointment = data.appointment
        console.log(data);

      },
      err => {

      }
    );
  }

  confirmClick() {
    if(this.formQuestions.valid){
      let value = this.formQuestions.value
      this.app_id = this.appointment?.appointment.app_id
      value.canceled_by = this.user.user_id
      value.questions = this.formQuestions.value.cq_id
      

      this.professionalService.updateCanceled(this.app_id , value).subscribe(
        data => {
          this.dialogRef.close(true);
        }
      )

    }
  }

  getCancelQuestions() {
    this.professionalService.getCancelQuestions('2').subscribe(
      data => {
        this.questions = data.cancellation_questions
        console.log(data);
      },
    );
  }

  openAlertDialog() {
    this.etapa = 2
    this.getCancelQuestions()

  }

}
