import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveTradeAppComponent } from './live-trade-app/live-trade-app.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SharedModule } from './Shared.module';
import { HomeComponent } from './HomeComponent/home.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ClickOutsideDirective } from './HomeComponent/ClickOutsideDirective';
import { FXMarginDetailsComponent } from './fxmargin-details/fxmargin-details.component';
import { FXTriggerComponent } from './fxtrigger/fxtrigger.component';
import { OtherServicesComponent } from './other-services/other-services.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SubscriptionChildComponent } from './subscription/subscription-child/subscription-child.component';
import { ForwardratecalculatorComponent } from './forwardratecalculator/forwardratecalculator.component';
import { RbiRefComponent } from './other-services/rbi-ref/rbi-ref.component';
import { BenchMarkRatesComponent } from './other-services/bench-mark-rates/bench-mark-rates.component';
import { HistoricalrateComponent } from './historicalrate/historicalrate.component';
import { LogoAnimationComponent } from './logo-animation/logo-animation.component';

@NgModule({
  declarations: [
    LiveTradeAppComponent,
    AboutusComponent,
    HomeComponent,
    ClickOutsideDirective,
    FXMarginDetailsComponent,
    FXTriggerComponent,
    OtherServicesComponent,
    ContactusComponent,
    SubscriptionComponent,
    SubscriptionChildComponent,
    ForwardratecalculatorComponent,
    RbiRefComponent,
    BenchMarkRatesComponent,
    HistoricalrateComponent,
    LogoAnimationComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
  ],
  exports: [SharedModule,SubscriptionChildComponent,LogoAnimationComponent]
})
export class HomeModule { }
