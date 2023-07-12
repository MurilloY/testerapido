import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Certificate } from 'src/app/appointment/returns/certificates_return';
import { Appointment, Room } from 'src/app/appointment/returns/verifyurl.return';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { ChatService } from 'src/app/appointment/services/chat.service';
import { VisualizarAtestadoComponent } from './visualizar-atestado/visualizar-atestado.component';
import { AddAtestadoComponent } from './add-atestado/add-atestado.component';

@Component({
  selector: 'app-doctor-chat-atestado',
  templateUrl: './doctor-chat-atestado.component.html',
  styleUrls: ['./doctor-chat-atestado.component.scss']
})
export class DoctorChatAtestadoComponent implements OnInit {

  app_id: string;

  certificates: Certificate[]
  sortedData: Certificate[] = [];
  certificate_vencido = 0

  p: number = 1;
  totalItens: number = 3;
  token: string
  appointment?: Appointment;
  room: Room;
  participant: number
  pc_id: any
  blob_photo_pacient: any;
  blob_photo_profissional: any;
  url: string;





  constructor(private appointmentService: AppointmentService,
    private chatService: ChatService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    let url = this.router.url;
    let split = url.split("/");
    this.url = decodeURIComponent(split[3]);
    this.getVerifyUrl();
  }

  newAtestado(){
    const dialogRef4 = this.dialog.open(AddAtestadoComponent, {
      data: {
        pc_id: this.pc_id,
        app_id: this.app_id,
        file: null,
        token: this.token
      }
    });

    dialogRef4.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getCertificates();

      }

    });
  }

  getVerifyUrl() {

    this.appointmentService.getVerifyUrl(this.url).subscribe(
      data => {
        this.token = data.token
        this.appointment = data.appointment;
        this.room = data.room;
        this.participant = data.room.participant
        this.pc_id = data.appointment.pc_id
        this.appointmentService.showImage(data.appointment.user_id_pacient, this.token).subscribe(url => {
          this.blob_photo_pacient = url

          this.appointmentService.showImage(data.appointment.user_id_prof, this.token).subscribe(url => {
            this.blob_photo_profissional = url
            
          })
        })

        this.chatService.joinRoom({room: this.room.room_id, username: data.appointment.pc_name});

        this.app_id = data.appointment.app_id;
        this.getCertificates()

      },
      err => {
        console.log(err)
      }
    );

  }

  getCertificates() {
    console.log("Entrei")
    this.appointmentService.getCertificates(this.app_id, this.token).subscribe(
      data => {
        console.log(data)
        this.certificates = data.certificate
        this.sortedData = data.certificate
        this.certificate_vencido = Object.values(data.certificate).filter(item => item.expired === true).length;
      },
      err => {

      }
    );
  }

  getAtestadoNumber(idx: number): number {
    return (this.p - 1) * this.totalItens + idx + 1;
  }

  isExpired(certValidity: string): boolean {
    const certDate = new Date(
      +certValidity.split('-')[0],
      +certValidity.split('-')[1] - 1,
      +certValidity.split('-')[2].substr(0, 2)
    );
    const currentDate = new Date();
    return certDate < currentDate;
  }

  openAlertDialog2(atestado: any) {

    console.log(atestado)

    const dialogRef1 = this.dialog.open(VisualizarAtestadoComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        token: this.token,
        cert_id: atestado['cert_id'],

      }
    });

    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.modalDataService.dadosEnviados.emit('atestado'); # O QUE FAÇO AQUI?

      }

    });
  }

}
