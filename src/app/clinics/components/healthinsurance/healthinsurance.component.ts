import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Insurance } from '../../returns/insurance_by_clinic';
import { ClinicService } from '../../services/clinic.service';
import { AddInsuranceComponent } from './add-insurance/add-insurance.component';

@Component({
  selector: 'app-healthinsurance',
  templateUrl: './healthinsurance.component.html',
  styleUrls: ['./healthinsurance.component.scss']
})
export class HealthinsuranceComponent implements OnInit {

  clinic_id?: string
  returnError: boolean = false;
  insurances: Insurance[]

  totalItens: number = 5;
  sortedData: Insurance[]
  p: number = 1;

  status: number = 1;

  sortDirection: string = 'asc';





  constructor(public dialogRef: MatDialogRef<HealthinsuranceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private clinicService: ClinicService, private dialog: MatDialog) {

    console.log(data)
    this.clinic_id = data['clinic']['clinic_id']
  }

  ngOnInit(): void {
    this.insuranceByClinic()
  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }

  editarConvenio(insurance: Insurance) {
    const dialogRef = this.dialog.open(AddInsuranceComponent, {
      width: '520px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        clinic_id: this.clinic_id,
        insurance: insurance
      }
      
    })
    
    console.log(this.data)
    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {
        

        this.insuranceByClinic();

      }

    });
  }

  insuranceByClinic() {
    this.clinicService.getInsurancesByClinic(this.clinic_id!).subscribe(
      data => {
        console.log(data)
        this.sortedData = data.insurances
        this.insurances = data.insurances
      },
      err => {

      }
    );


  }

  addInsurance() {
    const dialogRef = this.dialog.open(AddInsuranceComponent, {
      width: '520px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        clinic_id: this.clinic_id,
        insurance: null
      }
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.insuranceByClinic();

      }

    });

  }


// Criar um componente
// insertInsurance() {
//   this.clinicService.insertInsurance().subscribe(
//     data => {
//       console.log(data)
//       this.sortedData = data.insurances
//       this.insurances = data.insurances
//   },
//   err =>{

//   }
//   );
// }

onKeypressEvent(event: any) {
  this.sortedData = this.insurances.filter(item => {
    if (item.ins_name.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1
    ) {
      return true;
    }
    return false;
  }
  );

}

ordenacao(tipoOrdenacao: string) {

  const data = this.insurances.slice();

  this.sortedData = data.sort((a, b) => {
    const isAsc = this.sortDirection === 'asc';
    switch (tipoOrdenacao) {
      case 'nome':
        return compare(a.ins_name, b.ins_name, isAsc);
      default:
        return 0;
    }
  });

  if (this.sortDirection == 'asc') {
    this.sortDirection = 'desc';
  } else {
    this.sortDirection = 'asc';
  }
}

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


