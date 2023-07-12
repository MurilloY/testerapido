import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import { MatRadioChange } from '@angular/material/radio';
import { CustomValidationService } from 'src/app/clinics/services/custom_validation.service';

@Component({
  selector: 'app-login-paciente',
  templateUrl: './login-paciente.component.html',
  styleUrls: ['./login-paciente.component.scss']
})
export class LoginPacienteComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean = true;
  returnError: boolean = false;
  email: boolean;
  cpf: string;
  selectedOption: string = '0';

  constructor(private router: Router, private route: ActivatedRoute, private pacientService: PacientesService, private customValidator: CustomValidationService) {
    this.loginForm = new FormGroup({
      user_email: new FormControl('', [Validators.email]),
      user_cpf: new FormControl('',),
      choice: new FormControl(this.selectedOption, [Validators.required]),
      user_password: new FormControl('', [Validators.required, Validators.minLength(6)])
    },
    );
  }

  public checkError = (controlName: string, errorName: string) => {
    let ret = this.loginForm.controls[controlName].hasError(errorName);
    return ret;
  }

  ngOnInit(): void {

    document.body.classList.add('login-page');
    
  }

  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.selectedOption = mrChange.value

    if (mrChange.value == '0') {
      this.loginForm.controls['user_email'].setValidators(Validators.required);
      this.loginForm.controls['user_email'].updateValueAndValidity();

      this.loginForm.controls['user_cpf'].setValidators(null);
      this.loginForm.controls['user_cpf'].updateValueAndValidity();
    }
    else {
      this.loginForm.controls['user_email'].setValidators(null);
      this.loginForm.controls['user_email'].updateValueAndValidity();

      this.loginForm.controls['user_cpf'].setValidators([this.customValidator.checkCPF('user_cpf'), Validators.required]);
      this.loginForm.controls['user_cpf'].updateValueAndValidity();
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.loginForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }

    console.log('Sistema', invalid)
    return invalid;
}

  verifyAuthPacient() {
    let form = this.loginForm.value;
    this.pacientService.postVerifyAuthPacient(form).subscribe()
  }

  onSubmit() {

    this.findInvalidControls()

    if (this.loginForm.valid) {

      let form = this.loginForm.value;
      // form.subdomain = this.clinic?.clinic_subdomain;

      this.pacientService.postAuthPacient(form).subscribe(
        data => {

          localStorage.setItem('UserPacientObject', JSON.stringify(data.user));
          localStorage.setItem('pacienteToken', data.token);

          this.router.navigate([`/paciente/agendamentos`]);
          console.log(data)

          this.returnError = false;
        },
        err => {
          this.returnError = true;
        }
      );
    }
  }

}
