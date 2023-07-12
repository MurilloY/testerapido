import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReturnCities } from 'src/app/clinics/returns/cities.return';
import { ProfessionalService } from '../../services/professional.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditarPasswordComponent } from './editar-password/editar-password.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profissional-perfil',
  templateUrl: './profissional-perfil.component.html',
  styleUrls: ['./profissional-perfil.component.scss']
})
export class ProfissionalPerfilComponent implements OnInit {

  @ViewChild('fileInput') el: ElementRef;


  progress: number = 100;
  user?: any;

  CadastroProfessionalPerfilForm: FormGroup;

  imageUrl: any = "/assets/images/user.png";
  photobase64: any;
  editFile = true;
  removeUpload = false;
  photodefault = true;

  dados?: ReturnCities;
  cities?: string[];
  uf: string;

  professional: any;

  constructor(private professionalService: ProfessionalService, private dialog: MatDialog, public dialogRef: MatDialogRef<ProfissionalPerfilComponent>) {
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    this.imageUrl = this.user.user_photo
    console.log(this.user)
    this.getJsonCities();
    this.uf = this.user.user_address.ua_uf;

    this.CadastroProfessionalPerfilForm = new FormGroup({

      user_photo: new FormControl(this.photobase64, [Validators.required]),
      user_name: new FormControl(this.user.user_name, [Validators.required]),
      user_cpf: new FormControl({ value: this.user.user_cpf, disabled: true }, [Validators.required]),
      user_phone: new FormControl(this.user.user_phone),
      user_email2: new FormControl({ value: this.user.user_email, disabled: true }, [Validators.email]),
      user_email1: new FormControl(this.user.user_email, [Validators.email]),
      ua_city: new FormControl(this.user.user_address.ua_city, [Validators.required]),
      ua_uf: new FormControl(this.user.user_address.ua_uf, [Validators.required]),
      notify_prof_email: new FormControl(this.user.notify_prof_email),
      notify_prof_whatsapp: new FormControl(this.user.notify_prof_whatsapp),
      ua_cep: new FormControl(this.user.user_address.ua_cep, [Validators.required]),
      ua_name_street: new FormControl(this.user.user_address.ua_name_street, [Validators.required]),
      ua_house_number: new FormControl(this.user.user_address.ua_house_number, [Validators.required]),
      ua_district: new FormControl(this.user.user_address.ua_district, [Validators.required])

    });

  }

  ngOnInit(): void {
    
    this.convertToB64();
    document.body.classList.add('body-etapas');

  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  editPassword() {
    const dialogRef = this.dialog.open(EditarPasswordComponent, {
      width: '520px',
      maxHeight: '90vh',
      disableClose: false
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.getAppointments(this.daySelected);

      }

    });

  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = '/assets/images/user.png';
    this.editFile = true;
    this.removeUpload = false;
    this.photodefault = true

    // When file uploads set it to file formcontrol
    this.CadastroProfessionalPerfilForm.patchValue({
      user_photo: this.photobase64
    });

  }

  uploadFile(event: any) {

    let reader = new FileReader(); // HTML5 FileReader API
    let photo = event.target.files[0];
    console.log("Erro aqui", photo)

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(photo);

      // When file uploads set it to file formcontrol
      reader.onload = () => {

        this.imageUrl = reader.result;

        this.CadastroProfessionalPerfilForm.patchValue({
          user_photo: reader.result
        });


        this.photodefault = false;
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      // this.cd.markForCheck();
    }
  }

  convertToB64() {

    this.professionalService.convertToB64('/assets/images/user.png').subscribe(data => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;
        this.photobase64 = base64data

        this.CadastroProfessionalPerfilForm.patchValue({
          user_photo: this.photobase64
        });
      }

      reader.readAsDataURL(data);


    })

  }

  updateUser() {
    this.professionalService.updateUser(this.user.user_id).subscribe(data => {
      this.professional = data;
      console.log(this.professional)

    })

  }

  onSubmit() {

    let form = this.CadastroProfessionalPerfilForm.value;
    this.findInvalidControls();

    if (this.CadastroProfessionalPerfilForm.valid) {

      form.user_name = this.CadastroProfessionalPerfilForm.value.user_name
      form.user_email = this.user.user_email
      form.user_password = this.user.user_password
      form.user_phone = this.CadastroProfessionalPerfilForm.value.user_phone
      form.user_cpf = this.user.user_cpf
      form.user_rg = this.user.user_rg
      form.user_status = this.user.user_status
      form.user_gender = this.user.user_gender
      form.user_photo = this.CadastroProfessionalPerfilForm.value.user_photo
      form.notify_prof_email = this.CadastroProfessionalPerfilForm.value.notify_prof_email
      form.notify_prof_whatsapp = this.CadastroProfessionalPerfilForm.value.notify_prof_whatsapp
      form.ua_house_number = this.CadastroProfessionalPerfilForm.value.ua_house_number
      form.ua_district = this.CadastroProfessionalPerfilForm.value.ua_district
      form.photoisdefault = this.photodefault
      
      
      this.professionalService.updateInfoUser(this.user.user_id, form).subscribe(
        data => {


          Swal.fire({
            heightAuto: false,
            title: 'Sucesso',
            text: "Profissional atualizado com sucesso!",
            icon: 'success',
            iconColor: '#01AEEF',
            showCancelButton: false,
            confirmButtonColor: '#01AEEF',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          });

          this.dialogRef.close(true);
          this.getProfessional()

        },
        err => {

          Swal.fire({
            heightAuto: false,
            title: 'Ooops',
            text: err.error.message,
            icon: 'error',
            iconColor: '#01AEEF',
            showCancelButton: false,
            confirmButtonColor: '#01AEEF',
            confirmButtonText: 'OK'
          });

        }
      );


    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.CadastroProfessionalPerfilForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }

    console.log('Sistema', invalid)
    return invalid;
}

  getJsonCities() {

    this.professionalService.getJSON().subscribe(data => {
      this.dados = data;
      this.selectedState(this.uf)

    })

  }

  getProfessional() {

    this.professionalService.getProfessional(this.user.prof_id).subscribe(data => {
      localStorage.setItem('UserProfObject', JSON.stringify(data.professional));
  
    })

  }

  selectedState(state: string) {

    console.log(state)

    for (let i = 0; i < this.dados!.estados.length; i++) {         // percorre o array principal

      if (this.dados!.estados[i].sigla == state) {                // pega o estado conforme a seleção                             // mostra o select de cidades escondido
        this.cities = this.dados!.estados[i].cidades;                   // guarda as cidades respectivas
      }
    }


  }

}
