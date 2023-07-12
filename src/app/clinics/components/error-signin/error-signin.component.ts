import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Clinic} from '../../returns/clinic_name.return';


@Component({
  selector: 'app-error-signin',
  templateUrl: './error-signin.component.html',
  styleUrls: ['./error-signin.component.scss']
})
export class ErrorSigninComponent implements OnInit {

  clinic?: Clinic;


  public formGroup: FormGroup;
  public hide: boolean = true;

  constructor(private formBuilder: FormBuilder) { 
    document.body.classList.add('login-page');    

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
		});
  }

  public checkError = (controlName: string, errorName: string) => {
    let ret = this.formGroup.controls[controlName].hasError(errorName);
    return ret;
  }

}
