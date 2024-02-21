import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveTradeAppComponent } from './home/live-trade-app/live-trade-app.component';
import { AdminGuard } from './RolePermission/Admin/admin.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationPageComponent } from './regitsration-page/registration-page.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { MPINPageComponent } from './mpin-page/mpin-page.component';
import { MPINLoginPageComponent } from './mpin-login-page/mpin-login-page.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { HomeComponent } from './home/HomeComponent/home.component';
import { SubscriptionComponent } from './home/subscription/subscription.component';
import { FXMarginDetailsComponent } from './home/fxmargin-details/fxmargin-details.component';
import { FXTriggerComponent } from './home/fxtrigger/fxtrigger.component';
import { OtherServicesComponent } from './home/other-services/other-services.component';
import { ContactusComponent } from './home/contactus/contactus.component';
import { SharedModule } from './home/Shared.module';
import { ForwardratecalculatorComponent } from './home/forwardratecalculator/forwardratecalculator.component';
import { RbiRefComponent } from './home/other-services/rbi-ref/rbi-ref.component';
import { BenchMarkRatesComponent } from './home/other-services/bench-mark-rates/bench-mark-rates.component';
import { HistoricalrateComponent } from './home/historicalrate/historicalrate.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: MPINLoginPageComponent },
  { path: 'MPIN-Login', component: MPINLoginPageComponent },
  { path: 'Registration', component: RegistrationPageComponent },
  { path: 'OtpEmail_OtpMobile', component: OtpPageComponent },
  { path: 'MPIN-Create', component: MPINPageComponent },
  { path: 'ResetPassword', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent, redirectTo: 'LiveTradeApp', canActivate: [AdminGuard] },
  { path: 'LiveTradeApp', component: LiveTradeAppComponent, canActivate: [AdminGuard] },
  { path: 'FXMargin', component: FXMarginDetailsComponent, canActivate: [AdminGuard] },
  { path: 'FXTrigger', component: FXTriggerComponent, canActivate: [AdminGuard] },
  { path: 'OtherServices', component: OtherServicesComponent, canActivate: [AdminGuard] },
  { path: 'ContactUs', component: ContactusComponent, canActivate: [AdminGuard] },
  { path: 'AboutUs', component: AboutusComponent, canActivate: [AdminGuard] },
  { path: 'Subscription', component: SubscriptionComponent, canActivate: [AdminGuard] },
  { path: 'ForwardRateCalculator', component: ForwardratecalculatorComponent, canActivate: [AdminGuard] },
  { path: 'RbiRef', component: RbiRefComponent, canActivate: [AdminGuard] },
  { path: 'BenchMarkRates', component: BenchMarkRatesComponent, canActivate: [AdminGuard] },
  { path: 'HistoricalRate', component: HistoricalrateComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy",onSameUrlNavigation: 'reload' }),SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }