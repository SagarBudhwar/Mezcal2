import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { FooterComponent } from './template/footer/footer.component';
import { LayoutComponent } from './template/layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { FormsModule }   from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ProfileComponent } from './views/profile/profile.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { PaComponent } from './views/pa/pa.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import {RatingModule} from 'primeng/rating';
import { JwtInterceptor } from './interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PaComponent,
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent,
    DashboardComponent,
    SidebarComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ToastModule,
    FormsModule,
    MessagesModule,
    MessageModule,
   NgxSpinnerModule,
    RatingModule
  ],
  providers: [
    ToastrService,
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
