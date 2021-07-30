import { ApplePayComponent } from './apple-pay/apple-pay.component';
import { NgModule } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { GooglePayComponent } from './google-pay/google-pay.component';
import { UiPaymentsComponent } from './ui-payments.component';
import { AuthNetPayComponent } from './authnet-pay/authnet-pay.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { NgxStripeModule } from 'ngx-stripe';
import { StripePayComponent } from './stripe-pay/stripe-pay.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


// import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    UiPaymentsComponent,
    GooglePayComponent,
    ApplePayComponent,
    AuthNetPayComponent,
    StripePayComponent,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    GooglePayButtonModule,
    FormsModule,
    NgxStripeModule,
    MatButtonModule,
    MatIconModule
    // HttpClient,

  ],
  exports: [
    UiPaymentsComponent
  ]
})
export class UiPaymentsModule { }
