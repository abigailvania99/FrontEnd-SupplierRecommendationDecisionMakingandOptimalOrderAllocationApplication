import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SupplierElement } from '../../model/model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponentSupplier implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SupplierElement) { }

  ngOnInit(): void {
  }

}
