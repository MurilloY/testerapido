import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CentralNotificacaoComponent } from '../../components/central-notificacao/central-notificacao.component';
import { ConfirmdialogComponent } from '../../components/confirmdialog/confirmdialog.component';
import { HealthinsuranceComponent } from '../../components/healthinsurance/healthinsurance.component';
import { Clinic } from '../../returns/clinic_name.return';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  validarConta: boolean = false;
  scrollPage: boolean = false;
  returnError: boolean = false;
  clinic_subdomain:string;
  clinic?: Clinic;
  user_name:string;
  user?: any;

  constructor(private dialog:MatDialog, private route: ActivatedRoute, private clinicService: ClinicService, private router: Router) { 
   
    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);
  }
  
  

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.clinic_subdomain = params['clinic_name']

      this.getClinic();


    });

   

  }

  getClinic(){
    this.clinicService.selectClinic(this.clinic_subdomain).subscribe(
      data => {
          this.clinic = data.clinic      
          this.returnError = false;
    },
    err =>{
      this.returnError = false;
      
    }
    );
  }


  notifications(){
    const dialogRef = this.dialog.open(CentralNotificacaoComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        clinic:this.clinic
      }
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.getCompanies();
      }

    });
    
  }

  convenio() {
    const dialogRef = this.dialog.open(HealthinsuranceComponent, {
      panelClass: 'my-full-screen-dialog2',
      disableClose: true,
      data: {
        // consulta: consulta,
        clinic: this.clinic,
        
      }
      
    })
    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {
        
        // this.getProfessionalsClinic();
        // this.getDashes();
      }

    });

  }
  
  @HostListener('window:scroll') onScroll() {
    if(this.validarConta){
      (window.scrollY == 0) ? this.scrollPage = false : this.scrollPage = true;
    }
  }

  logOut(){

    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data:{
        version: 3,
        title: "Deseja desconectar?",
        desc: "Para voltar a utilizar a plataforma, você precisa conectar com seu e-mail e senha cadastrados.",
        button_confirm: "Desconectar",
        button_cancel: "Cancelar"
      },
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if(dialogResult){
        this.clinicService.logout(this.clinic?.clinic_subdomain!);
      }

    });
  
    
  }

  

}

