import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Appointment } from '../../returns/appointment_by_appid';
import { CancellationQuestion } from '../../returns/cancel_questions';
import { ClinicService } from '../../services/clinic.service';
import { ModalCancelamentoComponent } from './modal-cancelamento/modal-cancelamento.component';

@Component({
  selector: 'app-cancelar-consulta',
  templateUrl: './cancelar-consulta.component.html',
  styleUrls: ['./cancelar-consulta.component.scss']
})
export class CancelarConsultaComponent implements OnInit {

  appointment?: Appointment;
  
  etapa: number = 1;
  app_id: any;

  questions: CancellationQuestion[];

  formQuestions: FormGroup;
  cq_id: string
  clinic: any

  usersystem: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private clinicService: ClinicService, 
    public dialogRef: MatDialogRef<CancelarConsultaComponent>
  ) { 
    this.getAppointmentInfo(data['consulta']['app_id'])
    this.clinic = data["clinic"]

    this.formQuestions = new FormGroup({

      cq_id: new FormControl(),
      question_text: new FormControl(),

    });
  }

  ngOnInit(): void {
    document.body.classList.add('body-etapas');

    if(this.router.url == '/clinica/cancelar-consulta-motivo'){
      this.etapa = 2;
    }

    this.usersystem = JSON.parse(localStorage.getItem("UserClinicObject")!);
    console.log(this.usersystem)

  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }


  alternaEtapa() {
    if(this.etapa == 2){
      this.etapa = 1
    }
  }

  confirmClick() {
    if(this.formQuestions.valid){
      let value = this.formQuestions.value
      this.app_id = this.appointment?.appointment.app_id
      value.canceled_by = this.usersystem['user_id']
      value.questions = this.formQuestions.value.cq_id
      

      this.clinicService.updateCanceled(this.app_id , value).subscribe(
        data => {
          this.dialogRef.close(true);
        }
      )

    }
  }

  getAppointmentInfo(app_id: string) {
    this.clinicService.getAppointmentInfo(app_id).subscribe(
      data => {
        this.appointment = data.appointment
        console.log(data);

      },
      err => {

      }
    );
  }

  getCancelQuestions() {
    this.clinicService.getCancelQuestions('2').subscribe(
      data => {
        this.questions = data.cancellation_questions
        console.log(data);
      },
    );
  }

  openAlertDialog() {
    this.etapa = 2
    this.getCancelQuestions()

    // const dialogRef = this.dialog.open(ModalCancelamentoComponent,{
    //   width: '520px',
    //   maxHeight: '90vh',
    //   data:{
    //     versao: this.etapa
    //   },
    // });
  }

}
