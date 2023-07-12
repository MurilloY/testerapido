import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentsPayments } from 'src/app/adm/returns/payment';
import { Status } from 'src/app/adm/returns/payment_type';
import { Appointment } from 'src/app/clinics/returns/appointments.return';
import { ClinicService } from 'src/app/clinics/services/clinic.service';

@Component({
  selector: 'app-editar-pagamento',
  templateUrl: './editar-pagamento.component.html',
  styleUrls: ['./editar-pagamento.component.scss']
})
export class EditarPagamentoComponent implements OnInit {

  pagamento: number = 0;
  tipo: string = '';

  status: string;
  apt_id: string;
  times: string = '1';
  ap_valor: string;
  date: string;
  app_id: string;
  disabledtimes = true;
  insert: boolean;

  appointment: Appointment;

  formPayment: FormGroup;
  sstatus?: Status;
  pagamentotipo: Status[];
  counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  appointmentsPayment: AppointmentsPayments;





  constructor(@Inject(MAT_DIALOG_DATA) private data: Appointment, private clinicService: ClinicService, public dialogRef: MatDialogRef<EditarPagamentoComponent>

  ) {
    this.appointment = data
    console.log(data)
    if (data.ap_id == null) {
      this.status = "0"
      this.insert = true
    }

    else {
      this.status = "1"
      this.getPaymentbyId(data.ap_id)
      this.insert = false
    }

    this.formPayment = new FormGroup({

      status: new FormControl(this.status, [Validators.required]),
      apt_id: new FormControl(this.apt_id, [Validators.required]),
      times: new FormControl(this.times),
      ap_valor: new FormControl(this.ap_valor, [Validators.required]),
      date: new FormControl(this.date, [Validators.required]),

    });
  }

  ngOnInit(): void {
    this.getPaymentTypes();
    console.log(new Date('2023-01-06'))
  }

  changePayment(data: any) {
    if(data.value != 'J+WMlCDBA1o=') {
      this.formPayment.controls['times'].setValue('1')
    }
  }

  updateAppointmentTpid(data:any){
    this.clinicService.updateAppointmentTpid(this.appointment.app_id, data).subscribe()
  }

  onConfirmClick(): void {
    // this.dialogRef.close(true);

    if(this.insert){

      if(this.formPayment.valid){

        let value = this.formPayment.value
        value.app_id = this.appointment.app_id
        value.date = this.convertToDb(new Date(this.formPayment.value.date))

        this.clinicService.insertPayment(value).subscribe(
          data => {

            this.dialogRef.close(true);

          }
        )

      }
      console.log('insert')
    }
    else{

      if(this.formPayment.valid){
        let value = this.formPayment.value
        value.app_id = this.appointment.app_id
        value.date = this.convertToDb(new Date(this.formPayment.value.date))

        this.clinicService.updatePayment(this.appointmentsPayment.ap_id, value).subscribe(
          data => {
            this.dialogRef.close(true);
          }
        )

      }
      
      console.log('update')
    }
  }

  convertToDb(date: Date) {
    return date.toISOString().split('T')[0]
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  getPaymentTypes() {

    this.clinicService.getPaymentTypes().subscribe(
      data => {

        this.pagamentotipo = data.Status


      },
      err => {

      }
    );

  }

  getPaymentbyId(ap_id: string) {

    this.clinicService.getPaymentbyId(ap_id).subscribe(
      data => {

        console.log(new Date(data.appointments.date))

        this.formPayment.controls['apt_id'].setValue(data.appointments.apt_id);
        this.formPayment.controls['times'].setValue(data.appointments.times);
        this.formPayment.controls['ap_valor'].setValue(data.appointments.ap_valor);
        this.formPayment.controls['date'].setValue(new Date(data.appointments.date));

        this.appointmentsPayment = data.appointments


      },

      err => {

      }
    );

  }

}
