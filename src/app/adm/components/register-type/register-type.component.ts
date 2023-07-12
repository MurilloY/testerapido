import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { RegisterType } from '../../returns/register_types.return';
import { AdmService } from '../../services/adm.service';
import { AddRegisterTypeComponent } from './add-register-type/add-register-type.component';

@Component({
  selector: 'app-register-type',
  templateUrl: './register-type.component.html',
  styleUrls: ['./register-type.component.scss']
})
export class RegisterTypeComponent implements OnInit {

   
  
  displayedColumns = ['rt_name', 'rt_desc', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  register_types?: RegisterType[];

  
  constructor(public dialog: MatDialog,
    private admService: AdmService
    ) {
    
  }

  ngOnInit(): void {
    
    this.getRegisters();

  }



  getRegisters(){

    this.admService.getRegisterTypes().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.register_types = data.register_types;
      this.dataSource = new MatTableDataSource<RegisterType>(this.register_types);
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





  edit(row:any){

    const dialogRef = this.dialog.open(AddRegisterTypeComponent, {
      width: '400px',
      disableClose: false,
      maxHeight: '90vh',
      data: row
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getRegisters();
      }

    });
  }


  add(): void {


    const dialogRef = this.dialog.open(AddRegisterTypeComponent, {
      width: '400px',
      disableClose: false,
      maxHeight: '90vh',
      data: null
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getRegisters();
      }

    });
  }

}