import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cpf } from 'cpf-cnpj-validator';
import * as moment from 'moment';
import { Category } from 'src/app/clinics/returns/categories.retunr';
import { ReturnCities } from 'src/app/clinics/returns/cities.return';
import { Clinic } from 'src/app/clinics/returns/clinic_by_user.return';
import { RegisterType } from 'src/app/clinics/returns/register_types.return';
import { ClinicService } from 'src/app/clinics/services/clinic.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.scss']
})
export class AddProfessionalComponent implements OnInit {

  @ViewChild('fileInput') el: ElementRef;

  user: any;
  clinic_subdomain: string;
  clinic: Clinic;

  progress: number = 5;
  etapa: number = 1;

  blockbutton: boolean = false;

  CadastroProfessionalForm: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  showErrorCPF: boolean = false;
  errorCPFMsg: string;
  acompanhante: string;
  endereco: string;

  showCpf: boolean = true;
  showForm: boolean = false;

  showErrorDay = false;
  errorDayMsg: string;

  dados?: ReturnCities;
  cities?: string[];
  

  is_update: boolean = false;

  editFile = true;
  removeUpload = false;
  photodefault = true;

  imageUrl: any = "/assets/images/user.png";
  photobase64: any;



  categories?: Category[];
  specialities?: any = [];
  register_types?: RegisterType[];

  constructor(public dialogRef: MatDialogRef<AddProfessionalComponent>,
    private clinicService: ClinicService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef,) {

    console.log(data)

    this.clinic = data["clinic"];
    this.getJsonCities();

    this.CadastroProfessionalForm = new FormGroup({

      user_name: new FormControl('', [Validators.required]),
      user_gender: new FormControl('', [Validators.required]),
      birth_data: new FormControl('', [Validators.required]),
      user_rg: new FormControl(),
      user_cpf: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ua_cep: new FormControl('', [Validators.required]),
      ua_uf: new FormControl('', [Validators.required]),
      ua_city: new FormControl('', [Validators.required]),
      ua_district: new FormControl('', [Validators.required]),
      ua_name_street: new FormControl('', [Validators.required]),
      ua_house_number: new FormControl('', [Validators.required]),
      user_phone: new FormControl(),
      user_email: new FormControl('', [Validators.email]),
      user_photo: new FormControl(this.photobase64, [Validators.required]),

    });

    if (data['professional'] != null) {
      this.showCpf = false;
      this.showForm = true
      this.is_update = true;


      this.getProfClinic(data['professional']['pc_id'])


    }
    else {

      this.secondFormGroup = this._formBuilder.group({
        specialities: this._formBuilder.array([this.createSpeFormGroup()])

      });

      this.thirdFormGroup = this._formBuilder.group({
        disponibilities: this._formBuilder.array([this.createAccessFormGroup()])

      });

    }



    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);



  }

  ngOnInit(): void {

    this.convertToB64();
    this.getCategories();
    this.getRegisters();
  }

  getJsonCities() {

    this.clinicService.getJSON().subscribe(data => {
      this.dados = data;

    })

  }

  convertToB64() {

    this.clinicService.convertToB64('/assets/images/user.png').subscribe(data => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;
        this.photobase64 = base64data

        this.CadastroProfessionalForm.patchValue({
          user_photo:  this.photobase64
        });
      }
      
      reader.readAsDataURL(data); 
        

    })

  }

  public addAccessFormGroup() {
    const access = this.thirdFormGroup.get('disponibilities') as FormArray
    access.push(this.createAccessFormGroup())
  }

  private createAccessFormGroup(): FormGroup {
    return new FormGroup({
      start_time: new FormControl(''),
      end_time: new FormControl(''),
      modality: new FormControl('1'),
      time: new FormControl(''),
      gap: new FormControl(''),
      days: new FormGroup({
        0: new FormControl(false),
        1: new FormControl(false),
        2: new FormControl(false),
        3: new FormControl(false),
        4: new FormControl(false),
        5: new FormControl(false),
        6: new FormControl(false)
      })
    });
  }

  public removeAccess(i: number) {
    const access = this.thirdFormGroup.get('disponibilities') as FormArray
    if (access.length > 0) {
      access.removeAt(i)
    }
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

  get dispFormGroups() {
    return this.thirdFormGroup.get('disponibilities') as FormArray
  }

  private createSpeFormGroup(): FormGroup {
    return new FormGroup({
      spe_id: new FormControl(""),
      cat_id: new FormControl(""),
      rt_id: new FormControl(""),
      rt_number: new FormControl("")
    })
  }

  nextStep() {

    if (this.etapa < 8) {
      this.etapa++;
    }

    this.checkStep();

  }

  checkChange(pos: number, data: any) {


    if (data.checked === true) {

      this.dispFormGroups.at(pos).get('days')!.get('0')!.setValue(true);
      this.dispFormGroups.at(pos).get('days')!.get('1')!.setValue(true);
      this.dispFormGroups.at(pos).get('days')!.get('2')!.setValue(true);
      this.dispFormGroups.at(pos).get('days')!.get('3')!.setValue(true);
      this.dispFormGroups.at(pos).get('days')!.get('4')!.setValue(true);
      this.dispFormGroups.at(pos).get('days')!.get('5')!.setValue(true);
      this.dispFormGroups.at(pos).get('days')!.get('6')!.setValue(true);


    }
    else {

      this.dispFormGroups.at(pos).get('days')!.get('0')!.setValue(false);
      this.dispFormGroups.at(pos).get('days')!.get('1')!.setValue(false);
      this.dispFormGroups.at(pos).get('days')!.get('2')!.setValue(false);
      this.dispFormGroups.at(pos).get('days')!.get('3')!.setValue(false);
      this.dispFormGroups.at(pos).get('days')!.get('4')!.setValue(false);
      this.dispFormGroups.at(pos).get('days')!.get('5')!.setValue(false);
      this.dispFormGroups.at(pos).get('days')!.get('6')!.setValue(false);

    }



  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = '/assets/images/user.png';
    this.editFile = true;
    this.removeUpload = false;
    this.photodefault = true

    // When file uploads set it to file formcontrol
    this.CadastroProfessionalForm.patchValue({
      user_photo:  this.photobase64
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

        this.CadastroProfessionalForm.patchValue({
          user_photo: reader.result
        });


        this.photodefault = false;
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }




  getSpecialities(cat_id: string, pos: number) {

    this.clinicService.getSpecialitiesByCategory(cat_id).subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.specialities[pos] = data.specialities;


    }, err => {

      // Swal.fire({
      //   heightAuto: false,
      //   title: 'Ooops',
      //   text: err.error.message,
      //   icon: 'error',
      //   iconColor: '#01AEEF',
      //   showCancelButton: false,
      //   confirmButtonColor: '#01AEEF',
      //   confirmButtonText: 'OK'
      // });

    })
  }

  getRegisters() {

    this.clinicService.getRegisterTypes().subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.register_types = data.register_types;


    }, err => {

      // Swal.fire({
      //   heightAuto: false,
      //   title: 'Ooops',
      //   text: err.error.message,
      //   icon: 'error',
      //   iconColor: '#01AEEF',
      //   showCancelButton: false,
      //   confirmButtonColor: '#01AEEF',
      //   confirmButtonText: 'OK'
      // });

    })
  }


  getCategories() {

    this.clinicService.getCategories().subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.categories = data.categories;


    }, err => {

      // Swal.fire({
      //   heightAuto: false,
      //   title: 'Ooops',
      //   text: err.error.message,
      //   icon: 'error',
      //   iconColor: '#01AEEF',
      //   showCancelButton: false,
      //   confirmButtonColor: '#01AEEF',
      //   confirmButtonText: 'OK'
      // });

    })
  }

  selectedCategory(cat_id: string, pos: number) {

    this.getSpecialities(cat_id, pos);

  }

  previousStep() {

    if (this.etapa > 0) {
      this.etapa--;
    }

    this.checkStep();

  }



  checkStep() {

    console.log('etapa', this.etapa)

    switch (this.etapa) {
      case 1: {
        this.progress = 5;
        break;
      }
      case 2: {
        this.progress = 30;
        break;
      }
      case 3: {
        this.progress = 65;
        break;
      }
      case 4: {
        this.progress = 70;
        break;
      }


      default: {
        this.progress = 0;
        break;
      }
    }

  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  step1() {

    console.log(this.CadastroProfessionalForm.value)

    if (this.CadastroProfessionalForm.valid) {
      this.nextStep();
    }

  }

  step2() {

    if (this.secondFormGroup.valid) {
      this.nextStep();
    }

  }

  step3() {

    if (this.thirdFormGroup.valid) {

      if (!this.checkNoDaySelected()) {
        // this.nextStep();

        this.blockbutton = true;

        var data = this.CadastroProfessionalForm.getRawValue()

        console.log(this.CadastroProfessionalForm.value.birth_data)

        data.who_user = this.user.user_id;
        data.clinic_id = this.clinic.clinic_id;
        data.specialities = this.secondFormGroup.value['specialities'];
        data.disponibilities = this.thirdFormGroup.value['disponibilities'];
        data.birth_data = moment(this.CadastroProfessionalForm.value.birth_data).format('YYYY-MM-DD');
        data.is_update = this.is_update;
        data.photoisdefault = this.photodefault
        console.log(data)

        this.clinicService.insertProfessionalVerify(data).subscribe(data => {

          if (data.refreshToken) {
            localStorage.setItem("admToken", data.refreshToken)
          }

          let desc = "Profissional cadastrado com sucesso."

          if (this.is_update){
            desc = "Profissional atualizado com sucesso."
          }

          const dialogRef = this.dialog.open(ConfirmdialogComponent, {
            data: {
              version: 1,
              title: "SUCESSO",
              desc: desc,
              button_confirm: "OK",
              button_cancel: "Cancelar"
            },
          });

          dialogRef.afterClosed().subscribe(dialogResult => {

            if (dialogResult) {
              this.dialogRef.close(true)
            }

          });

          this.blockbutton = false;


        }, err => {

          this.blockbutton = false;

          const dialogRef = this.dialog.open(ConfirmdialogComponent, {
            data: {
              version: 1,
              title: "Ops",
              desc: err.error.message,
              button_confirm: "OK",
              button_cancel: "Cancelar"
            },
          });

          dialogRef.afterClosed().subscribe(dialogResult => {

            if (dialogResult) {
            }

          });
        })

      }


    }

  }

  checkNoDaySelected(): boolean {

    var selected = false;



    var myArray = ["0", "1", "2", "3", "4", "5", "6"];

    for (let i = 0; i < this.dispFormGroups.length; i++) {

      var arrSelected = [];

      var access = this.dispFormGroups.at(i).get('days');

      myArray.forEach(function (value, i) {

        if (access!.get(value)!.value) {
          arrSelected.push(i)
        }

      });

      if (arrSelected.length == 0) {
        selected = true

        this.showErrorDay = true
        this.errorDayMsg = "Selecione ao menos 1 dia da semana";
      }

    }



    return selected;

  }



  selectedState(state: string) {

    console.log(state)

    for (let i = 0; i < this.dados!.estados.length; i++) {         // percorre o array principal

      if (this.dados!.estados[i].sigla == state) {                // pega o estado conforme a seleção                             // mostra o select de cidades escondido
        this.cities = this.dados!.estados[i].cidades;                   // guarda as cidades respectivas
      }
    }


  }

  onKeypressEventCPF(event: any) {

    let numberCPf = event.target.value;

    if (numberCPf.length == 14) {

      if (cpf.isValid(numberCPf)) {
        this.showErrorCPF = false;

        this.getProfessional(numberCPf)



      }

    }

  }

  getProfessional(numberCPf: string) {

    this.clinicService.getProfCPFVerify(this.clinic.clinic_id, numberCPf).subscribe(data => {

      this.showCpf = false;
      this.showForm = true

      this.CadastroProfessionalForm.controls['user_name'].setValue(data.user.user_name);
      this.CadastroProfessionalForm.controls['user_gender'].setValue(data.user.user_gender);
      this.CadastroProfessionalForm.controls['user_email'].setValue(data.user.user_email);
      this.CadastroProfessionalForm.controls['user_phone'].setValue(data.user.user_phone);
      this.CadastroProfessionalForm.controls['birth_data'].setValue(data.user.birth_data);
      this.CadastroProfessionalForm.controls['user_rg'].setValue(data.user.user_rg);
      this.CadastroProfessionalForm.controls['user_cpf'].setValue(data.user.user_cpf);
      this.CadastroProfessionalForm.controls['ua_cep'].setValue(data.user.address.ua_cep);
      this.CadastroProfessionalForm.controls['ua_uf'].setValue(data.user.address.ua_uf);
      this.CadastroProfessionalForm.controls['user_photo'].setValue(data.user.user_photo);

      this.selectedState(data.user.address.ua_uf);

      this.CadastroProfessionalForm.controls['ua_city'].setValue(data.user.address.ua_city);
      this.CadastroProfessionalForm.controls['ua_district'].setValue(data.user.address.ua_district);
      this.CadastroProfessionalForm.controls['ua_name_street'].setValue(data.user.address.ua_name_street);
      this.CadastroProfessionalForm.controls['ua_house_number'].setValue(data.user.address.ua_house_number);


      if (data.professional != null) {
        this.secondFormGroup = this._formBuilder.group({
          specialities: this._formBuilder.array([])

        });


        const esp = this.secondFormGroup.get('specialities') as FormArray;
        if (data.professional.specialties != undefined) {
          for (let i = 0; i < data.professional.specialties.length; i = i + 1) {

            this.selectedCategory(data.professional.specialties[i].cat_id, i)

            esp.push(
              new FormGroup({
                spe_id: new FormControl(data.professional.specialties[i].spe_id, [Validators.required]),
                cat_id: new FormControl(data.professional.specialties[i].cat_id, [Validators.required]),
                rt_id: new FormControl(data.professional.specialties[i].rt_id, [Validators.required]),
                rt_number: new FormControl(data.professional.specialties[i].rt_number, [Validators.required])
              })
            )
          }
        }
      }


    },
      err => {

        if (err.status == 404) {

          this.showCpf = false;
          this.showForm = true;
          this.showErrorCPF = false;

          this.CadastroProfessionalForm.controls['user_cpf'].setValue(numberCPf);


        }

        if (err.status == 400) {

          this.showCpf = true;
          this.showForm = false;
          this.showErrorCPF = true;
          this.errorCPFMsg = err.error.message;

        }



      })

  }

  getProfClinic(pc_id: string) {

    this.clinicService.getProfClincByPcId(pc_id).subscribe(data => {

      this.imageUrl = data.prof_clinic.professional.user_photo;

      this.showCpf = false;
      this.showForm = true

      this.CadastroProfessionalForm.controls['user_name'].setValue(data.prof_clinic.professional.user_name);
      this.CadastroProfessionalForm.controls['user_gender'].setValue(data.prof_clinic.professional.user_gender);
      this.CadastroProfessionalForm.controls['user_email'].setValue(data.prof_clinic.professional.user_email);
      this.CadastroProfessionalForm.controls['user_phone'].setValue(data.prof_clinic.professional.user_phone);
      this.CadastroProfessionalForm.controls['birth_data'].setValue(data.prof_clinic.professional.birth_data);
      this.CadastroProfessionalForm.controls['user_rg'].setValue(data.prof_clinic.professional.user_rg);
      this.CadastroProfessionalForm.controls['user_cpf'].setValue(data.prof_clinic.professional.user_cpf);
      this.CadastroProfessionalForm.controls['ua_cep'].setValue(data.prof_clinic.professional.user_address.ua_cep);
      this.CadastroProfessionalForm.controls['ua_uf'].setValue(data.prof_clinic.professional.user_address.ua_uf);

      this.selectedState(data.prof_clinic.professional.user_address.ua_uf);

      this.CadastroProfessionalForm.controls['ua_city'].setValue(data.prof_clinic.professional.user_address.ua_city);
      this.CadastroProfessionalForm.controls['ua_district'].setValue(data.prof_clinic.professional.user_address.ua_district);
      this.CadastroProfessionalForm.controls['ua_name_street'].setValue(data.prof_clinic.professional.user_address.ua_name_street);
      this.CadastroProfessionalForm.controls['ua_house_number'].setValue(data.prof_clinic.professional.user_address.ua_house_number);


      if (data.prof_clinic.professional != null) {
        this.secondFormGroup = this._formBuilder.group({
          specialities: this._formBuilder.array([])

        });

        this.thirdFormGroup = this._formBuilder.group({
          disponibilities: this._formBuilder.array([])

        });


        const esp = this.secondFormGroup.get('specialities') as FormArray;
        if (data.prof_clinic.professional.specialties != undefined) {
          for (let i = 0; i < data.prof_clinic.professional.specialties.length; i = i + 1) {

            this.selectedCategory(data.prof_clinic.professional.specialties[i].cat_id, i)

            esp.push(
              new FormGroup({
                spe_id: new FormControl(data.prof_clinic.professional.specialties[i].spe_id, [Validators.required]),
                cat_id: new FormControl(data.prof_clinic.professional.specialties[i].cat_id, [Validators.required]),
                rt_id: new FormControl(data.prof_clinic.professional.specialties[i].rt_id, [Validators.required]),
                rt_number: new FormControl(data.prof_clinic.professional.specialties[i].rt_number, [Validators.required])
              })
            )
          }
        }

        const disp = this.thirdFormGroup.get('disponibilities') as FormArray;
        if (data.prof_clinic.days != undefined) {
          for (let i = 0; i < data.prof_clinic.days.length; i = i + 1) {

            disp.push(
              new FormGroup({
                start_time: new FormControl(data.prof_clinic.days[i].start_time, [Validators.required]),
                end_time: new FormControl(data.prof_clinic.days[i].end_time, [Validators.required]),
                modality: new FormControl(data.prof_clinic.days[i].app_type.toString(), [Validators.required]),
                time: new FormControl(data.prof_clinic.days[i].time, [Validators.required]),
                gap: new FormControl(data.prof_clinic.days[i].gap, [Validators.required]),
                days: new FormGroup({
                  0: new FormControl(data.prof_clinic.days[i].days.includes(0)),
                  1: new FormControl(data.prof_clinic.days[i].days.includes(1)),
                  2: new FormControl(data.prof_clinic.days[i].days.includes(2)),
                  3: new FormControl(data.prof_clinic.days[i].days.includes(3)),
                  4: new FormControl(data.prof_clinic.days[i].days.includes(4)),
                  5: new FormControl(data.prof_clinic.days[i].days.includes(5)),
                  6: new FormControl(data.prof_clinic.days[i].days.includes(6))
                })
              })
            )
          }
        }
      }

    },
      err => {



      })

  }

}
