import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { UserElement } from '../model/model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router, private service: ServiceService) { }

  submitted = false;
  hide = true;
  wrongEmail = false;
  process = false;
  forms = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    answer: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    emails: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  ngOnInit(): void {
  }

  get f() { return this.forms.controls; }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }

  validasi(){
    this.wrongEmail = false;
    this.submitted = true;
    this.process = false;

    if (this.forms.valid){

      this.process = true;
      const x: UserElement = {
        name: this.f.name.value,
        email: this.f.emails.value,
        password: this.f.password.value,
        answer: this.f.answer.value
    };

      this.service.saveUser(x).subscribe(
      data => {
        this.process = false;
        if (data.datas === null && data.message?.includes('other')){
          this.wrongEmail = true;
          console.log('with other email');
        }
        else{
          this.wrongEmail = false;
          alert('Thank you for registration');
          this.goToLogin();
        }
      }
    );

    }
  }


}
