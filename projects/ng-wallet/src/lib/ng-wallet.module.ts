import { NgModule } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { GooglePayComponent } from './google-pay/google-pay.component';
import { NgWalletComponent } from './ng-wallet.component';



@NgModule({
  declarations: [
    NgWalletComponent,
    GooglePayComponent
  ],
  imports: [
    GooglePayButtonModule
  ],
  exports: [
    NgWalletComponent
  ]
})
export class NgWalletModule { }
