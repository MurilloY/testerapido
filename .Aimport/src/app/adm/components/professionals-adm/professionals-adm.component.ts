import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Professional } from '../../returns/professionals.return';
import { AdmService } from '../../services/adm.service';
import { AddProfessionalComponent } from './add-professional/add-professional.component';

@Component({
  selector: 'app-professionals-adm',
  templateUrl: './professionals-adm.component.html',
  styleUrls: ['./professionals-adm.component.scss']
})
export class ProfessionalsAdmComponent implements OnInit {

  profissinals?: Professional[];

  displayedColumns = ['prof_status', 'user_name', 'user_cpf', 'user_phone', 'specialties', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(public dialog: MatDialog, private admService: AdmService) { }

  ngOnInit(): void {

    this.getAllProfessionals();
  }

  addProfessinal(): void {


    const dialogRef = this.dialog.open(AddProfessionalComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: null
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAllProfessionals();
      }

    });
  }

  getAllProfessionals(){

    this.admService.getAllProfessionals().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.profissinals = data.professionals;


      this.dataSource = new MatTableDataSource<Professional>(this.profissinals);
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

  goToProfissional(data:any){

  }

  edit(data:Professional){


    const dialogRef = this.dialog.open(AddProfessionalComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: data
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAllProfessionals();
      }

    });

  }

}
