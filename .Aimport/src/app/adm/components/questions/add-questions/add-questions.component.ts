import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdmService } from 'src/app/adm/services/adm.service';
import { CancellationQuestion } from 'src/app/clinics/returns/cancel_questions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {

  dialogTitle: string = "Cadastrar Pergunta"
  formAddQuestion: FormGroup;

  cq_name?: string;
  cq_status: string = "1";
  cq_type: string

  questions: CancellationQuestion;

  dialogButton: string;



  constructor(public dialogRef: MatDialogRef<AddQuestionsComponent>, private admService: AdmService, @Inject(MAT_DIALOG_DATA) public data: CancellationQuestion) {

    this.questions = data;

    if(this.questions != null){

      this.cq_name = this.questions.cq_name;
      this.cq_type = this.questions.cq_type.toString();
      this.cq_status = this.questions.cq_status.toString();



      this.dialogTitle = "Atualizar Pergunta";
      this.dialogButton = "Atualizar"
    }
    else {
      
      this.dialogTitle = "Cadastrar Pergunta"
      this.dialogButton = "Cadastrar"
    }

    this.formAddQuestion = new FormGroup({
      
      cq_name: new FormControl(this.cq_name, Validators.required),
      cq_type: new FormControl(this.cq_type, Validators.required),
      cq_status: new FormControl(this.cq_status, Validators.required)
     
    });
  }

  ngOnInit(): void {
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.formAddQuestion.controls[controlName].hasError(errorName);
  }

  onSubmit(){
    
    
    if(this.formAddQuestion.valid){

      var formData = this.formAddQuestion.value;


      if(this.questions != null){

      
        

        this.admService.updateQuestionCancel(this.questions.cq_id, formData).subscribe(
                data => {
        
                  Swal.fire({
                    heightAuto: false,
                    title: 'Sucesso',
                    text: "Pergunta atualizada com sucesso!",
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


        this.admService.insertQuestionsCancel(formData).subscribe(
          data => {
            
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Pergunta cadastrada com sucesso!",
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
