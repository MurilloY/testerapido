import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Clinic } from 'src/app/adm/returns/clinic.return';
import { Dashes } from 'src/app/adm/returns/dash_clinic.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';
import { AddClinicComponent } from '../add-clinic/add-clinic.component';


@Component({
  selector: 'app-clinic-details',
  templateUrl: './clinic-details.component.html',
  styleUrls: ['./clinic-details.component.css']
})
export class ClinicDetailsComponent implements OnInit {

  clinic_id?: string;
  clinic?: Clinic

  dashes?: Dashes;

  menus = [
    {
      "name": "Gerenciar Usuários",
      "icon": "manage_accounts",
      "link": "users",
      "color": "#218565",
      "dash": "user_profile"
    },
    {
      "name": "Profissionais",
      "icon": "medical_information",
      "link": "professionals",
      "color": "#f13e32",
      "dash": "prof_clinic"
    },
    {
      "name": "Pacientes",
      "icon": "personal_injury",
      "link": "patients",
      "color": "#758D93",
      "dash": "patient_clinic"
    }

  ];


  constructor(private route: ActivatedRoute,
    private admService: AdmService,
    private router: Router,
    public dialog: MatDialog,) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.clinic_id = params['clinic_id']

      this.getClinic();
      this.getClinicDash();

    });

  }

  backClinics() {

    this.router.navigate(['/adm/clinics/']);
  }



  getClinic() {

    this.admService.getClinic(this.clinic_id!).subscribe(data => {

      this.clinic = data.clinic;

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

  getClinicDash() {

    this.admService.getDashClinic(this.clinic_id!).subscribe(data => {

      this.dashes = data.dashes;

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

  edit() {
    const dialogRef = this.dialog.open(AddClinicComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: this.clinic
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getClinic();
      }

    });
  }

  goToNext(route: string) {


    let rota = `/adm/clinics/${this.clinic_id}/${route}`

    this.router.navigate([rota]);


  }

}
