import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  anoAtual: number;

  constructor() { }

  ngOnInit(): void {
    this.getAnoAtual()
  }

  getAnoAtual(): any {
    const dataAtual = new Date(); 
    this.anoAtual = dataAtual.getFullYear();
  }

}
