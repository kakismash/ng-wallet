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
      if (this.isAcceptedCardType(v) && !this.isAlreadyCardType(v)) {
        this.cardTypes.push(v);
      }
    });
  }

  private isAcceptedCardType(value: string): boolean {
    return this.acceptedCardTypes.includes(value);
  }

  private isAlreadyCardType(value: string): boolean {
    return this.cardTypes.includes(value);
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
      if (this.isAcceptedAuthMethods(v) && !this.isAlreadyAuthMethod(v)) {
        this.authMethods.push(v);
      }
    });
  }

  private isAcceptedAuthMethods(value: string): boolean {
    return this.acceptedAuthMethods.includes(value);
  }

  private isAlreadyAuthMethod(value: string): boolean {
    return this.authMethods.includes(value);
  }
  //------Ends Auth Methods----

  //--------Callback Intents--------
  defaultCallbackIntents(): void {
    this.callbackIntents = [];
    this.callbackIntents.push('PAYMENT_AUTHORIZATION');
  }

  assignCallbackIntents(values: string[]) {
    values.forEach(v => {
      if (this.isAcceptedCallbackIntents(v) && !this.isAlreadyCallbackIntent(v)) {
        this.cardTypes.push(v);
      }
    });
  }

  private isAcceptedCallbackIntents(value: string): boolean {
    return this.acceptedcallbackIntents.includes(value);
  }

  private isAlreadyCallbackIntent(value: string): boolean {
    return this.callbackIntents.includes(value);
  }
  //------Ends Callback Intents----

}
