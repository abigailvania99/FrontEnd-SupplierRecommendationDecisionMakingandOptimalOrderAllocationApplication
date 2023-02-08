import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { SupplierElement } from '../model/model';
import { DeleteComponentSupplier } from './delete/delete.component';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'phone', 'address', 'action'];
  dataSource: SupplierElement[] = [];
  processGetData = false;
  process = false;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    this.processGetData = true;
    this.service.getSupplier(parseInt(sessionStorage.getItem('id') as string)).subscribe(data => {
      this.processGetData = false;
      console.log(data.datas);
      this.dataSource = data.datas ? data.datas : [];
    });
  }

  goToEditSupplier(el: SupplierElement){
    this.router.navigate(['/supplier/edit'], { queryParams: { id: el.id, name: el.name, phone: el.phone, address: el.address } });
  }
  delete(el: SupplierElement){
    const dialogRef = this.dialog.open(DeleteComponentSupplier, {
      data: {
        name: el.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result === true){
        this.process = true;

        this.service.deleteSupplier(el.id).subscribe(data => {
          this.process = false;
          window.location.reload();
        });

      }
    });

  }

  goToAddSupplier(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

}
