import { ApplePayComponent } from './apple-pay/apple-pay.component';
import { NgModule } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { GooglePayComponent } from './google-pay/google-pay.component';
import { UiPaymentsComponent } from './ui-payments.component';
import { AuthNetPayComponent } from './authnet-pay/authnet-pay.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    UiPaymentsComponent,
    GooglePayComponent,
    ApplePayComponent,
    AuthNetPayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    GooglePayButtonModule
  ],
  exports: [
    UiPaymentsComponent
  ]
})
export class UiPaymentsModule { }
