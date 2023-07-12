import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PatientClinic } from 'src/app/professional/returns/pacient_clinic_return';
import { ProfessionalService } from 'src/app/professional/services/professional.service';
import { AddPhotoComponent } from '../add-photo/add-photo.component';

@Component({
  selector: 'app-modal-anexo',
  templateUrl: './modal-anexo.component.html',
  styleUrls: ['./modal-anexo.component.scss']
})
export class ModalAnexoComponent implements OnInit {

  formAnexo: FormGroup;
  file: File | null;
  user: any;
  pc_id: string;
  app_id: string;
  patient_clinic?: PatientClinic
  imageBase64: any = null;

  disabled = false;

  fileName = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private professionalService: ProfessionalService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalAnexoComponent>
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

    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    this.getPacientClinic();
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

      // const formData = new FormData();

      // formData.append("thumbnail", file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
    }
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
    data.user_id = this.patient_clinic?.user_id;
    data.clinic_id = this.patient_clinic?.clinic_id;
    data.who = this.user.user_id;
    data.file = this.imageBase64;
    data.app_id = this.app_id;

    if (this.formAnexo.valid && this.imageBase64 != null) {

      this.disabled = true;

      this.professionalService.insertAnexo(data).subscribe(
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


  takePicture(): void {
    const dialogRef = this.dialog.open(AddPhotoComponent, {
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
