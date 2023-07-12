import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor-chat-off',
  templateUrl: './doctor-chat-off.component.html',
  styleUrls: ['./doctor-chat-off.component.scss']
})
export class DoctorChatOffComponent implements OnInit {

  public formGroup: FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

}
