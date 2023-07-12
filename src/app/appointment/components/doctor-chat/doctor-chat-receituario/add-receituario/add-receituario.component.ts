import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VisualizarReceituarioComponent } from '../visualizar-receituario/visualizar-receituario.component';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { Appointment } from 'src/app/appointment/returns/verifyurl.return';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmdialogComponent } from 'src/app/clinics/components/confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-add-receituario',
  templateUrl: './add-receituario.component.html',
  styleUrls: ['./add-receituario.component.scss']
})
export class AddReceituarioComponent implements OnInit {

  formPrescription: FormGroup;

  pc_id: string;
  app_id: string;
  appointment: Appointment;
  token: string;
  clinic_id: string;
  user_id_pacient: string;
  who: string;
  url: string


  constructor(private dialogRef: MatDialogRef<AddReceituarioComponent>,
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private router: Router) { 

      this.formPrescription = new FormGroup({
        pre_date: new FormControl('', Validators.required),
        pre_desc: new FormControl('', Validators.required),
  
      });
    }

  ngOnInit(): void {
    let url = this.router.url;
    let split = url.split("/");
    this.url = decodeURIComponent(split[3]);
    this.getVerifyUrl();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    let data = this.formPrescription.value;
    data.user_id = this.appointment.user_id_pacient;
    data.prof_id = this.appointment.prof_id
    data.clinic_id = this.appointment.clinic_id;
    data.app_id = this.app_id
    data.pre_date = moment.utc(data.pre_date).format('YYYY-MM-DD HH:mm:ss');

    // this.findInvalidControls()

    if (this.formPrescription.valid) {
      this.appointmentService.insertPrescription(data, this.token).subscribe(
        data => {

          if (data.refreshToken) {
            localStorage.setItem("admToken", data.refreshToken)
          }

          this.dialogRef.close(true)

          let desc = "Receituário cadastrado com sucesso."

          this.dialog.open(ConfirmdialogComponent, {
            data: {
              version: 1,
              title: "SUCESSO",
              desc: desc,
              button_confirm: "OK",
              button_cancel: "Cancelar"
            },
          });

        },
        err => {

        }
      );

    }
  }

  getVerifyUrl() {

    this.appointmentService.getVerifyUrl(this.url).subscribe(
      data => {

        this.appointment = data.appointment
        this.token = data.token
        this.clinic_id = data.appointment.clinic_id
        this.pc_id = data.appointment.pc_id
        this.app_id = data.appointment.app_id;
        this.user_id_pacient = data.appointment.user_id_pacient;
        this.who = data.room.participant == 0 ? data.appointment.user_id_pacient : data.appointment.user_id_prof;

      },
      err => {
        console.log(err)
      }
    );

  }

  revisarPDF() {
    const dialogRef = this.dialog.open(VisualizarReceituarioComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        app_id: this.app_id,
        pc_id: this.pc_id,
        pre_date: this.formPrescription.value.pre_date,
        pre_desc: this.formPrescription.value.pre_desc
      }
      
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.getProfessionalsClinic();
        // this.getDashes();
      }

    });

  }

}
