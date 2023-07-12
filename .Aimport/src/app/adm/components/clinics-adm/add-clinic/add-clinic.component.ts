import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReturnCities } from 'src/app/adm/returns/cities.return';
import { Clinic } from 'src/app/adm/returns/clinics.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.scss']
})
export class AddClinicComponent implements OnInit {
  
  @ViewChild('fileInput') el: ElementRef;
  clinicFormGroup: FormGroup;
  clinic?:Clinic;
  dados?: ReturnCities;
  cities?: string[];

  photodefault = true;


  clinic_email?: string;
  clinic_name?: string;
  clinic_city?: string;
  clinic_state?: string;
  clinic_cep?: string;
  clinic_address?: string;
  clinic_number?: string;
  clinic_neighborhood?: string;
  clinic_cnpj?: string;
  clinic_phone?: string;
  clinic_site?: string;
  clinic_status: string = "1";
  clinic_logo: any;
  subdomain: string;
  lat_long: string;
  editFile = true;
  removeUpload = false;
  photobase64: any;


  dialogTitle: string = "Cadastrar clínica";

  constructor( public dialogRef: MatDialogRef<AddClinicComponent>,
    private formBuilder: FormBuilder,
    private admService: AdmService,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {


    this.clinic = data;
    if(this.clinic != null){

      this.dialogTitle = "Editar clínica";


      this.clinic_email = this.clinic.clinic_email;
      this.clinic_name = this.clinic.clinic_name;
      this.clinic_city = this.clinic.clinic_city;
      this.clinic_state = this.clinic.clinic_state;
      this.clinic_address = this.clinic.clinic_address;
      this.clinic_number = this.clinic.clinic_number;
      this.clinic_neighborhood = this.clinic.clinic_neighborhood;
      this.clinic_cnpj = this.clinic.clinic_cnpj;
      this.clinic_phone = this.clinic.clinic_phone;
      this.clinic_site = this.clinic.clinic_site;
      this.subdomain = this.clinic.subdomain;
      this.lat_long = this.clinic.lat_long;
      this.clinic_status = this.clinic.clinic_status.toString();
      this.clinic_logo = this.clinic.clinic_logo;
      this.clinic_cep = this.clinic.clinic_cep;
      

     
     
      
      
    }else{
      this.clinic_logo = '/assets/images/logoclinica.jpg'
    }

    this.clinicFormGroup = new FormGroup({
      clinic_email: new FormControl(this.clinic_email, [Validators.required, Validators.email]),
      clinic_name: new FormControl(this.clinic_name, [Validators.required]),
      clinic_city: new FormControl(this.clinic_city, [Validators.required]),
      clinic_state: new FormControl(this.clinic_state, [Validators.required]),
      clinic_address: new FormControl(this.clinic_address, [Validators.required]),
      clinic_number: new FormControl(this.clinic_number, [Validators.required]),
      clinic_neighborhood: new FormControl(this.clinic_neighborhood, [Validators.required]),
      clinic_cnpj: new FormControl(this.clinic_cnpj, [Validators.required]),
      clinic_phone: new FormControl(this.clinic_phone, [Validators.required]),
      clinic_site: new FormControl(this.clinic_site, [Validators.required]),
      clinic_status: new FormControl(this.clinic_status, [Validators.required]),
      subdomain: new FormControl(this.subdomain, [Validators.required]),
      lat_long: new FormControl(this.lat_long),
      clinic_logo: new FormControl(this.clinic_logo, [Validators.required]),
      clinic_cep: new FormControl(this.clinic_cep, [Validators.required]),
    });

    this.getJsonCities();

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.clinicFormGroup!.controls[controlName].hasError(errorName);
  }

  getJsonCities() {

    if(this.clinic != null){
      this.admService.getJSON().subscribe(data => {
        this.dados = data;

        this.selectedState(this.clinic_state!);
  
      })


    }
    else{
      this.admService.getJSON().subscribe(data => {
        this.dados = data;
  
      })

    }

  }

  selectedState(state:string){

    for (let i = 0; i < this.dados!.estados.length; i++) {         // percorre o array principal
  
      if (this.dados!.estados[i].sigla == state) {                // pega o estado conforme a seleção                             // mostra o select de cidades escondido
        this.cities = this.dados!.estados[i].cidades;                   // guarda as cidades respectivas
      }
    }
  

  }

  ngOnInit(): void {
    document.body.classList.add('login-page');
  }

  onDismiss(){
    this.dialogRef.close(false);
  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.clinic_logo = '/assets/images/logoclinica.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.photodefault = true

    this.clinicFormGroup.patchValue({
      clinic_logo: this.photobase64,
      file: null
    });
  }
  
  uploadFile(event:any) {

    let reader = new FileReader(); // HTML5 FileReader API
    let photo = event.target.files[0];

    

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(photo);
      
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.clinic_logo = reader.result;
        this.clinicFormGroup.patchValue({
          file: photo
        });
        this.photodefault = false;
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  onSubmit(){

    let form = this.clinicFormGroup.value;
    this.findInvalidControls();
    form.photoisdefault = this.photodefault

    console.log(form)


    if(this.clinicFormGroup.valid){

      form.clinic_logo = this.clinic_logo;
      console.log('Entrei')
    

      if(this.clinic != null){

        console.log('Entrei')

        this.admService.updateClinic(this.clinic.clinic_id, form).subscribe(
          data => {
  
  
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Clínica atualizada com sucesso!",
              icon: 'success',
              iconColor: '#01AEEF',
              showCancelButton: false,
              confirmButtonColor: '#01AEEF',
              cancelButtonColor: '#d33',
              confirmButtonText: 'OK'
            });
    
            this.dialogRef.close(true);
    
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
      else{
        this.admService.insertClinic(form).subscribe(
          data => {
            console.log("entrei")
            console.log(form)
  
  
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Clínica cadastrada com sucesso!",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#01AEEF',
              cancelButtonColor: '#d33',
              confirmButtonText: 'OK'
            });
    
            this.dialogRef.close(true);
    
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

  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.clinicFormGroup.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }

    console.log('Sistema', invalid)
    return invalid;
}

}
