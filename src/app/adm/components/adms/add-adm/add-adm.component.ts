import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cpf } from 'cpf-cnpj-validator';
import { Adm } from 'src/app/adm/returns/adms.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-adm',
  templateUrl: './add-adm.component.html',
  styleUrls: ['./add-adm.component.scss']
})
export class AddAdmComponent implements OnInit {

 
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = '/assets/images/user.png';
  editFile: boolean = true;
  removeUpload: boolean = false;

  showCPF: boolean = true;
  form_visibility: boolean = false;

  dialogTitle: string = "Cadastrar Administrador"

  firstFormGroup: FormGroup;

  photodefault = true;
  photobase64: any;


  user_id?: string;
  user_photo?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  user_cpf?: string;
  user_rg?: string;
  user_gender?: string;
  birth_data?: string;

  cpf?: string;

  userInsert: boolean = false;

  constructor( public dialogRef: MatDialogRef<AddAdmComponent>,
    private admService: AdmService,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: Adm) { 


      this.firstFormGroup = this._formBuilder.group({
        user_photo: new FormControl(this.photobase64),
        user_name: new FormControl(this.user_name, [Validators.required]),
        user_email: new FormControl(this.user_email, [Validators.required, Validators.email]),
        user_phone: new FormControl(this.user_phone, [Validators.required]),
        user_cpf: new FormControl(this.user_cpf, [Validators.required]),
        user_rg: new FormControl(this.user_rg, [Validators.required]),
        user_gender: new FormControl(this.user_gender, [Validators.required]),
        birth_data: new FormControl(this.birth_data, [Validators.required])
      });

    }

  ngOnInit(): void {



  }

  onDismiss(){
    this.dialogRef.close(false);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.firstFormGroup.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }

    console.log('Sistema', invalid)
    return invalid;
}


  onSubmit(){

    

    var data1 = this.firstFormGroup.getRawValue()

    data1.user_password = (Math.floor(100000 + Math.random() * 900000)).toString();
    data1.photoisdefault = this.photodefault
    data1.user_status = 1;

    this.findInvalidControls()

    if(this.firstFormGroup.valid){

      if(this.userInsert){

        this.admService.insertUser(data1).subscribe(
          data => {


            let data2 = {
              user_id: data['user_id'],
              adm_status: 1
              
            }

            this.admService.insertUserAdm(data2).subscribe(
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
      else{

        let data3 = {
          user_id: this.user_id,
          adm_status: 1,

        }

        this.admService.insertUserAdm(data3).subscribe(
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

      }


    }
    


  }

  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let photo = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(photo);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.photodefault = false;
        this.editFile = false;
        this.removeUpload = true;

        this.firstFormGroup.patchValue({
          user_photo: reader.result
        });
        
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = '/assets/images/user.png';
    this.editFile = true;
    this.removeUpload = false;
    this.photodefault = true

    // When file uploads set it to file formcontrol
    this.firstFormGroup.patchValue({
      user_photo:  this.photobase64
    });

  }

  convertToB64() {
    
    this.admService.convertToB64('/assets/images/user.png').subscribe(data => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;
        this.photobase64 = base64data

        this.firstFormGroup.patchValue({
          user_photo: this.photobase64
        });
      }

      reader.readAsDataURL(data);


    })

  }

  searchCPF() {

    this.firstFormGroup.reset();

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
        this.firstFormGroup.get("birth_data")!.setValue(data.user.birth_data);

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
