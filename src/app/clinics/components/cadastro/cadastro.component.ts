import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReturnCities } from 'src/app/adm/returns/cities.return';
import { AdmService } from 'src/app/adm/services/adm.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  dados?: ReturnCities;
  cities?: string[];

  public formGroup: FormGroup;
  public hide: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private admService: AdmService,) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],

    });

    this.getJsonCities()

    document.body.classList.add('login-page');
  }

  selectedState(state: string) {

    for (let i = 0; i < this.dados!.estados.length; i++) {         // percorre o array principal

      if (this.dados!.estados[i].sigla == state) {                // pega o estado conforme a seleção                             // mostra o select de cidades escondido
        this.cities = this.dados!.estados[i].cidades;                   // guarda as cidades respectivas
      }
    }


  }

  getJsonCities() {

    this.admService.getJSON().subscribe(data => {
      this.dados = data;

    }
    )

  }

  public checkError = (controlName: string, errorName: string) => {
    let ret = this.formGroup.controls[controlName].hasError(errorName);
    return ret;
  }

}
