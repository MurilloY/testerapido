import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterType } from 'src/app/adm/returns/register_types.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-register-type',
  templateUrl: './add-register-type.component.html',
  styleUrls: ['./add-register-type.component.scss']
})
export class AddRegisterTypeComponent implements OnInit {
  formAddRegister: FormGroup;

  register_types?: RegisterType;

  rt_name?: string;
  rt_desc?: string;

  dialogButton: string;
  dialogTitle: string;

  constructor(public dialogRef: MatDialogRef<AddRegisterTypeComponent>,
    private admService: AdmService,
    @Inject(MAT_DIALOG_DATA) public data: RegisterType) {

      this.register_types = data;


      if(this.register_types != null){

        this.rt_name = this.register_types.rt_name;
        this.rt_desc = this.register_types.rt_desc;

  
  
        this.dialogTitle = "Atualizar tipo de registro";
        this.dialogButton = "Atualizar"
      }
      else {
        
        this.dialogTitle = "Cadastrar tipo de registro"
        this.dialogButton = "Cadastrar"
      }
      
      this.formAddRegister = new FormGroup({
      
        rt_name: new FormControl(this.rt_name, Validators.required),
        rt_desc: new FormControl(this.rt_desc, Validators.required)
       
      });



    }

  ngOnInit(): void {

    
  }


  public checkError = (controlName: string, errorName: string) => {
    return this.formAddRegister.controls[controlName].hasError(errorName);
  }


  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }




  
  onSubmit(){
    
    
    if(this.formAddRegister.valid){

      var formData = this.formAddRegister.value;


      if(this.register_types != null){

      
        

        this.admService.updateRegister(this.register_types.rt_id, formData).subscribe(
                data => {
        
                  Swal.fire({
                    heightAuto: false,
                    title: 'Sucesso',
                    text: "Tipo de registro atualizado com sucesso!",
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


        this.admService.insertRegister(formData).subscribe(
          data => {
            
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Tipo de registro cadastrado com sucesso!",
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