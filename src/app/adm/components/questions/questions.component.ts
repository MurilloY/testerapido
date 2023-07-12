import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CancellationQuestion } from '../../returns/questionscancel';
import { AdmService } from '../../services/adm.service';
import { AddQuestionsComponent } from './add-questions/add-questions.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  displayedColumns = ['cq_status', 'cq_name', 'ct_name', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  podeAdd = true;
  podeEdit = true;
  podeRemove = true;

  questions: CancellationQuestion[];


  constructor(public dialog: MatDialog, private admService: AdmService) { }

  ngOnInit(): void {
    this.getQuestions()
  }

  getQuestions(){

    this.admService.getQuestionsCancel().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.questions = data.cancellation_question;
      this.dataSource = new MatTableDataSource<CancellationQuestion>(this.questions);
      this.dataSource.paginator = this.paginator;
    
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

  add(): void {

    const dialogRef = this.dialog.open(AddQuestionsComponent, {
      width: '490px',
      disableClose: false,
      maxHeight: '90vh',
      data: null
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getQuestions();
      }

    });
  }

  edit(row: CancellationQuestion){

    const dialogRef = this.dialog.open(AddQuestionsComponent, {
      width: '490px',
      disableClose: false,
      maxHeight: '90vh',
      data: row
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getQuestions();
      }

    });

    
  }

  delete(row:any){

    Swal.fire({
      heightAuto: false,
      title: 'Remover Pergunta',
      text: "Tem certeza que deseja remover esta pergunta ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01AEEF',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.admService.deleteQuestionCancel(row.cq_id).subscribe(data => {

          if(data.refreshToken) {
            localStorage.setItem("admToken", data.refreshToken)
          }
    
          this.getQuestions();

          Swal.fire({
            heightAuto: false,
            title: 'Sucesso',
            text: 'Pergunta removida com sucesso!',
            icon: 'success',
            iconColor: '#01AEEF',
            showCancelButton: false,
            confirmButtonColor: '#01AEEF',
            confirmButtonText: 'OK'
          });
        
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
    })

    
    
  }

  // edit(row: Adm){

  //   let status = row.adm_status == 0 ? 1 : 0


  //   this.admService.updateADM(row.adm_id, {adm_status: status}).subscribe(data => {

  //     if(data.refreshToken) {
  //       localStorage.setItem("admToken", data.refreshToken)
  //     }

  //     // this.getAdms();
    
  //   }, err => {

  //     Swal.fire({
  //       heightAuto: false,
  //       title: 'Ooops',
  //       text: err.error.message,
  //       icon: 'error',
  //       iconColor: '#01AEEF',
  //       showCancelButton: false,
  //       confirmButtonColor: '#01AEEF',
  //       confirmButtonText: 'OK'
  //     });
      
  //   })

    
  // }

  

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  

}
