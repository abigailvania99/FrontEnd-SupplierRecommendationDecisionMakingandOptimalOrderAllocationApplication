import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @HostListener('document:keypress', ['$event'])
  addValidatorAnswer(event: KeyboardEvent) {
    this.f['answer'].setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  }

  @HostListener('document:keypress', ['$event'])
  addValidatorPassword(event: KeyboardEvent) {
    this.f['password'].setValidators([Validators.required, Validators.minLength(6)]);
  }


  constructor(private router: Router, private service: ServiceService) { }


  stringPassword:string='';
  submitted = false;
  hide = true;
  wrongInput=false;
  wrongAnswer=false;
  question=false;
  process:boolean=false;
  forms = new FormGroup({
    emails: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    answer: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
  });


  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigateByUrl('/home');
  }


  get f() { return this.forms.controls; }

  onSubmit() {
    this.submitted = true;
    this.process=true;

    if(this.f.emails.value === null || this.f.emails.value === ''){
      this.process = false;
    } else if(!this.question && (this.f.password.value === null|| this.f.password.value === '')){
      this.process = false;
      this.f.password?.setErrors({'required': true});
    }
    else if(this.question && (this.f.answer.value === null || this.f.answer.value === '')){
      this.process = false;
      this.f.answer?.setErrors({'required': true});
    }
    else{
    this.service.getUser(this.f.emails.value).subscribe(
      data=>{
        this.process=false;
        if(data.datas === null){
          if(!this.question){
            this.wrongInput = true;
          }
          else if(this.question){
            this.wrongAnswer = true;
          }
        } else{
          if(!this.question){

            if(this.comparePassword(this.f.password.value, data?.datas?.password)){
              // @ts-ignore
              sessionStorage.setItem('id', data?.datas?.id.toString());
              // @ts-ignore
              sessionStorage.setItem('name', data?.datas?.name);
              this.goToHome();
            }
            else{
              if(this.f.emails.valid && this.f.password.valid){
              this.wrongInput = true;
              }
            }
          }
          if(this.question){

            if(this.compareAnswer(this.f.answer.value, data?.datas?.answer)){
              // @ts-ignore
              sessionStorage.setItem('id', data?.datas?.id.toString());
              // @ts-ignore
              sessionStorage.setItem('name', data?.datas?.name);
              this.goToHome();
            }
            else{
              if(this.f.emails.valid && this.f.answer.valid){
                this.wrongAnswer = true;
              }
            }
          }
        }
      }
    );
  }

  }
  goToLoginQuestion(){
    this.question = true;

    if((this.submitted && this.f.answer?.errors?.pattern) || (this.submitted && this.f.answer?.errors?.required)){
      this.forms.controls['answer'].clearValidators();
    }
  }
  goToRegis(){
    this.router.navigateByUrl('/registration');
  }

  goToLogin(){
    this.question=false;

    if((this.submitted && this.f.password?.errors?.minlength) || (this.submitted && this.f.password?.errors?.required)){
      this.forms.controls['password'].clearValidators();
    }
  }

  comparePassword(input:any, data:any){
    if(input === data)
    return true;
    else
    return false;
  }

  compareAnswer(input:any, data:any){
    if(input === data)
    return true;
    else
    return false;
  }

  cekKlikAnswer(event:any){
    this.f['answer'].setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')]);
  }

  cekKlikPassword(event:any){
    this.f['password'].setValidators([Validators.required, Validators.minLength(6)]);
  }

}
