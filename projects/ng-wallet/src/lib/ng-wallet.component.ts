import { PaymentRequestNGWallet } from './payment-request';
import { Component, Input } from '@angular/core';
import { ApplePayJS } from './apple-pay/applePay';

@Component({
  selector: 'ng-wallet',
  templateUrl: './ng-wallet.component.html'
})
export class NgWalletComponent {

  title = 'ng-wallet';

  //**********Button Google Configuration********//
  @Input() buttonColorGoogle:                 google.payments.api.ButtonColor                      = 'black';
  @Input() buttonTypeGoogle:                  google.payments.api.ButtonType                       = 'buy';
  @Input() buttonSizeMode:                    google.payments.api.ButtonSizeMode                   = 'static';
  @Input() buttonLocaleGoogle:                string                                               = 'en';
  @Input() environment:                       google.payments.api.Environment                      = 'TEST';
  @Input() existingPaymentMethodRequired:     boolean                                              = true;
  @Input() paymentDataChangedCallback?:       google.payments.api.PaymentDataChangedHandler;
  @Input() paymentAuthorizedCallback?:        google.payments.api.PaymentAuthorizedHandler;
  @Input() readyToPayChangeCallback?:         (result: any) => void;
  @Input() loadPaymentDataCallback?:          (paymentData: google.payments.api.PaymentData) => void;
  @Input() cancelCallback?:                   (reason: google.payments.api.PaymentsError) => void;
  @Input() errorCallback?:                    (error: Error) => void;

  paymentRequestGoogle!:                      google.payments.api.PaymentDataRequest;

  //**********Button Apple Configuration********//
  @Input() buttonColorApple:                  string                                               = 'black';
  @Input() buttonTypeApple:                   string                                               = 'buy';
  @Input() buttonLocaleApple:                 string                                               = 'en';
  @Input() width:                             string                                               = '100px';
  @Input() height:                            string                                               = '30px';
  @Input() borderRadius:                      string                                               = '0pt';
  @Input() endPointApple!:                    string;
  @Input() total!:                            ApplePayJS.ApplePayLineItem;
  @Input() lineItems!:                        Array<ApplePayJS.ApplePayLineItem>;

  paymentRequestApple!:                       ApplePayJS.ApplePayPaymentRequest;

  @Input() paymentRequest!:                   PaymentRequestNGWallet;

  constructor() {}

  private doAllowedPaymentAuthMethod(/** pass parameter to filter */): google.payments.api.CardAuthMethod[] {
    return ['PAN_ONLY', 'CRYPTOGRAM_3DS']/**filter data */
  }

  private doAllowedCardNetworks(/** pass parameter to filter */): google.payments.api.CardNetwork[] {
    return ['AMEX', 'VISA', 'MASTERCARD']/**filter data */
  }

  private doType(/**pass parameter to filter */): google.payments.api.PaymentMethodType {
    return 'CARD'/**filter data */
  }

  doPaymentRequestOnChange(): void {

    const payRequestGoole: google.payments.api.PaymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: this.doType(),
          parameters: {
            allowedAuthMethods: this.doAllowedPaymentAuthMethod(),
            allowedCardNetworks: this.doAllowedCardNetworks()
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
        totalPrice: '100.00',
        currencyCode: 'USD',
        countryCode: 'US'
      }
    }

    this.paymentRequestGoogle = payRequestGoole;

    this.paymentRequestGoogle = {
                                  apiVersion: 2,
                                  apiVersionMinor: 0,
                                  allowedPaymentMethods: [
                                    {
                                      type: 'CARD',
                                      parameters: {
                                        allowedAuthMethods: this.paymentRequest.allowedAuthMethods,
                                        allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
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
                                    totalPrice: '100.00',
                                    currencyCode: 'USD',
                                    countryCode: 'US'
                                  }
                                }

  }

}
