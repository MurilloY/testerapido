import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identifique-paciente',
  templateUrl: './identifique-paciente.component.html',
  styleUrls: ['./identifique-paciente.component.scss']
})
export class IdentifiquePacienteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('body-etapas');
  }

}
