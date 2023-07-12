import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Lead } from '../../returns/leads_return';
import { AdmService } from '../../services/adm.service';
import { AddLeadsComponent } from './add-leads/add-leads.component';
import { LeadsHistoryComponent } from './leads-history/leads-history.component';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  displayedColumns = ['lead_name', 'lead_email', 'lead_cellphone', 'lead_city', 'lead_state', 'lead_status', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  leads: Lead[];

  leads_id?: string;

  podeEdit = true;

  constructor(public dialog: MatDialog, private admService: AdmService, private router: Router,) { }

  ngOnInit(): void {
    this.getLeads()
  }

  add(): void {

    const dialogRef = this.dialog.open(AddLeadsComponent, {
      width: '490px',
      disableClose: false,
      maxHeight: '90vh',
      data: null
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getLeads();
      }

    });
  }

  edit(row: Lead){

    const dialogRef = this.dialog.open(AddLeadsComponent, {
      width: '490px',
      disableClose: false,
      maxHeight: '90vh',
      data: row
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getLeads();
      }

    });

    
  }

  goToNext(route: any) {

    let rota = `/adm/leads/${route['lead_id']}/history`

    this.router.navigate([rota]);


  }

  getLeads() {
    this.admService.getLeads().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.leads = data.leads;
      this.dataSource = new MatTableDataSource<Lead>(this.leads);
      this.dataSource.paginator = this.paginator;
    
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

  applyFilter(filterValue: string) {

    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
