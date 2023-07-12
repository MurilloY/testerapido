import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment, Room } from '../../returns/verifyurl.return';
import { AppointmentService } from '../../services/appointment.service';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-alert',
  templateUrl: './appointment-alert.component.html',
  styleUrls: ['./appointment-alert.component.scss']
})
export class AppointmentAlertComponent implements OnInit {

  url: string;

  appointment?: Appointment;
  room: Room;
  participant: number
  photo_local: string
  photo_remoto: string
  app_id: string

  showExpired: boolean = false;
  showAdvanced: boolean = false;



  constructor(private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router) { }

  ngOnInit(): void {

    document.body.classList.add('body-etapas');
    this.route.paramMap
      .subscribe(params => {
        this.url = params.get('url')!;
        this.getVerifyUrl()
      }
      
    );

    // console.log(this.twilioService.roomParticipants)

    // this.twilioService.msgSubject.subscribe(console.log)
    
  }

  // ---------------------------------------------------------

  getVerifyUrl() {

    this.appointmentService.getVerifyUrlProcess(this.url).subscribe(
      data => {
        this.router.navigate([`agendamento/sala/${this.url}`])
        this.appointment = data.appointment;


      },
      err => {
        this.appointment = err.error.appointment;
        if (err.error.error === 0) {
          this.showAdvanced = true;
        } else {
          this.showExpired = true;
        }
      }
    );

  }

}
