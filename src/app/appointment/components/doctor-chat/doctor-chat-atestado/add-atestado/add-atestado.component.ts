import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { VisualizarAtestadoComponent } from '../visualizar-atestado/visualizar-atestado.component';
import { Appointment } from 'src/app/appointment/returns/verifyurl.return';

@Component({
  selector: 'app-add-atestado',
  templateUrl: './add-atestado.component.html',
  styleUrls: ['./add-atestado.component.scss']
})
export class AddAtestadoComponent implements OnInit {
  formAtestado: FormGroup;
  pc_id: string;
  app_id: string
  mensage: string
  date_desc = new Date()
  cert_desc: string;
  token: string;
  clinic_id: string;
  user_id_pacient: string;
  who: string;
  url: string
  appointment: Appointment;

  sanitizedHtmlContent: SafeHtml;
  @ViewChild('myDiv') myDiv: ElementRef;


  constructor(private dialogRef: MatDialogRef<AddAtestadoComponent>,
    private appointmentService: AppointmentService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
    ) { 

      this.formAtestado = new FormGroup({
        cert_date: new FormControl(new Date(), Validators.required),
        cert_validity: new FormControl('', Validators.required),
        cert_reason: new FormControl('', Validators.required),
      });
    }

  ngOnInit(): void {
    let url = this.router.url;
    let split = url.split("/");
    this.url = decodeURIComponent(split[3]);
    this.getVerifyUrl();

  }


  public onDate(event: any): void {
    this.date_desc = event.value

    const preDescEl = document.getElementById('pre_desc');

        if (preDescEl) {
          this.cert_desc = `Atesto que atendi nesta data, às <strong><span contenteditable="true">16h30min</span></strong>, o paciente <strong>${this.appointment.pc_name}</strong>, gênero ${this.appointment.pc_gender === 'f' ? 'feminino': 'masculino'}, 30 anos, sendo necessário o seu afastamento do local de trabalho ou escola <strong><span contenteditable="true">por 2(dois)</span></strong> dias, a partir de ${moment(this.date_desc).locale('pt-br').format('LL')}, tendo como causa do atendimento o descrito abaixo:`;
          preDescEl.innerHTML = this.cert_desc

        } else {
          console.error('Elemento pre_desc não encontrado!');
        }
    console.log(this.date_desc)
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

        this.sanitizedHtmlContent = this.sanitizer.bypassSecurityTrustHtml(`Atesto que atendi nesta data, às <strong><span contenteditable="true">${moment().locale('pt-br').format('LT')}</span></strong>, o paciente <strong>${data.appointment.pc_name}</strong>, gênero ${data.appointment.pc_gender === 'f' ? 'feminino': 'masculino'}, ${this.calculateAge(data.appointment.pc_birth_data ?? '')} anos, sendo necessário o seu afastamento do local de trabalho ou escola <strong><span contenteditable="true">por 2(dois)</span></strong> dias, a partir de ${moment(this.date_desc).locale('pt-br').format('LL')}, tendo como causa do atendimento o descrito abaixo:`);


      },
      err => {
        console.log(err)
      }
    );

  }

  calculateAge(date: Date | string) {
    console.log(date,typeof(date) )
    const birthDate = typeof(date) == 'string' ? new Date(date) : date;
    const diff_ms = Date.now() - birthDate.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  

  onConfirmClick(): void {

    console.log(this.myDiv.nativeElement.innerHTML)

    let data = this.formAtestado.value;
    data.user_id = this.appointment.user_id_pacient;
    data.clinic_id = this.appointment.clinic_id;
    data.prof_id = this.appointment.prof_id;
    data.app_id = this.app_id;
    data.cert_date = moment(this.formAtestado.value.cert_date).format('YYYY/MM/DD')
    data.cert_validity = moment(this.formAtestado.value.cert_validity).format('YYYY/MM/DD')
    data.cert_desc = this.myDiv.nativeElement.innerHTML


    if (this.formAtestado.valid) {
      this.appointmentService.insertCertificate(data, this.token).subscribe(
        data => {
          this.dialogRef.close(true);
        },
        err => {

        }
      );

    }
  }

  revisarPDF() {
    const dialogRef = this.dialog.open(VisualizarAtestadoComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        app_id: this.app_id,
        cert_id: null,
        pre_date: this.formAtestado.value.cert_date,
        pre_desc: this.myDiv.nativeElement.innerHTML
      }
      
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

       
      }

    });

  }



  onCloseClick(): void {
    this.dialogRef.close();
  }

}
