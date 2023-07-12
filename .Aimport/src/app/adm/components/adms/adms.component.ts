import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Adm } from '../../returns/adms.return';
import { AdmService } from '../../services/adm.service';
import { AddAdmComponent } from './add-adm/add-adm.component';

@Component({
  selector: 'app-adms',
  templateUrl: './adms.component.html',
  styleUrls: ['./adms.component.scss']
})
export class AdmsComponent implements OnInit {

  
  
  displayedColumns = ['adm_status', 'user_name', 'user_email', 'user_cpf', 'user_phone', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  adms?: Adm[];


  podeAdd = true;
  podeEdit = true;
  podeRemove = true;

  
  constructor(public dialog: MatDialog,
    private admService: AdmService
    ) {
    
  }

  ngOnInit(): void {
    
    this.getAdms();

  }


  getAdms(){

    this.admService.getAdms().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.adms = data.adms;
      this.dataSource = new MatTableDataSource<Adm>(this.adms);
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



  applyFilter(filterValue: string) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }





  edit(row: Adm){

    let status = row.adm_status == 0 ? 1 : 0


    this.admService.updateADM(row.adm_id, {adm_status: status}).subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.getAdms();
    
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

  delete(row:any){

    Swal.fire({
      heightAuto: false,
      title: 'Remover Adm',
      text: "Tem certeza que deseja remover este administrador ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01AEEF',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim'
      
    }).then((result) => {
      if (result.isConfirmed) {
        this.admService.deleteAdm(row.adm_id).subscribe(data => {

          if(data.refreshToken) {
            localStorage.setItem("admToken", data.refreshToken)
          }
    
          this.getAdms();

          Swal.fire({
            heightAuto: false,
            title: 'Sucesso',
            text: 'Administrador removido com sucesso!',
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


  add(): void {


    const dialogRef = this.dialog.open(AddAdmComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: null
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAdms();
      }

    });
  }

}