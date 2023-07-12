import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic, ReturnClinicName } from '../../returns/clinic_name.return';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide: boolean = true;
  returnError: boolean = false;
  clinic_subdomain: string;
  clinic?: Clinic;
  clinic_url: string;
  password: string;


  constructor(private clinicService: ClinicService, private router: Router, private route: ActivatedRoute) {
    
    this.route.params.subscribe(params => this.clinic_subdomain = params['clinic_name']);

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    let ret = this.loginForm.controls[controlName].hasError(errorName);
    return ret;
  }

  ngOnInit(): void {

    this.clinicService.selectClinic(this.clinic_subdomain).subscribe(
      data => {
          this.clinic = data.clinic       
          this.returnError = false;
          this.clinic_url = `/clinica/${this.clinic.clinic_subdomain}/`;
    },
    err =>{
      this.returnError = true;
      console.log('entreeee')
      this.router.navigate(['/clinica/clinica-not-found'])
    }
    );

    document.body.classList.add('login-page');    
    

  }

  

  onSubmit() {

    if (this.loginForm.valid) {

      let form = this.loginForm.value;
      form.subdomain = this.clinic?.clinic_subdomain;

      this.clinicService.signIn(form).subscribe(
        data => {

          localStorage.setItem('UserClinicObject', JSON.stringify(data.user));
          localStorage.setItem('clinicToken', data.token);
          document.body.classList.remove('login-page');    


          this.router.navigate([`/clinica/${this.clinic?.clinic_subdomain}/consultas`]);

          this.returnError = false;
      },
      err =>{
        this.returnError = true;
      }
    );
    }
  }

}
