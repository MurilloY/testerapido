import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';

@Component({
  selector: 'app-paciente-esqueci-senha',
  templateUrl: './paciente-esqueci-senha.component.html',
  styleUrls: ['./paciente-esqueci-senha.component.scss']
})
export class PacienteEsqueciSenhaComponent implements OnInit {

  public showBox: string = "login";
  public hide: boolean = true;
  public formGroup: FormGroup;
  public formGroup2: FormGroup;
  public formGroup3: FormGroup;
  public passwordLengthError: boolean = false;
  public passwordSpecialError: boolean = false;
  public passwordNumberError: boolean = false;
  public message:string;
  public user_email:string;
  public token:string;
  returnError:boolean = false; 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private pacientService: PacientesService,
    private route: ActivatedRoute
  ) { }


  onSubmit() {
    console.log(this.router.url)

    let url = this.router.url;

    if (this.router.url === `/paciente/esqueci-senha`) {

      console.log(this.formGroup.valid)

      if (this.formGroup.valid) {
        this.formGroup.value.user_email
        localStorage.setItem('EmailToken', this.formGroup.value.user_email);

        this.pacientService.updateCodeRequest(this.formGroup.value).subscribe(
          data => {

            this.router.navigate([`/paciente/esqueci-senha/code`]);
          },
          err => {
            this.returnError = true;
          }
        );




      }
    }
    if (this.router.url === `/paciente/esqueci-senha/code`) {
      if (this.formGroup2.valid) {
        console.log(this.user_email)
        this.user_email = localStorage.getItem("EmailToken")!;

        this.pacientService.updateValidateCode(this.user_email, this.formGroup2.value.code).subscribe(
          data => {
            this.router.navigate([`/paciente/esqueci-senha/crie-senha`]);
            localStorage.setItem('EmailCode', this.formGroup2.value.code);
          },
          err => {
            this.returnError = true;
          }
        );



      }
    }
    if (this.router.url === `/paciente/esqueci-senha/crie-senha`) {
      if (this.formGroup3.valid) {

        this.user_email = localStorage.getItem("EmailToken")!;
        this.token = localStorage.getItem("EmailCode")!;

        let data = {
          user_email: this.user_email,
          code: this.token,
          password: this.formGroup3.value.password
        }
        console.log(data);

        this.pacientService.updateReplacePassword(data).subscribe(
          data => {
            this.router.navigate([`/paciente/esqueci-senha/sucesso`]);

          },

          err => {
            this.returnError = true;
          }

        );


      }
    }
    if (this.router.url === `/paciente/esqueci-senha/sucesso`) {
      this.showBox = "success";
    }

  }

  ngOnInit(): void {

    let url = this.router.url;

    document.body.classList.add('login-page');    


    if (this.router.url === `/paciente/esqueci-senha`)
      this.showBox = "login";

    if (this.router.url ===  `/paciente/esqueci-senha/code`)
      this.showBox = "code";

    if (this.router.url === `/paciente/esqueci-senha/crie-senha`)
      this.showBox = "password";

    if (this.router.url ===  `/paciente/esqueci-senha/sucesso`)
      this.showBox = "success";

    this.formGroup = this.formBuilder.group({
      user_email: ['', [Validators.required, Validators.email]]
    });

    this.formGroup2 = this.formBuilder.group({
      code: ['', [Validators.required]]
    });

    this.formGroup3 = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    let ret = this.formGroup.controls[controlName].hasError(errorName);
    return ret;
  }

  public checkError2 = (controlName: string, errorName: string) => {
    let ret = this.formGroup2.controls[controlName].hasError(errorName);
    return ret;
  }

  public checkError3 = (controlName: string, errorName: string) => {
    let ret = this.formGroup3.controls[controlName].hasError(errorName);
    return ret;
  }

  verificaSenha(event: any) {
    let password = this.formGroup3.controls["password"].value;
    (password.length >= 6) ? this.passwordLengthError = false : this.passwordLengthError = true;
    (/[#?!@$%^&*-]/.test(password)) ? this.passwordSpecialError = false : this.passwordSpecialError = true;
    (/[0-9]/.test(password)) ? this.passwordNumberError = false : this.passwordNumberError = true;
  }

}
