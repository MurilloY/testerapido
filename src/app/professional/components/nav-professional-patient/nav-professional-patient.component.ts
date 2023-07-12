import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';
import { Pacient } from '../../returns/professional_pacient_verify.return';
import { ProfessionalService } from '../../services/professional.service';
import { EmitirReceitaComponent } from '../prontuario/emitir-receita/emitir-receita.component';
import { Anamnesi } from '../../returns/anamnese_return';
import { ModalAnamneseComponent } from '../anamnese/modal-anamnese/modal-anamnese.component';
import { ModalAtestadoComponent } from '../prontuario-atestado/modal-atestado/modal-atestado.component';
import { ModalAnexoComponent } from '../prontuario-anexos/modal-anexo/modal-anexo.component';
import { ModalDataService } from '../../services/modal-data.service';
import { Appointment } from '../../returns/appointment_return';
import { LocationStrategy } from '@angular/common';
import { RoutepreviousService } from '../../services/routeprevious.service';
import { ProfissionalPerfilComponent } from '../profissional-perfil/profissional-perfil.component';
import { ConfirmdialogComponent } from 'src/app/clinics/components/confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-nav-professional-patient',
  templateUrl: './nav-professional-patient.component.html',
  styleUrls: ['./nav-professional-patient.component.scss']
})
export class NavProfessionalPatientComponent implements OnInit {



  progress: number = 0;
  collection: any = [];
  p: number = 1;
  totalItens: number = 4;
  showMenu: boolean = false;
  pc_id: string;
  app_id: string;
  appointment?: Appointment
  user: any;
  nameButton: string;
  url: string;
  previousUrl: string
  buttonvar: any
  consultaOnline: boolean = false;


  constructor(private dialog: MatDialog, private route: ActivatedRoute, private professionalService: ProfessionalService, private router: Router, private modalDataService: ModalDataService,
    private routepreviousService: RoutepreviousService) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        console.log('Route change detected', event);
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        let url_split = event.url.split("/")
        if (url_split.length > 6) {
          this.url = url_split[6]
          switch (this.url) {
            case 'atestado':
              this.buttonvar = true
              this.nameButton = 'Emitir atestado'
              break;
            case 'anexos':
              this.buttonvar = true
              this.nameButton = 'Novo Documento'
              break;
            case 'mensagens':
              this.buttonvar = false
              break;
            default:
            // code block
          }

        }

        console.log(event);
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
      }
    });

  }

  ngOnInit(): void {
    this.routepreviousService.currentMessage.subscribe(message => {
      this.previousUrl = message
      console.log(message)
    })
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    console.log(this.previousUrl)


    this.route.firstChild!.params.subscribe(params => {
      this.app_id = params['app_id'];
      this.pc_id = params['pc_id'];

      this.getProfAppointment()

    });

  }

  meuPerfil(){
    const dialogRef = this.dialog.open(ProfissionalPerfilComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {}
    })

    dialogRef.afterClosed().subscribe((dialogResult) => {

      if (dialogResult) {

        this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
      }

    });
    
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
        this.professionalService.logout();
      }

    });
  
    
  }

  backRoute() {

    if (this.previousUrl === '0') {
      this.router.navigate([`profissional/agendamentos`])
    }
    if (this.previousUrl === '1') {
      this.router.navigate([`profissional/agendamentos`])
    }
    if (this.previousUrl === '2') {
      this.router.navigate([`profissional/paciente/${this.pc_id}/agendamentos`])
    }
    // switch (this.previousUrl) {
    //   case "0":
    //     this.router.navigate([`profissional/agendamentos`])
    //     break;
    //   case '1':
    //     this.router.navigate([`profissional/agendamentos`])
    //     break;
    //   case "2":
    //     this.router.navigate([`profissional/paciente/${this.pc_id}/agendamentos`])
    //     break;
    // }


  }



  getProfAppointment() {
    this.professionalService.getAppointment(this.app_id).subscribe(
      data => {
        this.appointment = data.appointment
        
        if (this.appointment.appointment.app_type_name === "Atendimento Online") {
          this.consultaOnline = true
        }
      },
      err => {

      }
    );
  }




  calculateAge(date: string) {
    var diff_ms = Date.now() - new Date(date).getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  openAlertDialog() {
    switch (this.url) {
      default:
      // code block
    }

  }

}
