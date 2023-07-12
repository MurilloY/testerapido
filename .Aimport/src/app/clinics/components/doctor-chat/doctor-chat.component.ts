import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-chat',
  templateUrl: './doctor-chat.component.html',
  styleUrls: ['./doctor-chat.component.scss']
})
export class DoctorChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('body-etapas');
  }

}
