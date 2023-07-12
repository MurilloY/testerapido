import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Clinic } from 'src/app/adm/returns/clinic.return';
import { Professional } from 'src/app/adm/returns/professional_clinic.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';
import { AddProfessionalClinicComponent } from './add-professional-clinic/add-professional-clinic.component';

@Component({
  selector: 'app-professionals-clinic',
  templateUrl: './professionals-clinic.component.html',
  styleUrls: ['./professionals-clinic.component.css']
})
export class ProfessionalsClinicComponent implements OnInit {

  profissinals?: Professional[];

  clinic_id?: string;
  clinic?: Clinic;

  displayedColumns = ['prof_status', 'user_name', 'user_cpf', 'user_phone', 'specialties', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(public dialog: MatDialog, 
    private admService: AdmService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.clinic_id = params['clinic_id']

      this.getClinic();
    });
  }

  getClinic() {

    this.admService.getClinic(this.clinic_id!).subscribe(data => {

      this.clinic = data.clinic;

      this.getProfessionalsOfClinic();

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

    });
  }

  addProfessinal(): void {


    const dialogRef = this.dialog.open(AddProfessionalClinicComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        professional: null,
        clinic_id: this.clinic_id
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getProfessionalsOfClinic();
      }

    });
  }

  getProfessionalsOfClinic(){

    this.admService.getProfessionalsByClinic(this.clinic_id!).subscribe(data => {

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


    const dialogRef = this.dialog.open(AddProfessionalClinicComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: data
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getProfessionalsOfClinic();
      }

    });

  }

  backClinics() {

    this.router.navigate(['/adm/clinics/']);
  }

  backClinic() {

    this.router.navigate([`/adm/clinics/${this.clinic_id}`]);
  }

}
