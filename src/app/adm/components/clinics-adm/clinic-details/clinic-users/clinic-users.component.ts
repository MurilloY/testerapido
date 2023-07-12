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
import { Clinica } from 'src/app/adm/returns/clinicbyid_return';
import { Profile } from 'src/app/adm/returns/profiles.return';

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
  clinic_info: Clinica
  profiles?: Profile[];
  updatestatus: any

  constructor(
    private route: ActivatedRoute,
    private admService: AdmService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.clinic_id = params['clinic_id']

      this.getClinic();
      this.getClinica()
      this.getProfiles()
    });
  }

  updateStatusUserProfile(data:any) {
    let dados = {
      up_status: data["up_status"] === 1 ? 0 : 1
    }
    this.admService.updateStatusUserProfile(data["up_id"], dados).subscribe(data => {
      this.updatestatus = data
      this.getUsersProfile()
    })
  }

  getClinica() {
    this.admService.clinicByid(this.clinic_id!).subscribe(
      data => {
        this.clinic_info = data.clinic;
        console.log(this.clinic_info);


      },
      err => {

      }
    );
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

  getProfiles(){

    this.admService.getProfiles('1', this.clinic_id!).subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.profiles = data.profile;
      this.dataSource.paginator = this.paginator;
    
    }
  )}
  

  getUsersProfile(){

    this.admService.getUsersProfile('1', this.clinic_id!).subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.users_profile = data.UserProfiles;
      console.log(this.users_profile)

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

  
  addUser() {
    if (this.profiles?.length !== 0) {
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
    } else {
      Swal.fire({
        heightAuto: false,
        title: 'Aviso',
        text: 'Por favor, cadastre um perfil primeiro.',
        icon: 'warning',
        iconColor: '#01AEEF',
        showCancelButton: false,
        confirmButtonColor: '#01AEEF',
        confirmButtonText: 'OK'
      });
    }
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

  delete(data:any){

    console.log(data)

  }


}
