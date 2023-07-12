import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cpf } from 'cpf-cnpj-validator';
import { Category } from 'src/app/adm/returns/categories.retunr';
import { Professional } from 'src/app/adm/returns/professionals.return';
import { RegisterType } from 'src/app/adm/returns/register_types.return';
import { Speciality } from 'src/app/adm/returns/specialities.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-professional-clinic',
  templateUrl: './add-professional-clinic.component.html',
  styleUrls: ['./add-professional-clinic.component.css']
})
export class AddProfessionalClinicComponent implements OnInit {

  @ViewChild('fileInput') el?: ElementRef;
  imageUrl: any = '/assets/img/user.png';
  editFile: boolean = true;
  removeUpload: boolean = false;

  categories?: Category[];
  specialities?: Speciality[];
  register_types?: RegisterType[];

  showCPF: boolean = true;
  form_visibility: boolean = false;

  dialogTitle: string = "Cadastrar profissional na clínica"

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  professional?: Professional;

  user_id?: string;
  user_photo?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  user_cpf?: string;
  user_rg?: string;
  user_gender?: string;
  clinic_id?: string;

  cpf?: string;

  userInsert: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddProfessionalClinicComponent>,
    private admService: AdmService,
    private _formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {


    this.professional = data['professional'];
    this.clinic_id = data['clinic_id'];


    if (this.professional != null) {

      this.dialogTitle = "Atualizar profissional"

      this.form_visibility = true;

      this.user_id = this.professional.user_id;
      this.user_photo = this.professional.user_photo;
      this.user_name = this.professional.user_name;
      this.user_email = this.professional.user_email;
      this.user_phone = this.professional.user_phone;
      this.user_cpf = this.professional.user_cpf;
      this.user_rg = this.professional.user_rg;
      this.user_gender = this.professional.user_gender;

      this.secondFormGroup = this._formBuilder.group({
        specialities: this._formBuilder.array([])

      });


      const esp = this.secondFormGroup.get('specialities') as FormArray
      if (this.professional.specialties != undefined) {
        for (let i = 0; i < this.professional.specialties.length; i = i + 1) {

          esp.push(
            new FormGroup({
              spe_id: new FormControl(this.professional.specialties[i].spe_id, [Validators.required]),
              cat_id: new FormControl(this.professional.specialties[i].cat_id, [Validators.required]),
              rt_id: new FormControl(this.professional.specialties[i].rt_id, [Validators.required]),
              rt_number: new FormControl(this.professional.specialties[i].rt_number, [Validators.required])
            })
          )
        }
      }

    }
    else {

      this.secondFormGroup = this._formBuilder.group({
        specialities: this._formBuilder.array([this.createSpeFormGroup()])

      });

    }

    this.firstFormGroup = this._formBuilder.group({
      user_photo: new FormControl(this.user_photo),
      user_name: new FormControl(this.user_name, [Validators.required]),
      user_email: new FormControl(this.user_email, [Validators.required, Validators.email]),
      user_phone: new FormControl(this.user_phone, [Validators.required]),
      user_cpf: new FormControl(this.user_cpf, [Validators.required]),
      user_rg: new FormControl(this.user_rg, [Validators.required]),
      user_gender: new FormControl(this.user_gender, [Validators.required])
    });




  }

  ngOnInit(): void {

    this.getCategories();
    this.getRegisters();

  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  public addSpeFormGroup() {
    const spe = this.secondFormGroup.get('specialities') as FormArray
    spe.push(this.createSpeFormGroup())
  }

  public removeSpe(i: number) {
    const esp = this.secondFormGroup.get('specialities') as FormArray
    if (esp.length > 0) {
      esp.removeAt(i)
    }
  }

  get speFormGroups() {
    return this.secondFormGroup.get('specialities') as FormArray
  }

  private createSpeFormGroup(): FormGroup {
    return new FormGroup({
      spe_id: new FormControl(""),
      cat_id: new FormControl(""),
      rt_id: new FormControl(""),
      rt_number: new FormControl("")
    })
  }

  getRegisters() {

    this.admService.getRegisterTypes().subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.register_types = data.register_types;


    }, err => {

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

    })
  }


  getCategories() {

    this.admService.getCategories().subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.categories = data.categories;


    }, err => {

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

    })
  }

  getSpecialities(cat_id: string) {

    this.admService.getSpecialitiesByCategory(cat_id).subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.specialities = data.specialities;


    }, err => {

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

    })
  }

  selectedCategory(cat_id: string) {

    this.getSpecialities(cat_id);

  }

  onSubmit() {

    if (this.secondFormGroup.valid) {

      var data1 = this.firstFormGroup.getRawValue()



      if (this.userInsert) {

        data1.user_password = (Math.floor(100000 + Math.random() * 900000)).toString();
        data1.user_photo = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        data1.user_status = 1;

        data1.specialities = this.secondFormGroup.value['specialities']

        this.admService.insertUserProfessional(data1).subscribe(
          data => {

            let data4 = {
              prof_id: data['professional']['prof_id'],
              clinic_id: this.clinic_id,
              pc_status: 1,
            }


            this.admService.insertUserProfessionalClinic(data4).subscribe(
              data => {

                Swal.fire({
                  heightAuto: false,
                  title: 'Sucesso',
                  text: "Profissional cadastrado com sucesso!",
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
      else {

        let data3 = {
          user_id: this.user_id,
          prof_status: 1,
          specialities: this.secondFormGroup.value['specialities']

        }

        this.admService.insertProfessional(data3).subscribe(
          data => {

            let data4 = {
              prof_id: data['professional']['prof_id'],
              clinic_id: this.clinic_id,
              pc_status: 1,
            }


            this.admService.insertUserProfessionalClinic(data4).subscribe(
              data => {

                Swal.fire({
                  heightAuto: false,
                  title: 'Sucesso',
                  text: "Profissional cadastrado com sucesso!",
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

  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let photo = event.target.files[0];

    this.firstFormGroup.patchValue({
      photo: photo
    });



    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(photo);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;

        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el!.nativeElement.files);
    this.imageUrl = '/assets/img/user.png';
    this.editFile = true;
    this.removeUpload = false;
    this.firstFormGroup.patchValue({
      photo: ""
    });
  }





  searchCPF() {

    this.firstFormGroup.reset();

    this.imageUrl = '/assets/img/user.png';


    if (cpf.isValid(this.cpf!)) {



      this.admService.getUserType(this.cpf!).subscribe(data => {


        if (data.user.type == 2) {

          this.form_visibility = true;

          this.firstFormGroup = this._formBuilder.group({
            user_photo: new FormControl(data.user.user_photo),
            user_name: new FormControl(data.user.user_name, [Validators.required]),
            user_email: new FormControl(data.user.user_email, [Validators.required, Validators.email]),
            user_phone: new FormControl(data.user.user_phone, [Validators.required]),
            user_cpf: new FormControl(data.user.user_cpf, [Validators.required]),
            user_rg: new FormControl(data.user.user_rg, [Validators.required]),
            user_gender: new FormControl(data.user.user_gender, [Validators.required])
          });


          const esp = this.secondFormGroup.get('specialities') as FormArray
          if (data.user.specialties != undefined) {
            for (let i = 0; i < data.user.specialties.length; i = i + 1) {

              esp.push(
                new FormGroup({
                  spe_id: new FormControl(data.user.specialties[i].spe_id, [Validators.required]),
                  cat_id: new FormControl(data.user.specialties[i].cat_id, [Validators.required]),
                  rt_id: new FormControl(data.user.specialties[i].rt_id, [Validators.required]),
                  rt_number: new FormControl(data.user.specialties[i].rt_number, [Validators.required])
                })
              )
            }
          }

        }
        else {

          this.form_visibility = true;

          this.imageUrl = data.user.user_photo;


          this.firstFormGroup.get("user_photo")!.setValue(data.user.user_photo);
          this.firstFormGroup.get("user_name")!.setValue(data.user.user_name);
          this.firstFormGroup.get("user_email")!.setValue(data.user.user_email);
          this.firstFormGroup.get("user_gender")!.setValue(data.user.user_gender);
          this.firstFormGroup.get("user_rg")!.setValue(data.user.user_rg);
          this.firstFormGroup.get("user_cpf")!.setValue(data.user.user_cpf);
          this.firstFormGroup.get("user_phone")!.setValue(data.user.user_phone);

          this.user_id = data.user.user_id;

          this.firstFormGroup.controls['user_name'].disable();
          this.firstFormGroup.controls['user_cpf'].disable();
          this.firstFormGroup.controls['user_rg'].disable();
          this.firstFormGroup.controls['user_gender'].disable();
          this.firstFormGroup.controls['user_email'].disable();
          this.firstFormGroup.controls['user_phone'].disable();


          this.userInsert = false;

        }


      },
        err => {

          this.user_id = undefined;

          if (err.error.status_code == 400) {
            this.form_visibility = false;

            Swal.fire({
              heightAuto: false,
              title: 'Ooops.',
              text: err.error.message,
              icon: 'error',
              iconColor: '#01AEEF',
              showCancelButton: false,
              confirmButtonColor: '#01AEEF',
              cancelButtonColor: '#d33',
              confirmButtonText: 'OK'
            });
          }

          if (err.error.status_code == 404) {

            this.form_visibility = true;
            this.firstFormGroup.get("user_cpf")!.setValue(this.cpf);

            this.firstFormGroup.controls['user_cpf'].disable();

            this.userInsert = true;

          }


        })

    }
    else {
      Swal.fire("CPF inválido", "Por favor digite um CPF válido", "error");
    }





  }


  public checkError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }

}
