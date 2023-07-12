import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdmService } from '../../services/adm.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent implements OnInit {

  qr_code: string;
  connected: any;
  name: string;
  number: string;
  whats_session_id: string;
  interval: any;

  constructor(
    public dialog: MatDialog,
    private admService: AdmService,
    private router: Router,
    // private utilsService: UtilsService,
    private titleService: Title,
    // private toastr: ToastrService,
  ) { }

  getRefreshInterval() {
    this.getWhatsapp();
    this.interval = setInterval(() => {
      this.getWhatsapp();
    }, 10000);
  }

  desconectar() {
    let title = "Desconectar";
    let message = "Deseja realmente desconectar o whatsapp ?";

    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        //
        this.admService
          .deleteWhatsapp()
          .subscribe((data) => {
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso!',
              text: 'Whatsapp desconectado com sucesso',
              icon: 'success',
              iconColor: '#01AEEF',
              showCancelButton: false,
              confirmButtonColor: '#01AEEF',
              confirmButtonText: 'OK'
            });

          });
      }
    });
  }

  getWhatsapp() {
    this.admService.getWhatsapp().subscribe((data) => {

      console.log('Sistema', data);

      this.name = data.name;
      this.qr_code = data.qr_code;
      this.connected = data.qr_code == null;
      console.log(this.connected)
      this.number = data.number;
    });
  }

  ngOnDestroy() {
    console.log("destroying child...")
    clearInterval(this.interval);
  }


  formataCell(value: any) {

    return value
      .replace("55", '')
      .replace(/\D/g, '')

      .replace(/(\d{2})(\d)/, '($1) $2')

      .replace(/(\d{4})(\d)/, '$1-$2')

      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')

      .replace(/(-\d{4})\d+?$/, '$1')
  }

  ngOnInit(): void {
    this.getRefreshInterval();

  }

}
