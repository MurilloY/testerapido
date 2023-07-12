import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Prescription } from 'src/app/appointment/returns/prescription_return';
import { Appointment, Room } from 'src/app/appointment/returns/verifyurl.return';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { ChatService } from 'src/app/appointment/services/chat.service';
import { AddReceituarioComponent } from './add-receituario/add-receituario.component';
import { VisualizarReceituarioComponent } from './visualizar-receituario/visualizar-receituario.component';

@Component({
  selector: 'app-doctor-chat-receituario',
  templateUrl: './doctor-chat-receituario.component.html',
  styleUrls: ['./doctor-chat-receituario.component.scss']
})
export class DoctorChatReceituarioComponent implements OnInit {
  user: any;
  pc_id: string;
  user_id: any;
  app_id: string
  token: string
  url: string;
  appointment?: Appointment;
  room: Room;



  prescription: Prescription[];
  sortedData: Prescription[] = [];


  progress: number = 0;
  collection: any = [];
  p: number = 1;
  totalItens: number = 3;
  showMenu: boolean = false;
  participant: number
  blob_photo_pacient: any;
  blob_photo_profissional: any;

  receita_vencida = 0

  constructor(private appointmentService: AppointmentService,
    private chatService: ChatService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    let url = this.router.url;
    let split = url.split("/");
    this.url = decodeURIComponent(split[3]);
    this.getVerifyUrl();
  }

  isExpired(pre_date: string): boolean {
    const certDate = new Date(
      +pre_date.split('-')[0],
      +pre_date.split('-')[1] - 1,
      +pre_date.split('-')[2].substr(0, 2)
    );
    const currentDate = new Date();
    const daysDifference = (currentDate.getTime() - certDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDifference > 30;
  }

  getPrescriptionNumber(idx: number): number {
    return (this.p - 1) * this.totalItens + idx + 1;
  }

  getPrescription() {
    this.appointmentService.getPrescription(this.app_id, this.token).subscribe(
      data => {
        console.log('aqui', data)
        this.prescription = data.prescriptions
        this.sortedData = data.prescriptions
        this.receita_vencida = Object.values(data.prescriptions).filter(item => item.expired === true).length;
      },
      err => {

      }
    );
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
        this.getPrescription()

      },
      err => {
        console.log(err)
      }
    );

  }

  newReceituario(){
    const dialogRef4 = this.dialog.open(AddReceituarioComponent, {
      data: {
        pc_id: this.pc_id,
        app_id: this.app_id,
        file: null,
        token: this.token
      }
    });

    dialogRef4.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getPrescription()

      }

    });
  }

  openAlertDialog2(receita: any) {

    const dialogRef1 = this.dialog.open(VisualizarReceituarioComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        pc_id: this.pc_id,
        pre_id: receita['pre_id'],
        token: this.token

      }
    });

    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.modalDataService.dadosEnviados.emit('anamnese');

      }

    });
  }

}
