import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cpf } from 'cpf-cnpj-validator';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-patient-clinict',
  templateUrl: './add-patient-clinict.component.html',
  styleUrls: ['./add-patient-clinict.component.css']
})
export class AddPatientClinictComponent implements OnInit {

  @ViewChild('fileInput') el?: ElementRef;
  imageUrl: any = '/assets/img/user.png';
  editFile: boolean = true;
  removeUpload: boolean = false;

  showCPF: boolean = true;
  form_visibility: boolean = false;

  dialogTitle: string = "Cadastrar paciente"

  firstFormGroup: FormGroup;

  user_id?: string;
  user_photo?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  user_cpf?: string;
  user_rg?: string;
  user_gender?: string;

  cpf?: string;

  clinic_id?: string;

  userInsert: boolean = false;

  constructor( public dialogRef: MatDialogRef<AddPatientClinictComponent>,
    private admService: AdmService,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.clinic_id = data['clinic_id']


      this.firstFormGroup = this._formBuilder.group({
        user_photo: new FormControl(this.user_photo),
        user_name: new FormControl(this.user_name, [Validators.required]),
        user_email: new FormControl(this.user_email, [Validators.required, Validators.email]),
        user_phone: new FormControl(this.user_phone, [Validators.required]),
        user_cpf: new FormControl(this.user_cpf, [Validators.required]),
        user_rg: new FormControl(this.user_rg, [Validators.required]),
        user_gender: new FormControl(this.user_gender, [Validators.required])
      });

    }

  ngOnInit(): void {



  }

  onDismiss(){
    this.dialogRef.close(false);
  }

  onSubmit(){

    

    var data1 = this.firstFormGroup.getRawValue()

    data1.user_password = (Math.floor(100000 + Math.random() * 900000)).toString();
    data1.user_photo = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    data1.user_status = 1;


    if(this.firstFormGroup.valid){

      if(this.userInsert){

        this.admService.insertUser(data1).subscribe(
          data => {


            let data2 = {
              user_id: data['user_id'],
              pc_status: 1,
              clinic_id: this.clinic_id
            }

            this.admService.insertPacientClinic(data2).subscribe(
              data => {            
                
                Swal.fire({
                  heightAuto: false,
                  title: 'Sucesso',
                  text: "Paciente cadastrado com sucesso!",
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
      else{

        let data2 = {
          user_id: this.user_id,
          pc_status: 1,
          clinic_id: this.clinic_id
        }

        this.admService.insertPacientClinic(data2).subscribe(
          data => {            
            
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Paciente cadastrado com sucesso!",
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

  uploadFile(event:any) {
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
    this.imageUrl = '/assets/img/user.png';
    this.editFile = true;
    this.removeUpload = false;
    this.firstFormGroup.patchValue({
      photo: ""
    });
  }

  searchCPF() {

    this.firstFormGroup.reset();

    this.imageUrl = '/assets/img/user.png';


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

        this.user_id = data.user.user_id;

        this.firstFormGroup.controls['user_name'].disable();
        this.firstFormGroup.controls['user_cpf'].disable();
        this.firstFormGroup.controls['user_rg'].disable();
        this.firstFormGroup.controls['user_gender'].disable();
        this.firstFormGroup.controls['user_email'].disable();
        this.firstFormGroup.controls['user_phone'].disable();
        

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
