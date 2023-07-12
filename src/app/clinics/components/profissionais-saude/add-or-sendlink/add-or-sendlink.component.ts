import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddProfessionalComponent } from '../add-professional/add-professional.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Clinic } from 'src/app/clinics/returns/clinic_by_user.return';
import { ClinicService } from 'src/app/clinics/services/clinic.service';
import { Router } from '@angular/router';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-add-or-sendlink',
  templateUrl: './add-or-sendlink.component.html',
  styleUrls: ['./add-or-sendlink.component.scss']
})
export class AddOrSendlinkComponent implements OnInit {

  clinic: Clinic;
  formAddorSendLink: FormGroup;
  status: string = "1";
  user_phone: string;
  user_email: string;
  user?: any;
  clinic_subdomain: string;
  button_disabled: boolean = false


  constructor(private dialog: MatDialog, private clinicService: ClinicService, private router: Router, public dialogRef: MatDialogRef<AddOrSendlinkComponent>) {
    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);
    console.log(this.user)

    let url = this.router.url;
    let split = url.split("/");
    this.clinic_subdomain = split[2];

    this.formAddorSendLink = new FormGroup({

      status: new FormControl(this.status, [Validators.required]),
      user_phone: new FormControl(this.user_phone),
      user_email: new FormControl(this.user_email),


    });
  }

  ngOnInit(): void {
    this.getClinica()
  }

  addProfessional() {
    const dialogRef = this.dialog.open(AddProfessionalComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: true,
      data: {
        clinic: this.clinic,
        professional: null
      }

    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {
        this.dialogRef.close(false);
      }

    });
  }

  sendLink() {
    let data = this.formAddorSendLink.getRawValue();
    data.clinic_id = this.clinic.clinic_id;
    data.who_invited = this.user.user_id
    

    let desc = "Link enviado com sucesso."

    if (this.formAddorSendLink.value.user_phone !== null || this.formAddorSendLink.value.user_email !== null) {
      this.button_disabled = true
      this.clinicService.sendLinkProfessional(data).subscribe(
        data => {
          console.log(data);
          const dialogRef = this.dialog.open(ConfirmdialogComponent, {
            data: {
              version: 1,
              title: "SUCESSO",
              desc: desc,
              button_confirm: "OK",
              button_cancel: "Cancelar"
            },
          });
          this.dialogRef.close(true);
        }, err => {
          this.button_disabled = false
        }
      )
    }else{
      let desc1 = "Preencha um dos campos para enviar."
      const dialogRef = this.dialog.open(ConfirmdialogComponent, {
        data: {
          version: 1,
          title: "Oooops",
          desc: desc1,
          button_confirm: "OK",
        },
      });
    }
  }

  getClinica() {
    this.clinicService.selectClinicByUser(this.user?.user_id, this.clinic_subdomain).subscribe(
      data => {
        console.log(data);
        this.clinic = data.clinic;
      },
      err => {

      }
    );
  }

}
