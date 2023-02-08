import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AddSupplierElement } from 'src/app/model/model';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

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

  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit(): void {
  }

  get f() { return this.forms.controls; }

  goToSupplier(supplier: any){
    this.process = true;
    this.service.saveSupplier(supplier).subscribe( data => {
      console.log('ini data', data);
      this.process = false;
      this.router.navigateByUrl('/supplier');
    });

  }

  validasi(){
    this.submitted = true;
    if (this.forms.valid){
      const x: AddSupplierElement = {
        name: this.f.suppliername.value,
        phone: this.f.phone.value,
        address: this.f.address.value,
        // tslint:disable-next-line:radix
        userId: parseInt(sessionStorage.getItem('id') as string)
    };
      this.goToSupplier(x);
    }
  }

}
