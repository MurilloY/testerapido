import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/app/adm/returns/menus.return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  form: FormGroup;
  menus?: Menu[];
  profile?: any;
  clinic_id?: string;

  perfil_name?: string;

  dialog_title: string = "Adicionar perfil";

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private admService: AdmService
  ) {

    this.clinic_id = data['clinic_id']
    this.profile = data['profile'];

    if (this.profile != null) {

      this.perfil_name = this.profile['pro_name']

      this.getMenusProfileSelected();

      this.dialog_title = "Editar perfil";


    }
    else {
      this.getMenus();

    }

    this.form = this.fb.group({
      name: this.perfil_name,
      menus: this.fb.array([])
    });
  }

  ngOnInit(): void {


  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  get menusFB() {
    return this.form.controls['menus'] as FormArray;
  }

  getControls(index: number) {
    return (((this.form.get('menus') as FormArray).controls)[index].get('permissions') as FormArray).controls;
  }


  get menu(): FormGroup {
    return this.fb.group(
      {
        menu_cat_id: new FormControl(""),
        menu_cat_name: new FormControl(""),
        menu_icon: new FormControl(""),
        menu_id: new FormControl(""),
        menu_link: new FormControl(""),
        menu_name: new FormControl(""),
        menu_pan_id: new FormControl(""),
        menu_pan_name: new FormControl(""),
        selected: new FormControl(null),
        permissions: this.fb.array([])
      }
    );
  }

  get permission(): FormGroup {
    return this.fb.group({
      per_id: new FormControl(""),
      per_name: new FormControl(""),
      menu_id: new FormControl(""),
      required: new FormControl(null),
      selected: new FormControl(null)
    });
  }

  getMenus() {
    this.admService.getMenus('1').subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("userToken", data.refreshToken)
      }

      this.loadForm(data.menus);


    })
  }

  getMenusProfileSelected() {
    this.admService.getMenusProfileSelected(this.profile['pro_id'], '1').subscribe(data => {

      if (data.refreshToken) {
        localStorage.setItem("userToken", data.refreshToken)
      }

      this.loadForm(data.menus);


    })
  }

  loadForm(data: Menu[]) {

    for (let men = 0; men < data.length; men++) {
      const menusFormArray = this.form.get("menus") as FormArray;
      menusFormArray.push(this.menu);

      for (let per = 0; per < data[men].permissions.length; per++) {
        const permissionsFormsArray = menusFormArray.at(men).get("permissions") as FormArray;
        permissionsFormsArray.push(this.permission);
      }
    }

    this.form.get('menus')?.patchValue(data);

  }





  public checkError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  onSubmit() {

    if (this.form.valid) {

      if (this.profile != null) {

        var formData: any = new FormData();

        formData.append("pro_name", this.form.get('name')!.value);
        formData.append("menus", JSON.stringify(this.form.getRawValue()));


        this.admService.updateProfile(this.profile['pro_id'], formData).subscribe(
          data => {

            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: 'Perfil atualizado com sucesso',
              icon: 'success',
              iconColor: '#01AEEF',
              showCancelButton: false,
              confirmButtonColor: '#01AEEF',
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
      else {

        var dados = {
          "pro_name": this.form.get('name')!.value,
          "menus": JSON.stringify(this.form.getRawValue()),
          "pan_id": 1,
          "id": this.clinic_id,
        }


        this.admService.insertProfile(dados).subscribe(
          data => {

            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: 'Perfil adicionado com sucesso',
              icon: 'success',
              iconColor: '#01AEEF',
              showCancelButton: false,
              confirmButtonColor: '#01AEEF',
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

}
