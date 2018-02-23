import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
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
    RouterModule.forRoot(routes)
  ],
  providers: [UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
