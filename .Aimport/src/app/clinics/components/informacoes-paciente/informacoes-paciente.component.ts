import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacoes-paciente',
  templateUrl: './informacoes-paciente.component.html',
  styleUrls: ['./informacoes-paciente.component.scss']
})
export class InformacoesPacienteComponent implements OnInit {

  acompanhante: string;
  endereco: string;

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('body-etapas');
  }

}
