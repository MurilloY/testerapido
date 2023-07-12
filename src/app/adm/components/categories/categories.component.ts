import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Category } from '../../returns/categories.retunr';
import { AdmService } from '../../services/adm.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  
  displayedColumns = ['category_status', 'category_name', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  categories?: Category[];


  podeAdd = true;
  podeEdit = true;
  podeRemove = true;

  
  constructor(public dialog: MatDialog,
    private admService: AdmService
    ) {
    
  }

  ngOnInit(): void {
    
    this.getCategories();

  }


  getCategories(){

    this.admService.getCategories().subscribe(data => {

      if(data.refreshToken) {
        localStorage.setItem("admToken", data.refreshToken)
      }

      this.categories = data.categories;
      this.dataSource = new MatTableDataSource<Category>(this.categories);
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





  edit(row:any){

    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
      disableClose: false,
      maxHeight: '90vh',
      data: row
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getCategories();
      }

    });
  }


  add(): void {


    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
      disableClose: false,
      maxHeight: '90vh',
      data: null
    });


    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getCategories();
      }

    });
  }

}