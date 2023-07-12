import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { cpf } from 'cpf-cnpj-validator';

@Injectable({
    providedIn: 'root'
})
export class CustomValidationService {
    //https://www.freecodecamp.org/news/how-to-validate-angular-reactive-forms/

    constructor() { }

    patternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            console.log(control.value)
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
            const valid = regex.test(control.value);
            return valid ? null : { invalidPassword: true };
        };
    }

    checkCPF(user_cpf: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const cpfControl = control.parent?.get(user_cpf);

            if (!cpfControl) {
                return null;
            }

            if (cpfControl.errors && !cpfControl.errors['checkCPF']) {
                return null;
            }

            if (!cpf.isValid(cpfControl.value)) {
                return { checkCPF: true };
            } else {
                return null;
            }

           
        };
    }
}