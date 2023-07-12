import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Speciality } from '../../returns/specialities.return';
import { AdmService } from '../../services/adm.service';
import { AddSpecialityComponent } from './add-speciality/add-speciality.component';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.scss']
})
export class SpecialtiesComponent implements OnInit {

  displayedColumns = ['speciality_status', 'speciality_name', 'category_name', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  specialities?: Speciality[];
  
  constructor(public dialog: MatDialog,
    private admService: AdmService,
    private router: Router
    ) {
    
  }

  ngOnInit(): void {
    
    this.getSpecialities();

  }


  getSpecialities(){

    this.admService.getSpecialities().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.specialities = data.specialities;
      this.dataSource = new MatTableDataSource<Speciality>(this.specialities);
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

    const dialogRef = this.dialog.open(AddSpecialityComponent, {
      width: '400px',
      disableClose: false,
      maxHeight: '90vh',
      data: row
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getSpecialities();
      }

    });
  }


  add(): void {


    const dialogRef = this.dialog.open(AddSpecialityComponent, {
      width: '400px',
      disableClose: false,
      maxHeight: '90vh',
      data: null
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getSpecialities();
      }

    });
  }

}