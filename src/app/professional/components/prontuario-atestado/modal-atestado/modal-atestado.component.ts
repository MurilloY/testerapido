import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProfessionalService } from 'src/app/professional/services/professional.service';
import { PatientClinic } from 'src/app/professional/returns/pacient_clinic_return';
import * as moment from 'moment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { VisualizarAtestadoComponent } from '../visualizar-atestado/visualizar-atestado.component';


@Component({
  selector: 'app-modal-atestado',
  templateUrl: './modal-atestado.component.html',
  styleUrls: ['./modal-atestado.component.scss']
})
export class ModalAtestadoComponent implements OnInit {

  formAtestado: FormGroup;

  user: any;

  pc_id: string;
  patient_clinic?: PatientClinic;

  app_id: string

  mensage: string

  date_desc = new Date()

  cert_desc: string;

  sanitizedHtmlContent: SafeHtml;

  @ViewChild('myDiv') myDiv: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ModalAtestadoComponent>,
    private professionalService: ProfessionalService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {

    this.pc_id = data['pc_id'];
    this.app_id = data['app_id']

    this.formAtestado = new FormGroup({
      cert_date: new FormControl(new Date(), Validators.required),
      cert_validity: new FormControl('', Validators.required),
      cert_reason: new FormControl('', Validators.required),
    });
  }

  onContentChanged(event: any) {
    if (event && event.target && event.target.innerHTML) {
      console.log(event);
    }
    // this.sanitizedHtmlContent = newContent;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!)

    this.getPacientClinic()
  }
  

  onConfirmClick(): void {

    console.log(this.myDiv.nativeElement.innerHTML)

    let data = this.formAtestado.value;
    data.user_id = this.patient_clinic?.user_id;
    data.clinic_id = this.patient_clinic?.clinic_id;
    data.prof_id = this.user.prof_id;
    data.app_id = this.app_id;
    data.cert_date = moment(this.formAtestado.value.cert_date).format('YYYY/MM/DD')
    data.cert_validity = moment(this.formAtestado.value.cert_validity).format('YYYY/MM/DD')
    data.cert_desc = this.myDiv.nativeElement.innerHTML


    if (this.formAtestado.valid) {
      this.professionalService.insertCertificate(data).subscribe(
        data => {
          this.dialogRef.close(true);
        },
        err => {

        }
      );

    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  

  public onDate(event: any): void {
    this.date_desc = event.value

    const preDescEl = document.getElementById('pre_desc');

        if (preDescEl) {
          this.cert_desc = `Atesto que atendi nesta data, às <strong><span contenteditable="true">16h30min</span></strong>, o paciente <strong>${this.patient_clinic?.user_name}</strong>, gênero ${this.patient_clinic?.gender === 'f' ? 'feminino': 'masculino'}, 30 anos, sendo necessário o seu afastamento do local de trabalho ou escola <strong><span contenteditable="true">por 2(dois)</span></strong> dias, a partir de ${moment(this.date_desc).locale('pt-br').format('LL')}, tendo como causa do atendimento o descrito abaixo:`;
          preDescEl.innerHTML = this.cert_desc

        } else {
          console.error('Elemento pre_desc não encontrado!');
        }
    console.log(this.date_desc)
  }

  calculateAge(date: Date | string) {
    console.log(date,typeof(date) )
    const birthDate = typeof(date) == 'string' ? new Date(date) : date;
    const diff_ms = Date.now() - birthDate.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  getPacientClinic() {
    this.professionalService.getPacientClinic(this.pc_id).subscribe(
      data => {
        this.patient_clinic = data.patient_clinic
        this.sanitizedHtmlContent = this.sanitizer.bypassSecurityTrustHtml(`Atesto que atendi nesta data, às <strong><span contenteditable="true">${moment().locale('pt-br').format('LT')}</span></strong>, o paciente <strong>${this.patient_clinic?.user_name}</strong>, gênero ${this.patient_clinic?.gender === 'f' ? 'feminino': 'masculino'}, ${this.calculateAge(this.patient_clinic?.birth_data ?? '')} anos, sendo necessário o seu afastamento do local de trabalho ou escola <strong><span contenteditable="true">por 2(dois)</span></strong> dias, a partir de ${moment(this.date_desc).locale('pt-br').format('LL')}, tendo como causa do atendimento o descrito abaixo:`);

      },
      err => {

      }
    );
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

}
