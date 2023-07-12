import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/adm/returns/categories.retunr';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  
  formAddCategory: FormGroup;

  category?: Category;

  category_name?: string;
  category_status: string = "1";


  dialogButton: string;
  dialogTitle: string;

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
    private admService: AdmService,
    @Inject(MAT_DIALOG_DATA) public data: Category) {

      this.category = data;


      if(this.category != null){

        this.category_name = this.category.category_name;
        this.category_status = this.category.category_status.toString();

  
  
        this.dialogTitle = "Atualizar categoria";
        this.dialogButton = "Atualizar"
      }
      else {
        
        this.dialogTitle = "Cadastrar categoria"
        this.dialogButton = "Cadastrar"
      }
      
      this.formAddCategory = new FormGroup({
      
        category_name: new FormControl(this.category_name, Validators.required),
        category_status: new FormControl(this.category_status, Validators.required)
       
      });



    }

  ngOnInit(): void {

    
  }


  public checkError = (controlName: string, errorName: string) => {
    return this.formAddCategory.controls[controlName].hasError(errorName);
  }


  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }




  
  onSubmit(){
    
    
    if(this.formAddCategory.valid){

      var formData = this.formAddCategory.value;


      if(this.category != null){

      
        

        this.admService.updateCategory(this.category.category_id, formData).subscribe(
                data => {
        
                  Swal.fire({
                    heightAuto: false,
                    title: 'Sucesso',
                    text: "Categoria atualizada com sucesso!",
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


        this.admService.insertCategory(formData).subscribe(
          data => {
            
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Categoria cadastrada com sucesso!",
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