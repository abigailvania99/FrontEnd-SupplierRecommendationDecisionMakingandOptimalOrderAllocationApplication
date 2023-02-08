import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { AboutComponent } from './about/about.component';
import { SubcriteriaComponent } from './subcriteria/subcriteria.component';
import { AddComponent } from './subcriteria/add/add.component';
import { EditComponent } from './subcriteria/edit/edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatTableModule} from '@angular/material/table';
import { SupplierComponent } from './supplier/supplier.component';
import { DeleteComponent } from './subcriteria/delete/delete.component';
import { DeleteComponentSupplier } from './supplier/delete/delete.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { OptimizationComponent } from './optimization/optimization.component';
import { SupplierRecommendationComponent } from './supplier-recommendation/supplier-recommendation.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InputAhpComponent } from './supplier-recommendation/input-ahp/input-ahp.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    SubcriteriaComponent,
    AddComponent,
    EditComponent,
    ChangePasswordComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    SupplierComponent,
    DeleteComponent,
    DeleteComponentSupplier,
    AddSupplierComponent,
    EditSupplierComponent,
    OptimizationComponent,
    SupplierRecommendationComponent,
    InputAhpComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
