import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdialogComponent } from '../../../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-header-professional',
  templateUrl: './header-professional.component.html',
  styleUrls: ['./header-professional.component.scss']
})
export class HeaderProfessionalComponent implements OnInit {

  @Input() progress: number = 0;
  @Input() showBtnHome: boolean = false;
  @Input() showProgress: boolean = false;
  @Input() showBtnClose: boolean = false;
  @Input() showBtnNotification: boolean = false;
  @Input() showUser: boolean = false;
  @Input() fixedHeader: boolean = true;
  @Input() menu: boolean = false;
  @Input() logo: string = '';

  @Output() closeEvent = new EventEmitter<string>();

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  closeDialog() {



    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data:{
        version: 3,
        title: "Fechar cadastro de profissional?",
        desc: "Tem certeza que deseja fechar? todas as informações serão perdidas.",
        button_confirm: "Sim",
        button_cancel: "Não"
      },
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if(dialogResult){
        this.closeEvent.emit()
      }

    });
    
  }

}
