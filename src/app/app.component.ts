import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'aplikasi';
  checkLogin = true;
  activeLink = '';
  currentRoute: string;
  name: string|null = '';

  constructor(private router: Router) {
    this.currentRoute = '';
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
          console.log('event', event);
          if (this.currentRoute === '/' || this.currentRoute === '/login' || this.currentRoute === '/registration'){

            if (sessionStorage.getItem('id')){
              this.name = sessionStorage.getItem('name');
              this.goToHome();
              this.checkLogin = false;
            }
            else{
              this.checkLogin = true;
            }
          }
          else{
            this.name = sessionStorage.getItem('name');
            this.checkLogin = false;
          }
          if (this.currentRoute.includes('home')){

            if (sessionStorage.getItem('id')){
              this.goToHome();
            }
            else{
              this.router.navigateByUrl('/login');
              this.checkLogin = true;
            }
          }
          else if (this.currentRoute.includes('updatePassword')){

            if (sessionStorage.getItem('id')){
              this.goToUpdatePassword();
            }
            else{
              this.router.navigateByUrl('/login');
              this.checkLogin = true;
            }
          }
          else if (this.currentRoute.includes('about')){

            if (sessionStorage.getItem('id')){
              this.goToAbout();
            }
            else{
              this.router.navigateByUrl('/login');
              this.checkLogin = true;
            }
          }
          else if (this.currentRoute.includes('subcriteria')){
            if (sessionStorage.getItem('id')){
              if (this.currentRoute.includes('add')){
                this.activeLink = '/subcriteria';
              }
              else if (this.currentRoute.includes('edit')){
                // halaman edit
                this.activeLink = '/subcriteria';
              }
              else{
                this.goToSubcriteria();
              }
            }
            else{
              this.router.navigateByUrl('/login');
              this.checkLogin = true;
            }
          }
          else if (this.currentRoute.includes('optimization')){

            if (sessionStorage.getItem('id')){
              this.goToAlokasiPemesanan();
            }
            else{
              this.router.navigateByUrl('/login');
              this.checkLogin = true;
            }
          }
          else if (this.currentRoute.includes('supplierrecommendation')){
            if (sessionStorage.getItem('id')){
              this.goToSupplierRecommendation();
            }
            else{
              this.router.navigateByUrl('/login');
              this.checkLogin = true;
            }
          }
          else if (this.currentRoute.includes('supplier')){
            if (sessionStorage.getItem('id')){
              if (this.currentRoute.includes('add')){
                this.activeLink = '/supplier';
              }
              else if (this.currentRoute.includes('edit')){
                this.activeLink = '/supplier';
              }
              else{
                this.goToSupplier();
              }
            }
            else{
              this.router.navigateByUrl('/login');
              this.checkLogin = true;
            }
          }
          else{
            this.checkLogin = true;
          }
      }

      if (event instanceof NavigationError) {

          console.log(event.error);
      }


  });
  }


  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
  }

  goToHome(){
    this.activeLink = '/home';
    this.router.navigateByUrl('/home');
  }
  goToAbout(){
    this.activeLink = '/about';
    this.router.navigateByUrl('/about');
  }
  goToSubcriteria(){
    this.activeLink = '/subcriteria';
    this.router.navigateByUrl('/subcriteria');
  }
  goToSupplier(){
    this.activeLink = '/supplier';
    this.router.navigateByUrl('/supplier');
  }
  goToUpdatePassword(){
    this.activeLink = '/updatePassword';
    this.router.navigateByUrl('/updatePassword');
  }
  goToAlokasiPemesanan(){
    this.activeLink = '/optimization';
    this.router.navigateByUrl('/optimization');
  }
  goToSupplierRecommendation(){
    this.activeLink = '/supplierrecommendation';
    this.router.navigateByUrl('/supplierrecommendation');
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
