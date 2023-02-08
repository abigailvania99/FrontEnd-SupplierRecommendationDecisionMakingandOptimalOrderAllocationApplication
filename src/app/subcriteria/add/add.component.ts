import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AddSubcriteriaElement } from 'src/app/model/model';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  submitted = false;
  process = false;
  forms = new FormGroup({
    criteria: new FormControl('', [
      Validators.required
    ]),
    type: new FormControl('', [
      Validators.required
    ]),
    subcriteria: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
  });
  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit(): void {
  }

  get f() { return this.forms.controls; }

  goToSubcriteria(){
    this.router.navigateByUrl('/subcriteria');
  }

  validasi(){
    this.submitted = true;
    if (this.forms.valid){
      const x: AddSubcriteriaElement = {
        criteria: this.f.criteria.value,
        subcriteria: this.f.subcriteria.value,
        type: this.f.type.value,
        userId: parseInt(sessionStorage.getItem('id') as string)
    };

      this.process = true;
      this.service.saveSubcriteria(x).subscribe(data => {
      this.process = false;
      this.goToSubcriteria();
    });
    }
  }

}
