import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from 'src/app/clinics/returns/clinic_name.return';
import Swal from 'sweetalert2';
import { AdmService } from '../../../adm/services/adm.service';
import { ProfessionalService } from '../../services/professional.service';
import { MatRadioChange } from '@angular/material/radio';
import { CustomValidationService } from 'src/app/clinics/services/custom_validation.service';

@Component({
  selector: 'app-login-profissional',
  templateUrl: './login-profissional.component.html',
  styleUrls: ['./login-profissional.component.scss']
})
export class LoginProfissionalComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean = true;
  returnError: boolean = false;
  clinic_subdomain: string;
  clinic?: Clinic;
  clinic_url: string;
  selectedOption: string = '0';


  constructor(private professionalService: ProfessionalService, private router: Router, private route: ActivatedRoute, private customValidator: CustomValidationService) {

    // this.route.params.subscribe(params => this.clinic_subdomain = params['clinic_name']);

    this.loginForm = new FormGroup({
      user_email: new FormControl('', [Validators.email]),
      user_cpf: new FormControl('',),
      choice: new FormControl(this.selectedOption, [Validators.required]),
      user_password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    let ret = this.loginForm.controls[controlName].hasError(errorName);
    return ret;
  }

  ngOnInit(): void {



    document.body.classList.add('login-page');


  }
  onSubmit() {

    this.findInvalidControls()
    if (this.loginForm.valid) {

      let form = this.loginForm.value;
      //form.subdomain = this.clinic?.clinic_subdomain;

      this.professionalService.postAuthProfessional(form).subscribe(
        data => {

          localStorage.setItem('UserProfObject', JSON.stringify(data.professional));
          localStorage.setItem('profToken', data.token);

          this.router.navigate([`/profissional/agendamentos`]);

          this.returnError = false;
        },
        err => {
          this.returnError = true;
        }
      );
    }
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
}
