import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePayButtonModule } from '@google-pay/button-angular';

import { NgWallet } from './ng-wallet.directive';
import { GooglePayComponent } from './google-pay/google-pay.component';

@NgModule({
  declarations: [
    NgWallet,
    GooglePayComponent
  ],
  imports: [
    BrowserModule,
    GooglePayButtonModule
  ],
  exports: [NgWallet],
  providers: [],
  bootstrap: [NgWallet]
})
export class AppModule { }
