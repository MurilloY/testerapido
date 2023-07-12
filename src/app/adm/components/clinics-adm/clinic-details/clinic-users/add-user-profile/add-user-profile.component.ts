import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cpf } from 'cpf-cnpj-validator';
import { AddAdmComponent } from 'src/app/adm/components/adms/add-adm/add-adm.component';
import { Adm } from 'src/app/adm/returns/adms.return';
import { Profile } from 'src/app/adm/returns/profiles.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user-profile',
  templateUrl: './add-user-profile.component.html',
  styleUrls: ['./add-user-profile.component.css']
})
export class AddUserProfileComponent implements OnInit {


  @ViewChild('fileInput') el?: ElementRef;
  imageUrl: any = '/assets/img/user.png';
  editFile: boolean = true;
  removeUpload: boolean = false;

  form_visibility: boolean = false;

  clinic_id?: string;
  profiles?: Profile[];

  dialogTitle: string = "Cadastrar usuário do sistema"

  firstFormGroup: FormGroup;

  user_id?: string;
  user_photo?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  user_cpf?: string;
  user_rg?: string;
  user_gender?: string;
  pro_id?: string;
  status: string = '1';
  birth_data: string
  photodefault = true;
  photobase64: any;

  cpf?: string;

  user?: any;

  userInsert: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddAdmComponent>,
    private admService: AdmService,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {



    this.clinic_id = data['clinic_id'];
    this.user = data['user'];

    this.getProfiles();

    if (this.user != null) {

      this.dialogTitle = "Editar usuário do sistema"

      this.form_visibility = true;

      this.user_id = this.user['user_id'];
      this.user_photo = this.user['user_photo'];
      this.user_name = this.user['user_name'];
      this.user_email = this.user['user_email'];
      this.user_phone = this.user['user_phone'];
      this.user_cpf = this.user['user_cpf'];
      this.user_rg = this.user['user_rg'];
      this.user_gender = this.user['user_gender'];;
      this.pro_id = this.user['pro_id'];
      this.status = this.user['up_status'].toString();
      this.birth_data = this.user['birth_data'].toString();


    }





    this.firstFormGroup = this._formBuilder.group({
      user_photo: new FormControl(this.photobase64),
      user_name: new FormControl(this.user_name, [Validators.required]),
      user_email: new FormControl(this.user_email, [Validators.required, Validators.email]),
      user_phone: new FormControl(this.user_phone, [Validators.required]),
      user_cpf: new FormControl(this.user_cpf, [Validators.required]),
      user_rg: new FormControl(this.user_rg, [Validators.required]),
      user_gender: new FormControl(this.user_gender, [Validators.required]),
      pro_id: new FormControl(this.pro_id, [Validators.required]),
      status: new FormControl(this.status, [Validators.required]),
      birth_data: new FormControl(this.birth_data, [Validators.required]),
    });

  }

  ngOnInit(): void {


  }

  getProfiles() {

    this.admService.getProfiles('1', this.clinic_id!).subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.profiles = data.profile;


    }, err => {

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

    })
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onSubmit() {


    if (this.firstFormGroup.valid) {

      var data1 = this.firstFormGroup.getRawValue()

      data1.user_password = (Math.floor(100000 + Math.random() * 900000)).toString();
      data1.user_photo = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      data1.user_status = 1;
      data1.photoisdefault = this.photodefault

      if(this.user != null){

        let data2 = {
          pro_id: this.firstFormGroup.get('pro_id')?.value,
          status: this.firstFormGroup.get('status')?.value

        }

        this.admService.updatetUserProfile(this.user['up_id'], data2).subscribe(
          data => {

            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Administrador atualizado com sucesso!",
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
      else{

        if (this.userInsert) {

          this.admService.insertUser(data1).subscribe(
            data => {              
  
              let data2 = {
                user_id: data['user_id'],
                pro_id: this.firstFormGroup.get('pro_id')?.value,
                pan_id: '1',
                id: this.clinic_id,
                status: this.firstFormGroup.get('status')?.value
  
              }
  
              this.admService.insertUserProfile(data2).subscribe(
                data => {
  
                  Swal.fire({
                    heightAuto: false,
                    title: 'Sucesso',
                    text: "Administrador cadastrado com sucesso!",
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
        else {
  
          let data3 = {
            user_id: this.user_id,
            pro_id: this.firstFormGroup.get('pro_id')?.value,
            pan_id: '1',
            id: this.clinic_id,
            status: this.firstFormGroup.get('status')?.value
  
          }
  
          this.admService.insertUserProfile(data3).subscribe(
            data => {
  
              Swal.fire({
                heightAuto: false,
                title: 'Sucesso',
                text: "Usuário cadastrado com sucesso!",
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



  }

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let photo = event.target.files[0];

    this.firstFormGroup.patchValue({
      photo: photo
    });



    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(photo);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.photodefault = false;
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el!.nativeElement.files);
    this.imageUrl = '/assets/images/user.png';
    this.editFile = true;
    this.removeUpload = false;
    this.photodefault = true
    this.firstFormGroup.patchValue({
      photo: this.photobase64
    });
  }

  searchCPF() {

    // this.firstFormGroup.reset();

    this.imageUrl = '/assets/images/user.png';


    if (cpf.isValid(this.cpf!)) {



      this.admService.getUserCPF(this.cpf!).subscribe(data => {

        this.form_visibility = true;

        this.imageUrl = data.user.user_photo;


        this.firstFormGroup.get("user_photo")!.setValue(data.user.user_photo);
        this.firstFormGroup.get("user_name")!.setValue(data.user.user_name);
        this.firstFormGroup.get("user_email")!.setValue(data.user.user_email);
        this.firstFormGroup.get("user_gender")!.setValue(data.user.user_gender);
        this.firstFormGroup.get("user_rg")!.setValue(data.user.user_rg);
        this.firstFormGroup.get("user_cpf")!.setValue(data.user.user_cpf);
        this.firstFormGroup.get("user_phone")!.setValue(data.user.user_phone);
        this.firstFormGroup.get("birth_data")!.setValue(new Date(data.user.birth_data + ' 00:00:00'));

        this.user_id = data.user.user_id;

        this.firstFormGroup.controls['user_name'].disable();
        this.firstFormGroup.controls['user_cpf'].disable();
        this.firstFormGroup.controls['user_rg'].disable();
        this.firstFormGroup.controls['user_gender'].disable();
        this.firstFormGroup.controls['user_email'].disable();
        this.firstFormGroup.controls['user_phone'].disable();
        this.firstFormGroup.controls['birth_data'].disable();


        this.userInsert = false;


      },
        err => {

          this.user_id = undefined;

          if (err.error.status_code == 400) {
            this.form_visibility = false;
            Swal.fire("Ooops.", err.error.message, "error");
          }

          if (err.error.status_code == 404) {

            this.form_visibility = true;
            this.firstFormGroup.get("user_cpf")!.setValue(this.cpf);

            this.firstFormGroup.controls['user_cpf'].disable();

            this.userInsert = true;

          }


        })

    }
    else {
      Swal.fire("CPF inválido", "Por favor digite um CPF válido", "error");
    }





  }


  public checkError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }

}