import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Anexo } from 'src/app/appointment/returns/anexos_return';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { AddChatAnexosComponent } from './add-chat-anexos/add-chat-anexos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-chat-anexos',
  templateUrl: './doctor-chat-anexos.component.html',
  styleUrls: ['./doctor-chat-anexos.component.scss']
})
export class DoctorChatAnexosComponent implements OnInit {

  url: string;
  pc_id: string;
  token: string;

  app_id: string
  anexo: Anexo[]
  sortedData: Anexo[] = [];
  totalItens: number = 3;
	p: number = 1;



  constructor(private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {

    let url = this.router.url;
    let split = url.split("/");
    this.url = decodeURIComponent(split[3]);
    this.getVerifyUrl();
  }

  getAnexos() {
    this.appointmentService.getAnexosVerify(this.app_id, this.token).subscribe(
      data => {
        console.log(data)
        this.anexo = data.anexos
        this.sortedData = data.anexos
      },
      err => {

      }
    );
  }

  getVerifyUrl() {

    this.appointmentService.getVerifyUrl(this.url).subscribe(
      data => {

        this.token = data.token
        this.pc_id = data.appointment.pc_id
        this.app_id = data.appointment.app_id;

        this.getAnexos();

      },
      err => {
        console.log(err)
      }
    );

  }

  downloadFile(dados: any) {

    this.appointmentService.downloadAnexo(dados['ane_id'], this.token).subscribe(
      data => {
        console.log(data)

        let fullName = `${dados['ane_name']}.${dados['cdn_url'].split('.')[1]}`

        let url = window.URL.createObjectURL(data);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = fullName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

      },
      err => {

      }
    );
  }

  newDoc(){
    const dialogRef4 = this.dialog.open(AddChatAnexosComponent, {
      data: {
        pc_id: this.pc_id,
        app_id: this.app_id,
        file: null
      }
    });

    dialogRef4.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAnexos();

      }

    });
  }

}
