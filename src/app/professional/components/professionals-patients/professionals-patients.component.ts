import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalService } from '../../services/professional.service';
import { Pacient } from '../../returns/pacients_by_prof';
import { PatientsInfoComponent } from './patients-info/patients-info.component';
import { PatientClinic } from '../../returns/pacient_clinic_return';
import { RoutepreviousService } from '../../services/routeprevious.service';


@Component({
  selector: 'app-professionals-patients',
  templateUrl: './professionals-patients.component.html',
  styleUrls: ['./professionals-patients.component.scss']
})
export class ProfessionalsPatientsComponent implements OnInit {

  user?: any;
  // clinic: Clinic;
  pacients: Pacient[]
  // dashes?: Dashes;
  clinic_subdomain: string;
  paid: number = 0;
  pending: number = 0

  prof_id: string

  sortedData: Pacient[] = [];
  sortDirection: string = 'asc';

  paySelected: number | null;

  today = new Date();

  p: number = 1;
  totalItens: number = 5;

  constructor(private dialog: MatDialog, private professionalService: ProfessionalService, private router: Router, 
    private route: ActivatedRoute,) {

    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    this.prof_id = this.user['prof_id']

    document.body.classList.add('body-etapas');

    let url = this.router.url;
    let split = url.split("/");
    this.clinic_subdomain = split[2];
  }

  ngOnInit(): void {
    // this.getClinica();
    this.getPacientLastappointments()
  }

  // getDashes() {
  //   this.professionalService.getDashes(this.clinic.clinic_id).subscribe(
  //     data => {
  //       console.log(data);
  //       this.dashes = data.dashes;

  //       if (data.refreshToken) {
  //         localStorage.setItem("clinicToken", data.refreshToken)
  //       }

  //     },
  //     err => {

  //     }
  //   );
  // }

  // getClinica() {
  //   this.professionalService.selectClinicByUser(this.user?.user_id, this.clinic_subdomain).subscribe(
  //     data => {
  //       console.log(data);
  //       this.clinic = data.clinic;

  //       this.getPacientLastappointments();
  //       this.getDashes()

  //     },
  //     err => {

  //     }
  //   );
  // }


  getPacientLastappointments() {
    this.professionalService.getPacientsByProf(this.prof_id).subscribe(
      data => {
        console.log(data);
        this.pacients = data.pacients;

        this.sortedData = this.pacients.slice();

        this.pending = this.pacients.filter(x => x.appointment?.class == 'pendente').length
        this.paid = this.pacients.filter(x => x.appointment?.class == 'pago').length

      },
      err => {

      }
    );
  }

  payments(n: number) {

    var payName = "";

    if (this.paySelected == n) {
      this.paySelected = null
      payName = ""
      this.sortedData = this.pacients;
    }
    else {
      this.paySelected = n;
      if (n == 0) {
        payName = 'pago'
      }
      if (n == 1) {
        payName = 'pendente'
      }

      this.sortedData = this.pacients.filter(item => {
        if (item.appointment?.class.indexOf(payName) !== -1 && item.appointment) {
          return true;
        }
        return false;
      }
      );

    }

  }

  deletePacient(pac: Pacient) {

    // const dialogRef = this.dialog.open(ConfirmdialogComponent, {
    //   data: {
    //     version: 4,
    //     title: "Remover paciente?",
    //     desc: `Deseja realmente remover o paciente ${pac.pacient.pacient_name} desta clínica?`,
    //     button_confirm: "Remover",
    //     button_cancel: "Cancelar"
    //   },
    // });

    // dialogRef.afterClosed().subscribe(dialogResult => {

    //   if (dialogResult) {
    //     this.clinicService.deletePacient(pac.pacient.pacient_id).subscribe(
    //       data => {
    //         this.getPacientLastappointments();
    //         this.getDashes();
    //       },
    //       err => {

    //       }
    //     );
    //   }

    // });
    // console.log(pac)

  }

  // addPacient() {
  //   const dialogRef = this.dialog.open(AddPacientComponent, {
  //     panelClass: 'my-full-screen-dialog',
  //     disableClose: true,
  //     data: {
  //       clinic: this.clinic,
  //       pc_id: null
  //     }

  //   })

  //   dialogRef.afterClosed().subscribe(dialogResult => {

  //     if (dialogResult) {
  //       this.getPacientLastappointments();
  //       this.getDashes();
  //     }

  //   });

  // }

  editPacient(pacient: Pacient) {
    // const dialogRef = this.dialog.open(AddPacientComponent, {
    //   panelClass: 'my-full-screen-dialog',
    //   disableClose: true,
    //   data: {
    //     clinic: this.clinic,
    //     pc_id: pacient.pacient.pacient_id
    //   }

    // })

    // dialogRef.afterClosed().subscribe(dialogResult => {

    //   if (dialogResult) {

    //     this.getPacientLastappointments();
    //     this.getDashes();
    //   }

    // });

  }

  // visualizarConsulta(pacient: Pacient) {
  //   console.log(pacient)
  //   const dialogRef = this.dialog.open(PatientsInfoComponent, {
  //     panelClass: 'my-full-screen-dialog',
  //     disableClose: false,
  //     data: {
  //       patient: pacient

  //     }

  //   })

  //   dialogRef.afterClosed().subscribe(dialogResult => {

  //     if (dialogResult) {

  //       // this.getProfessionalsClinic();
  //       // this.getDashes();
  //     }

  //   });
  // }

  visualizarConsulta(pc_id: string) {

    this.router.navigate([`profissional/paciente/${pc_id}/agendamentos`])

  }



  onKeypressEvent(event: any) {


    this.sortedData = this.pacients.filter(item => {
      if (item.pacient.pacient_name.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1

      ) {
        return true;
      }
      return false;
    }
    );

  }

  calculateAge(date: string) {
    var diff_ms = Date.now() - new Date(date).getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  ordenacao(tipoOrdenacao: string) {

    const data = this.pacients.slice();

    this.sortedData = data.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      switch (tipoOrdenacao) {
        case 'nome':
          return compare(a.pacient.pacient_name, b.pacient.pacient_name, isAsc);
        default:
          return 0;
      }
    });

    if (this.sortDirection == 'asc') {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = 'asc';
    }
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}