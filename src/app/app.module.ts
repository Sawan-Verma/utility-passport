import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DataService } from './service/data.service';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UtilityDetailComponent } from './utility-detail/utility-detail.component';
import { UtilityService } from './utility.service';
import { RouterModule } from '@angular/router';
import { routes } from './app.router';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UtilityDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [DataService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
