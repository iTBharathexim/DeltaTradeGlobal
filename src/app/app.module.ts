import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminGuard } from './RolePermission/Admin/admin.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationPageComponent } from './regitsration-page/registration-page.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MPINPageComponent } from './mpin-page/mpin-page.component';
import { MPINLoginPageComponent } from './mpin-login-page/mpin-login-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CustomComponentModule } from './Component/custom-component.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AppConfig } from '../environments/environment';
import { HomeModule } from './home/home.module';
import { UIViewControllerBasedStatusBarAppearance } from './Controller/UIViewControllerBasedStatusBarAppearance';
import { AndoridFileSystemService } from './Controller/AndoridFileSystem';
import { WebsocketService } from './services/websocket.service';
import { InactivityService } from './Controller/InactivityService';
import { UserIdleService } from './Controller/user-idle-manager/user-idle/user-idle.servies';
import { JsApiCommonSubscriber } from './home/DataService/NetJSApi';
const environmentConfig: any = AppConfig.logger;

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ResetPasswordComponent,
    RegistrationPageComponent,
    OtpPageComponent,
    MPINPageComponent,
    MPINLoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    CustomComponentModule,
    HomeModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgIdleKeepaliveModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel[environmentConfig.level],
      serverLogLevel: NgxLoggerLevel[environmentConfig.serverLevel],
      serverLoggingUrl: environmentConfig.serverUrl,
    } as any),
  ],
  providers: [ApiService,
    AdminGuard, UIViewControllerBasedStatusBarAppearance, AndoridFileSystemService,WebsocketService,InactivityService,
    UserIdleService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public router: Router,public userService:ApiService,
    public websocketService: WebsocketService,
    public JsApiCommonsubscriber: JsApiCommonSubscriber    ) {
    this.websocketService.connect()
    this.JsApiCommonsubscriber.loadJSApi();
  }
}
