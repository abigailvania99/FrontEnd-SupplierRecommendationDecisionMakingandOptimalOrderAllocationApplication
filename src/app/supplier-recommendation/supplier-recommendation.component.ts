import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { SubcriteriaElement, SupplierElement } from '../model/model';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-supplier-recommendation',
  templateUrl: './supplier-recommendation.component.html',
  styleUrls: ['./supplier-recommendation.component.css']
})
export class SupplierRecommendationComponent implements OnInit {

  validSubcriteria = false;
  errorSubcriteria = false;
  errorSupplier = false;
  subcriteriaSelected: SubcriteriaElement[] = [];
  validSupplier = false;
  supplierSelected: SupplierElement[] = [];
  displayedColumns: string[] = ['select', 'no', 'criteria', 'subcriteria', 'type'];
  displayedColumnsSupplier: string[] = ['select', 'no', 'name', 'phone', 'address'];
  dataSource = new MatTableDataSource<SubcriteriaElement>([]);
  dataSourceSupplier = new MatTableDataSource<SupplierElement>([]);
  selection = new SelectionModel<SubcriteriaElement>(true, []);
  selectionSupplier = new SelectionModel<SupplierElement>(true, []);
  process = false;
  processGetDataSupplier = false;
  processGetDataSubcriteria = false;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    // ambil data dri backend
    this.processGetDataSubcriteria, this.processGetDataSupplier = true;
    this.service.getSupplier(parseInt(sessionStorage.getItem('id') as string)).subscribe(data => {
      console.log(data.datas);
      this.dataSourceSupplier = new MatTableDataSource<SupplierElement>(data.datas ? data.datas : []);
      this.processGetDataSupplier = false;
    });

    this.service.getSubcriteria(parseInt(sessionStorage.getItem('id') as string)).subscribe(data => {
      this.dataSource = new MatTableDataSource<SubcriteriaElement>(data.datas ? data.datas : []);
      this.processGetDataSubcriteria = false;
    });


  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  isAllSelectedSupplier() {
    const numSelected = this.selectionSupplier.selected.length;
    const numRows = this.dataSourceSupplier.data.length;
    return numSelected === numRows;
  }

  masterToggleSupplier() {
    this.isAllSelectedSupplier() ?
        this.selectionSupplier.clear() :
        this.dataSourceSupplier.data.forEach(row => this.selectionSupplier.select(row));
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  validasiJumlahSubkriteria(){
    if (this.selection.selected.length > 2 && this.selection.selected.length < 11){

      this.validSubcriteria = true;
      this.errorSubcriteria = false;
      this.subcriteriaSelected = this.selection.selected;
      const element: any = document.getElementById('dataSupplier');
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    }
    else{
      this.validSubcriteria = false;
      this.errorSubcriteria = true;
    }
  }

  validasiJumlahSupplier(){
    if (this.selectionSupplier.selected.length > 1){
      this.errorSupplier = false;
      this.validSupplier = true;
      this.supplierSelected = this.selectionSupplier.selected;
      const element: any = document.getElementById('scoring');
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10);
    }
    else{
      this.validSupplier = false;
      this.errorSupplier = true;

    }
  }

}
