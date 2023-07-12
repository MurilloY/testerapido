import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NovaConsultaComponent } from '../consultas/nova-consulta/nova-consulta.component';

@Component({
  selector: 'app-area-clinica',
  templateUrl: './area-clinica.component.html',
  styleUrls: ['./area-clinica.component.scss']
})
export class AreaClinicaComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  addConsult(){
    const dialogRef = this.dialog.open(NovaConsultaComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {}
    })

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        // this.getCompanies();
      }

    });
    
  }

}
