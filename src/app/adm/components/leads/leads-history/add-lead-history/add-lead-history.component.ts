import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeadHistory } from 'src/app/adm/returns/leads_histories';
import { Lead } from 'src/app/adm/returns/leads_return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-lead-history',
  templateUrl: './add-lead-history.component.html',
  styleUrls: ['./add-lead-history.component.scss']
})
export class AddLeadHistoryComponent implements OnInit {

  dialogTitle: string = "Lançar Atualização"
  formAddHistory: FormGroup;
  dialogButton: string;

  lead_id: string;
  adm_id: string;
  message: string;
  lead_status: number;

  usersystem: any;

  history: Lead;




  constructor(private admService: AdmService, public dialog: MatDialog, public dialogRef: MatDialogRef<AddLeadHistoryComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {

    this.lead_id = data

    this.formAddHistory = new FormGroup({

      lead_status: new FormControl(this.lead_status, Validators.required),
      message: new FormControl("", Validators.required)

    });

    this.dialogButton = "Cadastrar"

  }

  ngOnInit(): void {
    this.usersystem = JSON.parse(localStorage.getItem("UserAdmObject")!);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.formAddHistory.controls[controlName].hasError(errorName);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  onSubmit() {


    if (this.formAddHistory.valid) {

      var formData = this.formAddHistory.value;

      formData.adm_id = this.usersystem['adm_id']
      formData.lead_id = this.lead_id

      this.admService.insertLeadHistory(formData).subscribe(
        data => {

          Swal.fire({
            heightAuto: false,
            title: 'Sucesso',
            text: "Atualização cadastrada com sucesso!",
            icon: 'success',
            iconColor: '#01AEEF',
            showCancelButton: false,
            confirmButtonColor: '#01AEEF',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          });

          this.dialogRef.close(true);

        },
        err => {


          Swal.fire({
            heightAuto: false,
            title: 'Ooops',
            text: err.error.message,
            icon: 'error',
            iconColor: '#01AEEF',
            showCancelButton: false,
            confirmButtonColor: '#01AEEF',
            confirmButtonText: 'OK'
          });

        }
      );


    }

  }
}
