import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OptimizationComponent } from './optimization/optimization.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddComponent } from './subcriteria/add/add.component';
import { EditComponent } from './subcriteria/edit/edit.component';
import { SubcriteriaComponent } from './subcriteria/subcriteria.component';
import { SupplierRecommendationComponent } from './supplier-recommendation/supplier-recommendation.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { SupplierComponent } from './supplier/supplier.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'subcriteria', component: SubcriteriaComponent},
  {path: 'subcriteria/add', component: AddComponent},
  {path: 'subcriteria/edit', component: EditComponent},
  { path: 'supplier', component: SupplierComponent},
  { path: 'supplier/add', component: AddSupplierComponent},
  { path: 'supplier/edit', component: EditSupplierComponent},
  { path: 'updatePassword', component: ChangePasswordComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'optimization', component: OptimizationComponent},
  { path: 'supplierrecommendation', component : SupplierRecommendationComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
