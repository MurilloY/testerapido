import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReturnCities } from 'src/app/adm/returns/cities.return';
import { Lead } from 'src/app/adm/returns/leads_return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-leads',
  templateUrl: './add-leads.component.html',
  styleUrls: ['./add-leads.component.scss']
})
export class AddLeadsComponent implements OnInit {

  dialogTitle: string = "Cadastrar Leads"
  formAddLeads: FormGroup;

  leads?: Lead;

  lead_name: string;
  lead_email: string;
  lead_cellphone: string;
  lead_city: string;
  lead_state: string;
  status_name: string;

  dados?: ReturnCities;
  cities?: string[];
  leadss?: Lead;

  dialogButton: string;

  constructor(public dialogRef: MatDialogRef<AddLeadsComponent>, private admService: AdmService, @Inject(MAT_DIALOG_DATA) public data: Lead) {
    this.leads = data;



    if (this.leads != null) {

      this.lead_name = this.leads.lead_name;
      this.lead_email = this.leads.lead_email.toString();
      this.lead_cellphone = this.leads.lead_cellphone.toString();
      this.lead_city = this.leads.lead_city.toString();
      this.lead_state = this.leads.lead_state.toString();
      this.status_name = this.leads.status_name.toString();



      this.dialogTitle = "Atualizar Lead";
      this.dialogButton = "Atualizar"

    }
    else {

      this.dialogTitle = "Cadastrar Lead"
      this.dialogButton = "Cadastrar"
    }

    this.formAddLeads = new FormGroup({

      lead_name: new FormControl(this.lead_name, Validators.required),
      lead_email: new FormControl(this.lead_email, Validators.required),
      lead_cellphone: new FormControl(this.lead_cellphone, Validators.required),
      lead_city: new FormControl(this.lead_city, Validators.required),
      lead_state: new FormControl(this.lead_state, Validators.required),

    });

    this.getJsonCities();

    
  }

  ngOnInit(): void {
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.formAddLeads.controls[controlName].hasError(errorName);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

  getJsonCities() {

    if (this.leads != null) {
      this.admService.getJSON().subscribe(data => {
        this.dados = data;

        this.selectedState(this.lead_state!);

      })


    }
    else {
      this.admService.getJSON().subscribe(data => {
        this.dados = data;

      })

    }

  }

  selectedState(state: string) {

    for (let i = 0; i < this.dados!.estados.length; i++) {         // percorre o array principal

      if (this.dados!.estados[i].sigla == state) {                // pega o estado conforme a seleção                             // mostra o select de cidades escondido
        this.cities = this.dados!.estados[i].cidades;                   // guarda as cidades respectivas
      }
    }


  }

  onSubmit() {


    if (this.formAddLeads.valid) {

      var formData = this.formAddLeads.value;
      
      if(this.leads != null){
        
        this.admService.updateLead(this.leads.lead_id, formData).subscribe(
                data => {
        
                  Swal.fire({
                    heightAuto: false,
                    title: 'Sucesso',
                    text: "Lead atualizado com sucesso!",
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

      }else {
        this.admService.insertLead(formData).subscribe(
          data => {
  
            Swal.fire({
              heightAuto: false,
              title: 'Sucesso',
              text: "Lead cadastrado com sucesso!",
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

    }
  }

}
