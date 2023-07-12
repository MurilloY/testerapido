import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Anamnesi } from 'src/app/appointment/returns/anamnese_return';
import { Appointment, Room } from 'src/app/appointment/returns/verifyurl.return';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { AddChatAnamneseComponent } from './add-chat-anamnese/add-chat-anamnese.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-chat-anamnese',
  templateUrl: './doctor-chat-anamnese.component.html',
  styleUrls: ['./doctor-chat-anamnese.component.scss']
})
export class DoctorChatAnamneseComponent implements OnInit {

  anamnese: Anamnesi[];
  app_id: string
  url: string;
  token: string
  appointment?: Appointment;
  room: Room;
  participant: number
  pc_id: any
  

  progress: number = 0;
  collection: any = [];
  p: number = 1;
  totalItens: number = 3;
  showMenu: boolean = false;
  user_id: any;
  user: any;
  sortedData: Anamnesi[] = [];




  constructor(
    private dialog: MatDialog,
    private appointmentService: AppointmentService,
    private router: Router) { }

  ngOnInit(): void {

    document.body.classList.add('body-etapas');

    let url = this.router.url;
    let split = url.split("/");
    this.url = decodeURIComponent(split[3]);
    this.getVerifyUrl();
   
  }

  openAlertDialog(anamnese: any) {
    console.log(anamnese['anam_id'])


    const dialogRef1 = this.dialog.open(AddChatAnamneseComponent, {
      data: {
        pc_id: this.pc_id,
        anam_id: anamnese['anam_id'],
        token: this.token
      }
      
    });

    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.modalDataService.dadosEnviados.emit('anamnese');

      }

    });
  }

  getVerifyUrl() {

    this.appointmentService.getVerifyUrl(this.url).subscribe(
      data => {

        console.log(data)

        this.token = data.token
        this.appointment = data.appointment;
        this.room = data.room;
        this.participant = data.room.participant;
        this.pc_id = data.appointment.pc_id;


        this.app_id = data.appointment.app_id


        this.getAnamneses();

      },
      err => {
        console.log(err)
      }
    );

  }

  getAnamneseNumber(idx: number): number {
    return (this.p - 1) * this.totalItens + idx + 1;
  }

  getAnamneses() {
    this.appointmentService.getAnamneseVerify(this.app_id, this.token).subscribe(
      data => {
        this.anamnese = data.anamnesis
        this.sortedData = data.anamnesis
      },
      err => {

      }
    );
  }

  addAnamense(){
    
    const dialogRef1 = this.dialog.open(AddChatAnamneseComponent, {
      data: {
        pc_id: this.pc_id,
        app_id: this.app_id,
        anam_id: null
      }
    });

    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {
        this.getAnamneses();
      }

    });
  }

}
