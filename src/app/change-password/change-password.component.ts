import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordUser } from '../model/model';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private router: Router, private service: ServiceService) {}
  stringPassword = '';
  submitted = false;
  hide = true;
  hideConfirm = true;
  wrongInput = false;
  process = false;
  forms = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  ngOnInit(): void {}

  get f() {
    return this.forms.controls;
  }

  comparePassword(a: string, b: string) {
    if (a === b) {
      return true;
    } else {
      return false;
    }
  }
  goToHome() {
    this.router.navigateByUrl('/home');
  }
  onSubmit() {
    this.submitted = true;
    if (this.forms.valid) {
      this.wrongInput = !this.comparePassword(
        this.f.password.value,
        this.f.confpassword.value
      );
      if (!this.wrongInput) {
        this.process = true;
        const x: ChangePasswordUser = {
          id: parseInt(sessionStorage.getItem('id') as string),
          password: this.f.password.value,
        };
        this.service.updatePassword(x).subscribe((data) => {
          this.process = false;
          alert('Success change password');
          this.goToHome();
        });
      }
    }
  }
}
