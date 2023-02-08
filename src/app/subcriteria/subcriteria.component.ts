import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import { SubcriteriaElement } from '../model/model';
import { ServiceService } from '../service/service.service';




@Component({
  selector: 'app-subcriteria',
  templateUrl: './subcriteria.component.html',
  styleUrls: ['./subcriteria.component.css']
})
export class SubcriteriaComponent implements OnInit {

  displayedColumns: string[] = ['no', 'criteria', 'subcriteria', 'type', 'action'];
  dataSource: SubcriteriaElement[] = [];
  processGetData = false;
  process = false;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('name'));
    this.processGetData = true;
    this.service.getSubcriteria(parseInt(sessionStorage.getItem('id') as string)).subscribe(data => {
      this.processGetData = false;
      console.log(data.datas);
      this.dataSource = data.datas ? data.datas : [];
    });
  }

  goToEditSubcriteria(el: SubcriteriaElement){
    this.router.navigate(['/subcriteria/edit'], { queryParams: { id: el.id, criteria: el.criteria, subcriteria: el.subcriteria, type: el.type } });
  }
  delete(el: SubcriteriaElement){
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        criteria: el.criteria,
        subcriteria: el.subcriteria
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result === true){

        this.process = true;
        this.service.deleteSubcriteria(el.id).subscribe(
          data => {
            this.process = false;
            window.location.reload();
          }
        );
      }
    });

  }

  goToAddSubkriteria(){
    this.router.navigate(['add'], {relativeTo: this.route});
  }

}
