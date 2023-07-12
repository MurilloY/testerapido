import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfessionalService } from 'src/app/professional/services/professional.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-password',
  templateUrl: './editar-password.component.html',
  styleUrls: ['./editar-password.component.scss']
})
export class EditarPasswordComponent implements OnInit {

  CadastroChangePasswordForm: FormGroup;

  user: any;

  password: any;

  constructor(private professionalService: ProfessionalService, public dialogRef: MatDialogRef<EditarPasswordComponent>, private dialog: MatDialog,) {
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    console.log(this.user)

    this.CadastroChangePasswordForm = new FormGroup({

      old_password: new FormControl('', [Validators.required]),
      user_password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {
  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  onSubmit() {
    if (this.CadastroChangePasswordForm.valid) {
      let form = this.CadastroChangePasswordForm.value

      if (form.user_password == form.confirm_password) {

        this.professionalService.updateUserPassword(this.user.user_id, form).subscribe(data => {
          Swal.fire({
            heightAuto: false,
            title: 'Sucesso',
            text: 'Senha alterada com sucesso',
            icon: 'success',
            iconColor: '#243645',
            showCancelButton: false,
            confirmButtonColor: '#243645',
            confirmButtonText: 'OK'
          });
          this.dialogRef.close(true);

          setTimeout(() => {
            console.log('Fazendo logout...');
            this.professionalService.logout().subscribe(data => {
              console.log('Logout realizado com sucesso.');
            }, err => {
              console.log('Erro ao fazer logout: ', err);
            });
          }, 1000); // atraso de 1 segundo (1000ms)

        }, err => {

          Swal.fire({
            heightAuto: false,
            title: 'Ooops...',
            text: 'Senha atual incorreta',
            icon: 'error',
            iconColor: '#243645',
            showCancelButton: false,
            confirmButtonColor: '#243645',
            confirmButtonText: 'OK'
          });
          // this.disabled = false;
        })

      } else {
        // this.disabled = false;
        Swal.fire({
          heightAuto: false,
          title: 'Ooops...',
          text: 'Novas senhas diferentes',
          icon: 'warning',
          iconColor: '#243645',
          showCancelButton: false,
          confirmButtonColor: '#243645',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}