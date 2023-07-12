import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProfessionalService } from '../../../services/professional.service';
import { PatientClinic } from '../../../returns/pacient_clinic_return';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ConfirmdialogComponent } from 'src/app/clinics/components/confirmdialog/confirmdialog.component';
import { VisualizarReceitaComponent } from './visualizar-receita/visualizar-receita.component';

@Component({
  selector: 'app-emitir-receita',
  templateUrl: './emitir-receita.component.html',
  styleUrls: ['./emitir-receita.component.scss']
})
export class EmitirReceitaComponent implements OnInit {

  user: any;
  pc_id: string;
  app_id: string
  patient_clinic?: PatientClinic


  formPrescription: FormGroup;




  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private professionalService: ProfessionalService,
    private dialogRef: MatDialogRef<EmitirReceitaComponent>,
    private dialog: MatDialog,
  ) {

    this.pc_id = data['pc_id']
    this.app_id = data['app_id']

    this.formPrescription = new FormGroup({
      pre_date: new FormControl('', Validators.required),
      pre_desc: new FormControl('', Validators.required),

    });
  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);

    this.getPacientClinic()
  }

  onConfirmClick(): void {
    let data = this.formPrescription.value;
    data.user_id = this.patient_clinic?.user_id;
    data.prof_id = this.user.prof_id
    data.clinic_id = this.patient_clinic?.clinic_id;
    data.app_id = this.app_id
    data.pre_date = moment.utc(data.pre_date).format('YYYY-MM-DD HH:mm:ss');

    // this.findInvalidControls()

    if (this.formPrescription.valid) {
      this.professionalService.insertPrescription(data).subscribe(
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

  revisarPDF() {
    const dialogRef = this.dialog.open(VisualizarReceitaComponent, {
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

  onCloseClick(): void {
    this.dialogRef.close();
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

}