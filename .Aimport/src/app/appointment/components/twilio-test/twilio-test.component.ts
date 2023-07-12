import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment, Room } from '../../returns/verifyurl.return';
import { AppointmentService } from '../../services/appointment.service';
import { TwilioService } from '../../services/twilio.service';

@Component({
  selector: 'app-twilio-test',
  templateUrl: './twilio-test.component.html',
  styleUrls: ['./twilio-test.component.scss']
})
export class TwilioTestComponent implements OnInit {


  @ViewChild('localVideo') localVideo: ElementRef<HTMLInputElement>;;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLInputElement>;;



  url: string;
  appointment: Appointment;
  room: Room;

  constructor(

    private route: ActivatedRoute,
    public twilioService: TwilioService,
    private appointmentService: AppointmentService) {


    // this.baCustomPreLoader.show();
    this.route.params.subscribe(params => {
      this.url = params['url'];


    });



    window.addEventListener('unload', () => {
      this.disconnect();
    })


  }



  getVerifyUrl() {

    this.appointmentService.getVerifyUrl(this.url).subscribe(
      data => {


        this.appointment = data.appointment;
        this.room = data.room;

        this.connect()

      },
      err => {
        console.log(err)
      }
    );

  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    // ElementRef { nativeElement: <input> }

    this.twilioService.localVideo = this.localVideo;
    this.twilioService.remoteVideo = this.remoteVideo;

    this.getVerifyUrl()
  }

  disconnect() {
    if (this.twilioService.roomObj && this.twilioService.roomObj !== null) {
      this.twilioService.roomObj.disconnect();
      // this.twilioService.roomObj = null;
    } else {

    }
  }

  connect() {
    this.twilioService.connectToRoom(this.room.token, {
      name: this.room.room_id,
      audio: true,
      video: { height: 720, frameRate: 24, width: 1280 },
      bandwidthProfile: {
        video: {
          mode: 'collaboration',
          // maxTracks: 10,
          // dominantSpeakerPriority: 'standard',
          renderDimensions: {
            high: { height: 1080, width: 1980 },
            standard: { height: 720, width: 1280 },
            low: { height: 176, width: 144 }
          }
        }
      },
    })
  }

  mute() {
    this.twilioService.mute();
  }

  unmute() {
    this.twilioService.unmute();
  }
  ngOnDestroy() {
    this.disconnect();
  }

}
