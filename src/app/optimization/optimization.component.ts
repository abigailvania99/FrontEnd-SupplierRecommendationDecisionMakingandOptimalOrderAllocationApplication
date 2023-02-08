import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-optimization',
  templateUrl: './optimization.component.html',
  styleUrls: ['./optimization.component.css'],
})
export class OptimizationComponent implements OnInit {
  submitted = false;
  result = false;
  barang1supp1 = 0;
  barang1supp2 = 0;
  barang2supp1 = 0;
  barang2supp2 = 0;
  process = false;
  validation1 = false;
  validation2 = true;

  resultMatrix: number[][] = [];
  forms = new FormGroup({
    0: new FormControl('', [Validators.required, Validators.min(1)]),
    1: new FormControl('', [Validators.required, Validators.min(1)]),
    2: new FormControl('', [Validators.required, Validators.min(1)]),
    3: new FormControl('', [Validators.required, Validators.min(1)]),
    4: new FormControl('', [Validators.required, Validators.min(1)]),
    5: new FormControl('', [Validators.required, Validators.min(1)]),
    6: new FormControl('', [Validators.required, Validators.min(1)]),
    7: new FormControl('', [Validators.required, Validators.min(1)]),
    8: new FormControl('', [Validators.required, Validators.min(1)]),
    9: new FormControl('', [Validators.required, Validators.min(1)]),
    10: new FormControl('', [Validators.required, Validators.min(1)]),
    11: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  constructor(private service: ServiceService) {}

  ngOnInit(): void {}
  get f() {
    return this.forms.controls;
  }

  validasi() {
    this.submitted = true;
    this.validation1 = this.validation2 = false;

    console.log(this.f[0]);
    if (this.f[0].value > this.f[1].value || this.f[2].value > this.f[3].value) {
      if (this.f[0].value > this.f[1].value) {
        this.validation1 = true;
        this.f[0].setErrors({ incorrect: true });
        this.f[1].setErrors({ incorrect: true });
      }
      if (this.f[2].value > this.f[3].value){
        this.validation2 = true;
        this.f[2].setErrors({ incorrect: true });
        this.f[3].setErrors({ incorrect: true });
      }
    } else if (this.forms.valid) {

      let i = 0;
      const input: any[12] = [];
      for (i = 0; i < 12; i++) {
        input[i] = this.f[`${i}`].value;
      }


      // } else {
      this.process = true;
      this.service
        .countSimplex({
          inputMatrix: input,
        })
        .subscribe((data) => {
          this.process = false;
          // @ts-ignore
          this.resultMatrix = data.datas?.result;
          console.log(this.resultMatrix);
          let i = 0;
          for (i = 0; i < this.resultMatrix.length; i++) {
            if (this.resultMatrix[i][0] === 1) {
              this.barang1supp1 = this.resultMatrix[i][1];
            } else if (this.resultMatrix[i][0] === 2) {
              this.barang1supp2 = this.resultMatrix[i][1];
            } else if (this.resultMatrix[i][0] === 3) {
              this.barang2supp1 = this.resultMatrix[i][1];
            } else if (this.resultMatrix[i][0] === 4) {
              this.barang2supp2 = this.resultMatrix[i][1];
            }
          }
          this.result = true;
          const element: any = document.getElementById('result');

          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 10);
        });
    }
  }
}
