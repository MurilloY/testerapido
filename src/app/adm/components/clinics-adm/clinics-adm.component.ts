import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Clinic } from '../../returns/clinics.return';
import { AdmService } from '../../services/adm.service';
import { AddClinicComponent } from './add-clinic/add-clinic.component';

@Component({
  selector: 'app-clinics-adm',
  templateUrl: './clinics-adm.component.html',
  styleUrls: ['./clinics-adm.component.scss']
})
export class ClinicsAdmComponent implements OnInit {

  
  displayedColumns = ['clinic_status', 'clinic_name', 'clinic_cnpj', 'clinic_city', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  clinics?: Clinic[];


  podeAdd = true;
  podeEdit = true;
  podeRemove = true;

  
  constructor(public dialog: MatDialog,
    private admService: AdmService,
    private router: Router
    ) {
    
  }

  ngOnInit(): void {
    
    this.getAllClinics();

  }

  goToClinic(data:any){

    this.router.navigate(['adm/clinics', data['clinic_id']]);


  }


  getAllClinics(){

    this.admService.getAllClinics().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.clinics = data.clinics;
      this.dataSource = new MatTableDataSource<Clinic>(this.clinics);
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

    const dialogRef = this.dialog.open(AddClinicComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: row
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAllClinics();
      }

    });
  }

  addUsuarios(clinic: any) {
    this.router.navigate(['adm/clinics', clinic['clinic_id']]);
  }


  addClinic(): void {


    const dialogRef = this.dialog.open(AddClinicComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: null
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAllClinics();
      }

    });
  }

}