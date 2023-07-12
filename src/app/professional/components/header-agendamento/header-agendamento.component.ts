import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmdialogComponent } from 'src/app/clinics/components/confirmdialog/confirmdialog.component';
import { ProfessionalService } from '../../services/professional.service';
import { CentralNotificationComponent } from '../central-notification/central-notification.component';
import { ProfissionalPerfilComponent } from '../profissional-perfil/profissional-perfil.component';

@Component({
  selector: 'app-header-agendamento',
  templateUrl: './header-agendamento.component.html',
  styleUrls: ['./header-agendamento.component.scss']
})
export class HeaderAgendamentoComponent implements OnInit {
  @Input() showBtnHome: boolean = false;
  @Input() showInfo: boolean = true;
  @Input() progress: number = 0;
  @Input() showProgress: boolean = true;
  @Input() showBtnNotification: boolean = false;
  @Input() showUser: boolean = false;
  @Input() fixedHeader: boolean = true;
  @Input() menu: boolean = false;
  @Input() showBtnClose: boolean = false;
  @Input() dialogVersion: number = 0;
  @Input() showPerfil: boolean = true
  @Input() consultaPaciente: boolean = false
  @Input() showMenu: boolean = false
  @Input() buttonBack: boolean = false

  validarConta: boolean = false;
  scrollPage: boolean = false;
  returnError: boolean = false
  

  @Output() closeEvent = new EventEmitter<string>();

  user_name:string;
  user?: any;

  constructor(private dialog:MatDialog, private route: ActivatedRoute, private professionalService: ProfessionalService, private router: Router) { 
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
  }
  
  

  ngOnInit(): void {
    
  }

  


  notifications(){
    const dialogRef = this.dialog.open(CentralNotificationComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {}
    })

    dialogRef.afterClosed().subscribe((dialogResult) => {

      if (dialogResult) {

        // this.getCompanies();
      }

    });
    
  }

  backRoute() {
    this.router.navigate([`profissional/pacientes`])


  }

  closeDialog() {
    if (this.dialogVersion == 0) {

      const dialogRef = this.dialog.open(ConfirmdialogComponent, {
        data: {
          version: 3,
          title: "Fechar atendimento?",
          desc: "Tem certeza que deseja fechar ? todas as informações serão perdidas",
          button_confirm: "Sim",
          button_cancel: "Não"
        },
      });

      dialogRef.afterClosed().subscribe(dialogResult => {

        if (dialogResult) {
          this.closeEvent.emit()
        }

      });


    }

    if (this.dialogVersion == 1) {

      this.closeEvent.emit()

    }

    if (this.dialogVersion == 2) {

      const dialogRef = this.dialog.open(ConfirmdialogComponent, {
        data: {
          version: 3,
          title: "Fechar cadastro pacientes?",
          desc: "Tem certeza que deseja fechar ? todas as informações serão perdidas.",
          button_confirm: "Sim",
          button_cancel: "Não"
        },
      });

      dialogRef.afterClosed().subscribe(dialogResult => {

        if (dialogResult) {
          this.closeEvent.emit()
        }

      });


    }

    if (this.dialogVersion == 3) {
      this.closeEvent.emit()



    }
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
        this.professionalService.logout();
      }

    });
  
    
  }

  

}