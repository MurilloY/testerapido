import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { LeadHistory } from 'src/app/adm/returns/leads_histories';
import { Lead } from 'src/app/adm/returns/leads_return';
import { AdmService } from 'src/app/adm/services/adm.service';
import Swal from 'sweetalert2';
import { AddLeadsComponent } from '../add-leads/add-leads.component';
import { AddLeadHistoryComponent } from './add-lead-history/add-lead-history.component';

@Component({
  selector: 'app-leads-history',
  templateUrl: './leads-history.component.html',
  styleUrls: ['./leads-history.component.scss']
})
export class LeadsHistoryComponent implements OnInit {

  displayedColumns = ['adm_name', 'message', 'moment'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  history: LeadHistory[];

  lead_id: string;

  lead_status: number

  constructor(public dialog: MatDialog, private admService: AdmService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.lead_id = params['lead_id']

      this.getLeadsHistoriesId();
    });
  }

  add(): void {

    const dialogRef = this.dialog.open(AddLeadHistoryComponent, {
      width: '550px',
      disableClose: false,
      maxHeight: '90vh',
      data: this.lead_id
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getLeadsHistoriesId();
      }

    });
  }

  getLeadsHistoriesId() {
    this.admService.getLeadsHistoriesId(this.lead_id).subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.history = data.lead_history;
      this.dataSource = new MatTableDataSource<LeadHistory>(this.history);
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
