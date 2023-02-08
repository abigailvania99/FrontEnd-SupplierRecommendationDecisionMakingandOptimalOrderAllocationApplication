import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { SubcriteriaElement } from 'src/app/model/model';
import { FormControl, FormGroup, Validators, ValidatorFn} from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  submitted = false;
  forms = new FormGroup({
    criteria: new FormControl('', [
      Validators.required
    ]),
    type: new FormControl('', [
      Validators.required
    ]),
    subcriteria: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
  });

  constructor(private route: ActivatedRoute, private router: Router, private service: ServiceService) { }

  paramValue: any;
  process = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      if (!param.id || !param.criteria || !param.subcriteria || !param.type){
        alert('Data subcriteria not valid');
        this.router.navigateByUrl('/subcriteria');
      }
      else{
        this.paramValue = param;
        console.log(this.paramValue);
        this.f.criteria.setValue(param.criteria);
        this.f.subcriteria.setValue(param.subcriteria);
        this.f.type.setValue(param.type);
      }

    });
  }

  get f() { return this.forms.controls; }

  goToSubcriteria(){
    this.router.navigateByUrl('/subcriteria');
  }

  validasi(){
    this.submitted = true;
    if (this.forms.valid){
      const x: SubcriteriaElement = {
        id: this.paramValue.id,
        criteria: this.f.criteria.value,
        subcriteria: this.f.subcriteria.value,
        type: this.f.type.value,
        userId: parseInt(sessionStorage.getItem('id') as string)
    };
      this.process = true;
      this.service.updateSubcriteria(x).subscribe(data => {
      this.process = false;
      this.goToSubcriteria();
    });
    }
  }

}
