import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/adm/returns/categories.retunr';
import { Speciality } from 'src/app/adm/returns/specialities.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-speciality',
  templateUrl: './add-speciality.component.html',
  styleUrls: ['./add-speciality.component.scss']
})
export class AddSpecialityComponent implements OnInit {

  formAddSpeciality: FormGroup;

  speciality?: Speciality
  categories?: Category[];

  speciality_name?: string;
  speciality_status?: string = "1";
  category_id?: string;


  dialogButton;
  dialogTitle;


  constructor(public dialogRef: MatDialogRef<AddSpecialityComponent>,
    private admService: AdmService,
    @Inject(MAT_DIALOG_DATA) public data: Speciality) { 

      this.speciality = data;


      if(this.speciality != null){

        this.speciality_name = this.speciality.speciality_name;
        this.speciality_status = this.speciality.speciality_status.toString();
        this.category_id = this.speciality.category_id;
  
  
        this.dialogTitle = "Atualizar especialidade";
        this.dialogButton = "Atualizar"
      }
      else {
        
        this.dialogTitle = "Cadastrar especialidade"
        this.dialogButton = "Cadastrar"
      }
  

      this.formAddSpeciality = new FormGroup({
      
        speciality_name: new FormControl(this.speciality_name, Validators.required),
        speciality_status: new FormControl(this.speciality_status),
        category_id: new FormControl(this.category_id, Validators.required)
       
      });


    }

  ngOnInit(): void {

    

    this.getCategories();

  }


  public checkError = (controlName: string, errorName: string) => {
    return this.formAddSpeciality.controls[controlName].hasError(errorName);
  }


  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }




  getCategories(): void {

    this.admService.getCategories().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.categories = data.categories;


    })
  }

  
  onSubmit(){
    
    
    if(this.formAddSpeciality.valid){

      var formData = this.formAddSpeciality.value;


      if(this.speciality != null){
        

        this.admService.updateSpeciality(this.speciality.speciality_id, formData).subscribe(
                data => {
        
                  Swal.fire({
                    heightAuto: false,
                    title: 'Sucesso',
                    text: "Especialidade atualizada com sucesso!",
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

        this.admService.insertSpeciality(formData).subscribe(
          data => {
  
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Especialidade cadastrada com sucesso!",
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