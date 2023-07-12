import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/clinics/returns/appointments.return';
import { Clinic } from 'src/app/clinics/returns/clinic_by_user.return';
import { ProfClinic, Specialty } from 'src/app/clinics/returns/prof_by_profid.return';
import { ClinicService } from 'src/app/clinics/services/clinic.service';

@Component({
  selector: 'app-editar-consulta',
  templateUrl: './editar-consulta.component.html',
  styleUrls: ['./editar-consulta.component.scss']
})
export class EditarConsultaComponent implements OnInit {

  clinic?: Clinic
  consulta: Appointment
  specialty: Specialty
  profClinic?: ProfClinic

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditarConsultaComponent>, private clinicService: ClinicService) { 

    console.log(data)
    this.consulta = data['consulta']
    this.selectedProfessionalByProfId()
    this.clinic = data['clinic']

  }

  ngOnInit(): void {
  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  selectedProfessionalByProfId() {
    this.clinicService.selectedProfessionalByProfId(this.consulta.prof_id).subscribe(
      data => {
        this.profClinic = data.prof_clinic;
      }
    )
  }


  // selectedProfessionalSpeciality(step: number) {

  //   this.clinicService.getProfessionalByCategory(this.clinic.clinic_id, this.especialidade, this.convertToDb(this.dateSelected), this.modalidade).subscribe(
  //     data => {

  //       console.log(data)

  //       this.professionals = data.professionales;
  //       this.professionalsAll = data.professionales;

  //       if (step == 2) {
  //         this.nextStep();
  //       }

  //     },
  //     err => {

  //     }
  //   );
  // }

}
