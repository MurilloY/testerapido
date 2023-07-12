import { Component, ElementRef, HostListener, OnInit, ViewChild, Input, Renderer2} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appointment, Room } from '../../returns/verifyurl.return';
import { AppointmentService } from '../../services/appointment.service';
import { TwilioService } from '../../services/twilio.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.scss']
})
export class DoctorChatComponent implements OnInit {


  url: string;
  appointment?: Appointment;
  room: Room;
  cam: boolean = true
  mute_unmute: boolean = true
  participant: number
  photo_local: string
  photo_remoto: string
  users_ids = [];
  pc_id: any
  

  showExpired: boolean = false;
  showAdvanced: boolean = false;

  token: string

  app_id: string

  formMessage: FormGroup;
  blob_photo_pacient: string;
  blob_photo_profissional: any;

  @ViewChild('elem') elem: ElementRef;
  @Input() titleTeam: string;
  @ViewChild('localVideo') localVideo: ElementRef<HTMLInputElement>;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLInputElement>;
  @ViewChild('videoAviso') videoAviso: ElementRef<HTMLInputElement>;

  // @ViewChild('msger_chat') msgerChat: ElementRef<HTMLInputElement>;

  msgerChat: any

  today = new Date();
  

  constructor(private route: ActivatedRoute, 
    public twilioService: TwilioService,
    private sanitizer: DomSanitizer,
    private appointmentService: AppointmentService,
    ) {

  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    // Your logic on beforeunload

    this.disconnect()
  }

  ngOnInit(): void {

    this.msgerChat = document.getElementById("msger-chat");

    document.body.classList.add('body-etapas');
    this.route.paramMap
      .subscribe(params => {
        this.url = params.get('url')!;

      }
      
    );
    
  }

  ngAfterViewInit() {
    // ElementRef { nativeElement: <input> }
    // console.log("teste",this.localVideo);

    this.twilioService.localVideo = this.localVideo;
    this.twilioService.remoteVideo = this.remoteVideo;
    this.twilioService.videoAviso = this.videoAviso;

    this.getVerifyUrl()
  }

  leaveRoomIfJoined() {

   
     if (this.room) {
      this.twilioService.roomObj!.disconnect();
      this.twilioService.roomObj = null;
     }
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

        this.app_id = data.appointment.app_id

        this.connect()

      },
      err => {
        console.log(err)
      }
    );

  }

  OnOffCam() {
    this.cam = !this.cam
    this.twilioService.turnOffCam(this.cam)

  }

 
  disconnect() {
    if (this.twilioService.roomObj && this.twilioService.roomObj !== null) {
      this.twilioService.roomObj.disconnect();
      this.twilioService.roomObj = null;
    
    } else {

      console.log('else desconect')

    }
  }

  connect() {
    if (this.room.participant === 0) {
      var participantname = this.appointment?.pc_name
    } else {
      var participantname = this.appointment?.prof_name
    }
    this.twilioService.connectToRoom(this.room!.token, {
      name: this.room.room_id,
      audio: true,
      video: { height: 1280, frameRate: 24, width: 1280 },
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

  muteunmute() {
    this.mute_unmute = !this.mute_unmute
    this.twilioService.muteOnOff(this.mute_unmute)
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

  getImageCorrect(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

}
