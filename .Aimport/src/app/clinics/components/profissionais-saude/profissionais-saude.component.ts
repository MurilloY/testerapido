import { Component, OnInit } from '@angular/core';
import { Professional } from '../../returns/professionals_clinic.return';
import { Clinic } from '../../returns/clinic_by_user.return';
import { ClinicService } from '../../services/clinic.service';
import { Router } from '@angular/router';
import { Dashes } from '../../returns/dashes.return';
import { MatDialog } from '@angular/material/dialog';
import { AddProfessionalComponent } from './add-professional/add-professional.component';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { environment } from 'src/environments/environment';
import { AddOrSendlinkComponent } from './add-or-sendlink/add-or-sendlink.component';


@Component({
  selector: 'app-profissionais-saude',
  templateUrl: './profissionais-saude.component.html',
  styleUrls: ['./profissionais-saude.component.scss']
})
export class ProfissionaisSaudeComponent implements OnInit {
  user?:any;
  clinic: Clinic;
  professional: Professional[]
  clinic_subdomain: string;
  dashes?: Dashes;
  queriesSelected: number | null;
  online: number = 0;
  presencial: number = 0;

  sortedData: Professional[] = [];
  sortDirection: string = 'asc';

  today = new Date();


	p: number = 1;
  totalItens: number = 10;

  constructor(private clinicService: ClinicService, private router: Router, private dialog: MatDialog,) {
    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);

    let url = this.router.url;
    let split = url.split("/");
    this.clinic_subdomain = split[2];
  }

  ngOnInit(): void {
    this.getClinica();
  }

  onKeypressEvent(event: any) {


    this.sortedData = this.professional.filter(item => {
      if (item.professional.prof_name.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1

      ) {
        return true;
      }
      return false;
    }
    );

  }

  getClinica() {
    this.clinicService.selectClinicByUser(this.user?.user_id, this.clinic_subdomain).subscribe(
      data => {
        console.log(data);
        this.clinic = data.clinic;

        this.getProfessionalsClinic();
        this.getDashes()

      },
      err => {

      }
    );
  }

  getProfessionalsClinic() {
    this.clinicService.selectProfessionalsClinic(this.clinic.clinic_id).subscribe(
      data => {
        console.log(data);
        this.professional = data.professionals;

        this.sortedData = this.professional.slice();
        this.online = this.professional.filter(x => x.appointment?.online).length
        this.presencial = this.professional.filter(x => x.appointment?.presencial).length

      },
      err => {

      }
    );
  }

  calculateAge(date:string) { 
    var diff_ms = Date.now() - new Date(date).getTime();
    var age_dt = new Date(diff_ms);
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

  getDashes() {
    this.clinicService.getDashes(this.clinic.clinic_id).subscribe(
      data => {
        console.log(data);
        this.dashes = data.dashes;

        if (data.refreshToken) {
          localStorage.setItem("clinicToken", data.refreshToken)
        }

      },
      err => {

      }
    );
  }

  queries(n:number){


    if (this.queriesSelected == n ){
      this.queriesSelected = null
      this.sortedData = this.professional;
    }
    else{
      this.queriesSelected = n;
      if(n == 0){
        this.sortedData = this.professional.filter(item => {
          if (item.appointment?.online == true && item.appointment) {
            return true;
          }
          return false;
        })
      }
      if(n == 1){
        this.sortedData = this.professional.filter(item => {
          if (item.appointment?.presencial == true && item.appointment) {
            return true;
          }
          return false;
        });
      }

    }
  }

  addProfessional() {
    const dialogRef = this.dialog.open(AddProfessionalComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: true,
      data: {
        clinic: this.clinic,
        professional: null
      }
      
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getProfessionalsClinic();
        this.getDashes();
      }

    });

  }

  editProfessional(prof: Professional ) {

    console.log(prof)

    const dialogRef = this.dialog.open(AddProfessionalComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: true,
      data: {
        clinic: this.clinic,
        professional: prof.professional
      }
      
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getProfessionalsClinic();
        this.getDashes();
      }

    });

  }

  LinkorAddProfessional() {

    const dialogRef = this.dialog.open(AddOrSendlinkComponent,{
      width: '520px',
      maxHeight: '90vh',
      disableClose: false,
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getProfessionalsClinic();
        this.getDashes();
      }

    });

  }

  deleteProfessional(prof: Professional) {
    
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data:{
        version: 4,
        title: "Remover profissional?",
        desc: `Deseja realmente remover o profissional ${prof.professional.prof_name} desta clínica?`,
        button_confirm: "Remover",
        button_cancel: "Cancelar"
      },
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if(dialogResult){
        this.clinicService.deleteProfessional(prof.professional.pc_id).subscribe(
          data => {
            this.getProfessionalsClinic();
            this.getDashes();
          },
          err => {
    
          }
        );
      }

    });
    console.log(prof.professional.pc_id)
    console.log(prof)

  }
  

  


 ordenacao(tipoOrdenacao: string) {
    
    const data = this.professional.slice();

    this.sortedData = data.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      switch (tipoOrdenacao) {
        case 'nome':
          return compare(a.professional.prof_name, b.professional.prof_name, isAsc);
        default:
          return 0;
      }
    });

    if(this.sortDirection == 'asc'){      
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = 'asc';
    }
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}