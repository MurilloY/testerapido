import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Clinic } from 'src/app/adm/returns/clinic.return';
import { UserProfile } from 'src/app/adm/returns/users_profile.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';
import { AddUserProfileComponent } from './add-user-profile/add-user-profile.component';

@Component({
  selector: 'app-clinic-users',
  templateUrl: './clinic-users.component.html',
  styleUrls: ['./clinic-users.component.css']
})
export class ClinicUsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns = ['user_picture', 'user_name', 'perfis', 'status', 'action'];
  dataSource: any;

  clinic_id?: string;
  clinic?: Clinic
  users_profile?: UserProfile[];

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

      this.getUsersProfile();

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
  

  getUsersProfile(){

    this.admService.getUsersProfile('1', this.clinic_id!).subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.users_profile = data.UserProfiles;

      this.dataSource = new MatTableDataSource<UserProfile>(this.users_profile);
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

  
  addUser(){
    const dialogRef = this.dialog.open(AddUserProfileComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        clinic_id: this.clinic_id,
        user: null
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getUsersProfile();
      }

    });
  }

  editUser(data:any){

    const dialogRef = this.dialog.open(AddUserProfileComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        clinic_id: this.clinic_id,
        user: data
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getUsersProfile();
      }

    });

  }

}
