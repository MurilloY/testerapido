import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Clinic } from 'src/app/adm/returns/clinic.return';
import { Profile } from 'src/app/adm/returns/profiles.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';
import { AddProfileComponent } from './add-profile/add-profile.component';

@Component({
  selector: 'app-clinic-users-profile',
  templateUrl: './clinic-users-profile.component.html',
  styleUrls: ['./clinic-users-profile.component.css']
})
export class ClinicUsersProfileComponent implements OnInit {

  displayedColumns = ['pro_name', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  clinic_id?: string;
  clinic?: Clinic;

  profiles?: Profile[];



  constructor(
    private route: ActivatedRoute,
    private admService: AdmService,
    private router: Router,
    public dialog: MatDialog
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

      this.getProfiles();

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
  getProfiles(){

    this.admService.getProfiles('1', this.clinic_id!).subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.profiles = data.profile;
      this.dataSource = new MatTableDataSource<Profile>(this.profiles);
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

  addProfile(){
    const dialogRef = this.dialog.open(AddProfileComponent, {
      width: '420px',
      disableClose: false,
      maxHeight: '90vh',
      data: {
        profile: null,
        clinic_id: this.clinic_id
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getProfiles();
      }

    });
  }

  editProfile(data:any){

    const dialogRef = this.dialog.open(AddProfileComponent, {
      width: '420px',
      disableClose: false,
      maxHeight: '90vh',
      data: {
        profile: data,
        clinic_id: this.clinic_id
      }
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getProfiles();
      }

    });

  }

}
