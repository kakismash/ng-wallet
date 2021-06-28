import { ApplePayComponent } from './apple-pay/apple-pay.component';
import { NgModule } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { GooglePayComponent } from './google-pay/google-pay.component';
import { NgWalletComponent } from './ng-wallet.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    NgWalletComponent,
    GooglePayComponent,
    ApplePayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    GooglePayButtonModule
  ],
  exports: [
    NgWalletComponent
  ]
})
export class NgWalletModule { }
