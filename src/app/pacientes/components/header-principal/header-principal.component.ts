import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdialogComponent } from 'src/app/clinics/components/confirmdialog/confirmdialog.component';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrls: ['./header-principal.component.scss']
})
export class HeaderPrincipalComponent implements OnInit {

  @Input() showBtnHome: boolean = false;
  @Input() showInfo: boolean = true;
  @Input() progress: number = 0;
  @Input() showProgress: boolean = true;
  @Input() showBtnNotification: boolean = false;
  @Input() showUser: boolean = false;
  @Input() fixedHeader: boolean = true;
  @Input() menu: boolean = false;
  @Input() dialogVersion: number = 0;

  validarConta: boolean = false;
  scrollPage: boolean = false;
  returnError: boolean = false
  @Input() showBtnClose: boolean = false;

  @Output() closeEvent = new EventEmitter<string>();

  user_name:string;
  user?: any;
  
  constructor(private dialog:MatDialog, private pacientService: PacientesService) { 
    this.user = JSON.parse(localStorage.getItem("UserPacientObject")!);
    console.log(this.user)

  }

  ngOnInit(): void {
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
        this.pacientService.logout();
      }

    });
  
    
  }

}
