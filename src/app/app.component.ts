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
  private acceptedCardNetworks:         google.payments.api.CardNetwork[] = ['AMEX', 'VISA', 'MASTERCARD', 'DISCOVER', 'ELECTRON', 'ELO', 'ELO_DEBIT', 'INTERAC', 'JCB', 'MAESTRO'];
  cardNetworks:                         google.payments.api.CardNetwork[] = [];
  private acceptedAuthMethods:          google.payments.api.CardAuthMethod[] = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
  authMethods:                          google.payments.api.CardAuthMethod[] = [];

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

  paymentRequest: google.payments.api.PaymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: this.authMethods,
            allowedCardNetworks: this.cardNetworks
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Demo Merchant'
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: '0.10',
        currencyCode: 'USD',
        countryCode: 'US'
      },
      callbackIntents: ['PAYMENT_AUTHORIZATION']
    };

  //**********Callback Intents********//
  private acceptedcallbackIntents:      google.payments.api.CallbackIntent[] = ['PAYMENT_AUTHORIZATION'];
  callbackIntents:                      google.payments.api.CallbackIntent[] = [];

  constructor() {
    this.defaultCardNetwork();
    this.defaultAuthMethods();
    this.defaultCallbackIntents();
  }

  //--------Card Types--------
  defaultCardNetwork(): void {
    this.cardNetworks = [];
    this.cardNetworks.push('VISA');
    this.cardNetworks.push('MASTERCARD');
  }

  assignCardNetworks(values: google.payments.api.CardNetwork[]) {
    this.assign(values, this.cardNetworks, this.acceptedCardNetworks)
  }
  //------Ends Card Types----

  //------Auth Methods-----
  defaultAuthMethods(): void {
    this.authMethods = [];
    this.authMethods.push('PAN_ONLY');
    this.authMethods.push('CRYPTOGRAM_3DS');
  }

  assignAuthMethods(values: google.payments.api.CardAuthMethod[]) {
    this.assign(values, this.authMethods, this.acceptedAuthMethods)
  }
  //------Ends Auth Methods----

  //--------Callback Intents--------
  defaultCallbackIntents(): void {
    this.callbackIntents = [];
    this.callbackIntents.push('PAYMENT_AUTHORIZATION');
  }

  assignCallbackIntents(values: google.payments.api.CallbackIntent[]): void {
    this.assign(values, this.callbackIntents, this.acceptedcallbackIntents)
  }
  //------Ends Callback Intents----

  assign(values: google.payments.api.CardAuthMethod[] |
                  google.payments.api.CardNetwork[] |
                    google.payments.api.CallbackIntent[],
         toPush: Array<google.payments.api.CardAuthMethod |
                  google.payments.api.CardNetwork |
                    google.payments.api.CallbackIntent>,
         acceptedValues: Array<google.payments.api.CardAuthMethod |
                                google.payments.api.CardNetwork |
                                  google.payments.api.CallbackIntent>) {
    values.forEach((v: google.payments.api.CardAuthMethod |
                        google.payments.api.CardNetwork |
                          google.payments.api.CallbackIntent) => {
      if (this.isAccepted(v, acceptedValues) && !this.isAlready(v, toPush)) {
        toPush.push(v);
      }
    });
  }

  private isAccepted(value: google.payments.api.CardAuthMethod |
                              google.payments.api.CardNetwork |
                                google.payments.api.CallbackIntent,
                     array: Array<google.payments.api.CardAuthMethod |
                                    google.payments.api.CardNetwork |
                                      google.payments.api.CallbackIntent>): boolean {
    return array.includes(value);
  }

  private isAlready(value: google.payments.api.CardAuthMethod |
                            google.payments.api.CardNetwork |
                              google.payments.api.CallbackIntent,
                    array: Array<google.payments.api.CardAuthMethod |
                                  google.payments.api.CardNetwork |
                                    google.payments.api.CallbackIntent>): boolean {
    return array.includes(value);
  }
}
