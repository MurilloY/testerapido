import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { AddChatPhotoComponent } from '../add-chat-photo/add-chat-photo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-chat-anexos',
  templateUrl: './add-chat-anexos.component.html',
  styleUrls: ['./add-chat-anexos.component.scss']
})
export class AddChatAnexosComponent implements OnInit {

  
  formAnexo: FormGroup;
  file: File | null;
  pc_id: string;
  clinic_id: string;
  token: string;
  app_id: string;
  user_id_pacient: string;
  who: string;
  imageBase64: any = null;
  url: string;

  disabled = false;

  fileName = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private appointmentService: AppointmentService,
    public dialog: MatDialog,
    private router: Router,
    private dialogRef: MatDialogRef<AddChatAnexosComponent>
  ) {

    this.formAnexo = new FormGroup({
      ane_name: new FormControl('', Validators.required)
    });

    this.pc_id = data['pc_id'];
    this.app_id = data['app_id'];

    if (data['file'] != null) {

      let reader = new FileReader();
      reader.readAsDataURL(data['file']);

      // When file uploads set it to file formcontrol
      reader.onload = () => {

        this.imageBase64 = reader.result;

      }

      this.fileName = data['file'].name;

      this.formAnexo.controls['ane_name'].setValue(this.fileName.split('.')[0]);

    }
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

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    let reader = new FileReader();

    if (this.file) {

      reader.readAsDataURL(this.file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {

        this.imageBase64 = reader.result;

      }

      this.fileName = this.file.name;

      this.formAnexo.controls['ane_name'].setValue(this.fileName.split('.')[0]);
    }
  }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  onConfirmClick(): void {



    let data = this.formAnexo.value;
    data.user_id = this.user_id_pacient;
    data.clinic_id = this.clinic_id;
    data.who = this.who;
    data.file = this.imageBase64;
    data.app_id = this.app_id;

    if (this.formAnexo.valid && this.imageBase64 != null) {

      this.disabled = true;

      this.appointmentService.insertAnexo(data, this.token).subscribe(
        data => {
          this.dialogRef.close(true);
        },
        err => {

          this.disabled = false;

        }
      );

    }
  }
  removeFile() {
    this.fileName = ''
    this.formAnexo.controls['ane_name'].setValue('')
    this.file = null;
    this.imageBase64 = null;
  }


  getVerifyUrl() {

    this.appointmentService.getVerifyUrl(this.url).subscribe(
      data => {

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


  takePicture(): void {
    const dialogRef = this.dialog.open(AddChatPhotoComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,

    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        if (dialogResult.hasOwnProperty('ok')) {

          this.imageBase64 = dialogResult['photo']

          this.fileName = "foto.jpeg"

          this.formAnexo.controls['ane_name'].setValue('foto');



        }


      }

    });
  }

}