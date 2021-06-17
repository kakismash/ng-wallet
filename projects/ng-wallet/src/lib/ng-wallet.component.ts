import { Component, Input } from '@angular/core';
import { ApplePayJS } from './apple-pay/applePay';

@Component({
  selector: 'ng-wallet',
  templateUrl: './ng-wallet.component.html'
})
export class NgWalletComponent {

  title = 'ng-wallet';

  //**********Button Google Configuration********//
  @Input() paymentRequestGoogle!:             google.payments.api.PaymentDataRequest;
  @Input() environment!:                      google.payments.api.Environment;
  @Input() existingPaymentMethodRequired!:    boolean;
  @Input() buttonColorGoogle?:                google.payments.api.ButtonColor;
  @Input() buttonTypeGoogle?:                 google.payments.api.ButtonType;
  @Input() buttonSizeMode?:                   google.payments.api.ButtonSizeMode;
  @Input() buttonLocaleGoogle?:               string;
  @Input() paymentDataChangedCallback?:       google.payments.api.PaymentDataChangedHandler;
  @Input() paymentAuthorizedCallback?:        google.payments.api.PaymentAuthorizedHandler;
  @Input() readyToPayChangeCallback?:         (result: any) => void;
  @Input() loadPaymentDataCallback?:          (paymentData: google.payments.api.PaymentData) => void;
  @Input() cancelCallback?:                   (reason: google.payments.api.PaymentsError) => void;
  @Input() errorCallback?:                    (error: Error) => void;

  //**********Button Apple Configuration********//
  @Input() buttonColorApple?:                 string;
  @Input() buttonTypeApple?:                  string;
  @Input() buttonLocaleApple?:                string;
  @Input() width?:                            string;
  @Input() height?:                           string;
  @Input() borderRadius?:                     string;
  @Input() paymentRequestApple!:              ApplePayJS.ApplePayPaymentRequest;
  @Input() endPointApple!:                    string;
  @Input() total!:                            ApplePayJS.ApplePayLineItem;
  @Input() lineItems!:                        Array<ApplePayJS.ApplePayLineItem>;
  @Input() shippingMethods!:                  Array<ApplePayJS.ApplePayShippingMethod>;
  @Input() shippingContact!:                  ApplePayJS.ApplePayPaymentContact;

  //**********Global Configuration********//
  @Input() buttonColor?:                      any;
  @Input() buttonType?:                       any;
  @Input() buttonLocale?:                     string;
  @Input() endPoint?:                         any;
  @Input() paymentRequest?:                   any;



  constructor() {}

}
