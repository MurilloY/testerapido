import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProfessionalService } from '../../services/professional.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDataService } from '../../services/modal-data.service';
import { Appointment } from '../../returns/appointment_return';
import { map } from 'rxjs';

@Component({
  selector: 'app-prontuario-messages',
  templateUrl: './prontuario-messages.component.html',
  styleUrls: ['./prontuario-messages.component.scss']
})
export class ProntuarioMessagesComponent implements OnInit {

  user: any;
  app_id: string;
  messages: any
  participant: number
  today: any
  appointment?: Appointment;
  image: string
  blob_photo_pacient: any
  blob_photo_profissional: any
  photo_local: string
  photo_remoto: string


  @ViewChild('msger') msger: ElementRef<HTMLInputElement>;
  @ViewChild('elem') elem: ElementRef;



  constructor(private professionalService: ProfessionalService,
    private route: ActivatedRoute,
    private modalDataService: ModalDataService,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    this.route.params.subscribe(params => {
      this.app_id = params['app_id'];

      this.getProfAppointment()

    });


  }

  getMessages() {
    this.professionalService.getMessages(this.app_id).subscribe((data) => {
      // this.messages.push(message);
      console.log(data)
      console.log(this.user)

      // this.today = data.messages.moment

      for (let i = 0; i < data.messages.length; i++) {

        if (data.messages[i].participant === 1) {
          var side = 'right'
        } else {
          var side = 'left'
        }

        // if (this.participant == data.messages[i].participant) {
        //   var side = 'right'
        // } else {
        //   var side = 'left'
        // }
        this.appendMessage(side, data.messages[i].message, data.messages[i].moment)
      }
    });
  }

  getProfAppointment() {
    this.professionalService.getAppointment(this.app_id).subscribe(
      data => {
        this.appointment = data.appointment
       
        this.professionalService.showImage(data.appointment.pacient.user_id_pacient).subscribe(url => {
          this.blob_photo_pacient = url

          this.professionalService.showImage(data.appointment.professional.user_id_professional).subscribe(url => {
            this.blob_photo_profissional = url

            if (this.participant === 0) {
              this.photo_local = this.blob_photo_pacient
              this.photo_remoto = this.blob_photo_profissional
            }else {
              this.photo_local = this.blob_photo_profissional
              this.photo_remoto = this.blob_photo_pacient
            }
            this.getMessages();
          })
        })

        

    
      },
      err => {

      }
    );
  }


  appendMessage(side: string, text: string, hour: string) {

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


}
