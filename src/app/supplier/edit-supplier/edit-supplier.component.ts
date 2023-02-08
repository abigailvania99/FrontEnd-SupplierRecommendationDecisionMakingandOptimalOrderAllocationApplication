import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierElement } from 'src/app/model/model';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {
  submitted = false;
  process = false;
  forms = new FormGroup({
    suppliername: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  });
  constructor(private router: Router, private route: ActivatedRoute, private service: ServiceService) { }

  paramValue: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(param => {
      if (!param.id || !param.name || !param.address || !param.phone){
        alert('Data supplier not valid');
        this.router.navigateByUrl('/supplier');
      }
      else{
        this.paramValue = param;
        console.log(this.paramValue);
        this.f.suppliername.setValue(param.name);
        this.f.address.setValue(param.address);
        this.f.phone.setValue(param.phone);
      }

    });
  }

  get f() { return this.forms.controls; }

  goToSupplier(){
    this.router.navigateByUrl('/supplier');
  }

  validasi(){
    this.submitted = true;
    if (this.forms.valid){
      this.process = true;
      const x: SupplierElement = {
        id: this.paramValue.id,
        name: this.f.suppliername.value,
        phone: this.f.phone.value,
        address: this.f.address.value,
        userId: parseInt(sessionStorage.getItem('id') as string)
    };

      this.service.updateSupplier(x).subscribe(data => {
      this.process = false;
      this.goToSupplier();
    });

    }
  }

}
