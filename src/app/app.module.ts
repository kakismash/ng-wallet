import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePayButtonModule } from '@google-pay/button-angular';

import { AppComponent } from './app.component';
import { GooglePayComponent } from './google-pay/google-pay.component';

@NgModule({
  declarations: [
    AppComponent,
    GooglePayComponent
  ],
  imports: [
    BrowserModule,
    GooglePayButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
