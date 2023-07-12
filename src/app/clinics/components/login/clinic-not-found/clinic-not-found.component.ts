import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinic-notfound',
  templateUrl: './clinic-not-found.component.html',
  styleUrls: ['./clinic-not-found.component.scss']
})
export class ClinicNotFoundComponent implements OnInit {




  constructor() { }

  ngOnInit(): void {

    document.body.classList.add('body-etapas');
    
  } 

}
