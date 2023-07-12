import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Clinic } from 'src/app/adm/returns/clinic.return';
import { PatientClinic } from 'src/app/adm/returns/patients.return';
import { UserProfile } from 'src/app/adm/returns/users_profile.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';
import { AddUserProfileComponent } from '../clinic-users/add-user-profile/add-user-profile.component';
import { AddPatientClinictComponent } from './add-patient-clinict/add-patient-clinict.component';

@Component({
  selector: 'app-patients-clinic',
  templateUrl: './patients-clinic.component.html',
  styleUrls: ['./patients-clinic.component.css']
})
export class PatientsClinicComponent implements OnInit {

 
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns = ['user_picture', 'user_name', 'user_cpf', 'user_phone', 'status', 'action'];
  dataSource: any;

  clinic_id?: string;
  clinic?: Clinic
  patients?: PatientClinic[];

  constructor(
    private route: ActivatedRoute,
    private admService: AdmService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.clinic_id = params['clinic_id']

      this.getClinic();
    });
  }

  getClinic() {

    this.admService.getClinic(this.clinic_id!).subscribe(data => {

      this.clinic = data.clinic;

      this.getPatientsOfClinic();

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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getPatientsOfClinic(){

    this.admService.getPatientsOfClinic(this.clinic_id!).subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.patients = data.patients_clinic;
      this.dataSource = new MatTableDataSource<PatientClinic>(this.patients);
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

  backClinics() {

    this.router.navigate(['/adm/clinics/']);
  }

  backClinic() {

    this.router.navigate([`/adm/clinics/${this.clinic_id}`]);
  }

  
  addPatient(){
    const dialogRef = this.dialog.open(AddPatientClinictComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        clinic_id: this.clinic_id
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getPatientsOfClinic();
      }

    });
  }

  editUser(data:any){

  }

}
