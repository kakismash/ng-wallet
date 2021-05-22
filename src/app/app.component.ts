import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-wallet';

  //**********Button Configuration********//
  buttonColor:                          string   = 'black';
  buttonType:                           string   = 'buy';
  buttonWidth:                          number   = 240;
  buttonHeight:                         number   = 40;

  //**********Allowed Payment Methods********//
  typePaymentMethod:                    string   = 'CARD';
  private acceptedCardTypes:            string[] = ['AMEX', 'VISA', 'MASTERCARD', 'DISCOVER', 'ELECTRON', 'ELO', 'ELO_DEBIT', 'INTERAC', 'JCB', 'MAESTRO'];
  cardTypes:                            string[] = [];
  private acceptedAuthMethods:          string[] = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
  authMethods:                          string[] = [];

  //**********Tokenization Specification********//
  typeTokenization:                     string   = 'PAYMENT_GATEWAY';
  gateway:                              string   = 'example';
  gatewayMerchantId:                    string   = 'exampleGatewayMerchantId';

  //**********Merchant Info********//
  merchantId:                           string   = '12345678901234567890';
  merchantName:                         string   = 'Demo Merchant';

  //**********Transaction Info********//
  totalPriceStatus:                     string   = 'Final';
  totalPriceLabel:                      string   = 'Total';
  totalPrice:                           string   = '0.10';
  currencyCode:                         string   = 'USD';
  countryCode:                          string   = 'US';

  //**********Callback Intents********//
  private acceptedcallbackIntents:      string[] = ['PAYMENT_AUTHORIZATION'];
  callbackIntents:                      string[] = [];

  constructor() {
    this.defaultCardTypes();
    this.defaultAuthMethods();
    this.defaultCallbackIntents();
  }

  //--------Card Types--------
  defaultCardTypes(): void {
    this.cardTypes = [];
    this.cardTypes.push('VISA');
    this.cardTypes.push('MASTERCARD');
  }

  assignCardTypes(values: string[]) {
    values.forEach(v => {
      if (this.isAccepted(v, this.acceptedCardTypes) && !this.isAlready(v, this.cardTypes)) {
        this.cardTypes.push(v);
      }
    });
  }
  //------Ends Card Types----

  //------Auth Methods-----
  defaultAuthMethods(): void {
    this.authMethods = [];
    this.authMethods.push('PAN_ONLY');
    this.authMethods.push('CRYPTOGRAM_3DS');
  }

  assignAuthMethods(values: string[]) {
    values.forEach(v => {
      if (this.isAccepted(v, this.acceptedAuthMethods) && !this.isAlready(v, this.authMethods)) {
        this.authMethods.push(v);
      }
    });
  }
  //------Ends Auth Methods----

  //--------Callback Intents--------
  defaultCallbackIntents(): void {
    this.callbackIntents = [];
    this.callbackIntents.push('PAYMENT_AUTHORIZATION');
  }

  assignCallbackIntents(values: string[]) {
    values.forEach(v => {
      if (this.isAccepted(v, this.acceptedcallbackIntents) && !this.isAlready(v, this.callbackIntents)) {
        this.callbackIntents.push(v);
      }
    });
  }

  //------Ends Callback Intents----

  private isAccepted(value: string, array: Array<string>): boolean {
    return array.includes(value);
  }

  private isAlready(value: string, array: Array<string>): boolean {
    return array.includes(value);
  }
}
