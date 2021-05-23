import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-google-pay',
  templateUrl: './google-pay.component.html',
  styleUrls: ['./google-pay.component.scss']
})
export class GooglePayComponent implements OnInit {

  // @Input() buttonColor!:                        string;
  // @Input() buttonType!:                         string;
  // @Input() buttonWidth!:                        number;
  // @Input() buttonHeight!:                       number;
  // @Input() cardTypes!:                          string[];
  // @Input() authMethods!:                        string[];
  // @Input() typeTokenization!:                   string;
  // @Input() gateway!:                            string;
  // @Input() gatewayMerchantId!:                  string;
  // @Input() merchantId!:                         string;
  // @Input() merchantName!:                       string;
  // @Input() totalPriceStatus!:                   string;
  // @Input() totalPriceLabel!:                    string;
  // @Input() totalPrice!:                         string;
  // @Input() currencyCode!:                       string;
  // @Input() countryCode!:                        string;
  // @Input() callbackIntents!:                    string[];

  btnType:                                      string = 'buy';
  btnColor:                                     string = 'black';
  btnWidth:                                     number = 240;
  btnHeight:                                    number = 40;

  @Input() paymentRequest?: google.payments.api.PaymentDataRequest;
  //  = {
  //   apiVersion: 2,
  //   apiVersionMinor: 0,
  //   allowedPaymentMethods: [
  //     {
  //       type: 'CARD',
  //       parameters: {
  //         allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
  //         allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD', 'DISCOVER', 'ELECTRON', 'ELO', 'ELO_DEBIT', 'INTERAC', 'JCB', 'MAESTRO']
  //       },
  //       tokenizationSpecification: {
  //         type: 'PAYMENT_GATEWAY',
  //         parameters: {
  //           gateway: 'example',
  //           gatewayMerchantId: 'exampleGatewayMerchantId'
  //         }
  //       }
  //     }
  //   ],
  //   merchantInfo: {
  //     merchantId: '12345678901234567890',
  //     merchantName: 'Demo Merchant'
  //   },
  //   transactionInfo: {
  //     totalPriceStatus: 'FINAL',
  //     totalPriceLabel: 'Total',
  //     totalPrice: '0.10',
  //     currencyCode: 'USD',
  //     countryCode: 'US'
  //   },
  //   callbackIntents: ['PAYMENT_AUTHORIZATION']
  // };

  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymenDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) => {
    console.log('payment authorized', paymentData);
    return {
      transactionState: 'SUCCESS'
    };
  }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
