import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdmService } from '../../services/adm.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-adm',
  templateUrl: './login-adm.component.html',
  styleUrls: ['./login-adm.component.scss']
})
export class LoginAdmComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private admService: AdmService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.loginForm.valid) {

      let form = this.loginForm.value;


      this.admService.signIn(form).subscribe(
        data => {

          localStorage.setItem('UserAdmObject',JSON.stringify(data.adm));
          localStorage.setItem('admToken', data.token);

          this.router.navigate(['/adm']);

          Swal.fire({
            heightAuto: false,
            title: 'Sucesso',
            text: 'Login efetuado com sucesso!',
            icon: 'success',
            iconColor: '#01AEEF',
            showCancelButton: false,
            confirmButtonColor: '#01AEEF',
            confirmButtonText: 'OK'
          });

        },
        err => {

          Swal.fire({
            heightAuto: false,
            title: 'Ooops',
            text: err.error.message,
            icon: 'warning',
            iconColor: '#01AEEF',
            showCancelButton: false,
            confirmButtonColor: '#01AEEF',
            confirmButtonText: 'OK'
          });

        }
      );
    }



  }



}
