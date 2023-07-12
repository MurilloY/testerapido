import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment, Room } from 'src/app/appointment/returns/verifyurl.return';
import { AppointmentService } from 'src/app/appointment/services/appointment.service';
import { ChatService } from 'src/app/appointment/services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  formMessage: FormGroup;
  participant: number
  photo_local: string
  photo_remoto: string
  appointment?: Appointment;
  room: Room;

  today = new Date();

  url: string;
  pc_id: any
  token: string
  app_id: string

  blob_photo_pacient: any;
  blob_photo_profissional: any;
  msgerChat: any

  @ViewChild('msger') msger: ElementRef<HTMLInputElement>;

  constructor(private chatService: ChatService,
    private appointmentService: AppointmentService,
    private renderer: Renderer2,
    private router: Router) { }

  ngOnInit(): void {

    this.msgerChat = document.getElementById("msger-chat");

    let url = this.router.url;
    let split = url.split("/");
    this.url = decodeURIComponent(split[3]);
    this.getVerifyUrl();

    this.formMessage = new FormGroup({

      message: new FormControl('', [Validators.required]),


    });
    
  }

  getHistoryMessages() {
    this.appointmentService.getChatMessages(this.app_id).subscribe((data) => {
      // this.messages.push(message);

      for (let i=0; i < data.messages.length; i++){

        if (this.participant == data.messages[i].participant) {
          var side = 'right'
        } else {
          var side = 'left'
        }
        this.appendMessage(side, data.messages[i].message, data.messages[i].moment)
      }
    });
  }

  sendMessage(): void {
 
    if (this.formMessage.valid && this.formMessage.value.message) {
    let yourDate = new Date()
    yourDate.toISOString().split('T')[0]

    console.log(this.formMessage.value.message)

    let data = {
      message: this.formMessage.value.message,
      participant: this.participant,
      time: `${this.padTo2Digits(yourDate.getHours())}:${this.padTo2Digits(yourDate.getMinutes())}`,
      prof_id: this.appointment?.prof_id,
      pc_id: this.appointment?.pc_id,
      app_id: this.appointment?.app_id,
      ambiente: environment.env

    }


    this.chatService.sendMessage(this.room.room_id, data);
    this.formMessage.get('message')?.reset()
    }
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  getVerifyUrl() {

    this.appointmentService.getVerifyUrl(this.url).subscribe(
      data => {

        this.token = data.token
        this.appointment = data.appointment;
        this.room = data.room;
        this.participant = data.room.participant
        this.pc_id = data.appointment.pc_id
        this.app_id = data.appointment.app_id;
        this.appointmentService.showImage(data.appointment.user_id_pacient, this.token).subscribe(url => {
          this.blob_photo_pacient = url

          this.appointmentService.showImage(data.appointment.user_id_prof, this.token).subscribe(url => {
            this.blob_photo_profissional = url

            if (this.participant === 0) {
              this.photo_local = this.blob_photo_pacient
              this.photo_remoto = this.blob_photo_profissional
            }else {
              this.photo_local = this.blob_photo_profissional
              this.photo_remoto = this.blob_photo_pacient
            }
            this.getHistoryMessages()

          })
        })

        this.chatService.joinRoom({room: this.room.room_id, username: data.appointment.pc_name});

        this.socketConection()

      },
      err => {
        console.log(err)
      }
    );

  }

  appendMessage (side:string, text:string, hour:string) {

    let msgHTML;

    // bloco 01
    const div = this.renderer.createElement('div')
    div.classList.add("box-message")
    if (side == "right") {
      div.classList.add("profissional")
    }
    const div1 = this.renderer.createElement('div')
    div1.classList.add("message")
    this.renderer.appendChild(div, div1)
    const div2 = this.renderer.createElement('div')
    div2.classList.add("img")
    this.renderer.appendChild(div1, div2)
    const img1 = this.renderer.createElement('img')
    img1.classList.add("imageuser")
    // this.renderer.setAttribute(img1, "src", side == "left"? this.photo_remoto: this.photo_local);
    const imageSrc = side === 'left' ? this.photo_remoto : this.photo_local;
    this.renderer.setAttribute(img1, 'src', imageSrc);
    this.renderer.appendChild(div2, img1)
    const msg = this.renderer.createElement('div')
    msg.classList.add("msg")
    this.renderer.appendChild(div1, msg)
    const p1 = this.renderer.createElement('p')
    this.renderer.appendChild(p1, this.renderer.createText(text))
    this.renderer.appendChild(msg, p1)
    const time = this.renderer.createElement('span')
    time.classList.add("time")
    this.renderer.appendChild(msg, time)
    const hourr = this.renderer.createElement('span')
    hourr.classList.add("material-symbols-outlined")
    this.renderer.appendChild(hourr, this.renderer.createText("schedule"))
    this.renderer.appendChild(time, hourr)
    this.renderer.appendChild(time, this.renderer.createText(hour))





    this.renderer.appendChild(this.msger.nativeElement, div);
    // this.msger.nativeElement.scrollBy()

    this.msger.nativeElement.scroll({
      top: this.msger.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });

  }


  socketConection(){
    this.chatService.getMessages().subscribe((message: any) => {


      console.log("socket: ", message);
      console.log(typeof this.participant)

      if (this.participant == message['participant']){

        var image = this.photo_local;
        var side = 'right'

      }
      else{
        var image = this.photo_remoto;
        var side = 'left'

      }

      this.appendMessage(side, message['message'], message['time'])

    });

    this.chatService.joinRoom({room: this.room.room_id, username: this.room.participant === 0 ? this.appointment?.pc_name: this.appointment?.prof_name})  

  }

}
