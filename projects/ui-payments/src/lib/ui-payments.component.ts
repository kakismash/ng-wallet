import { doLineItems, doPaymentRequestApple, doPaymentRequestGoogle, doTotalApple, PaymentRequestUiPayments } from './payment-request/payment-request';
import { Component, Input, OnInit } from '@angular/core';
import { ApplePayJS } from './apple-pay/applePay';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'ui-payments',
  templateUrl: './ui-payments.component.html'
})
export class UiPaymentsComponent implements OnInit, OnChanges {

  title = 'ui-payments';

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
  @Input() appleMerchant!:                    string;

  paymentRequestApple!:                       ApplePayJS.ApplePayPaymentRequest;
  total!:                                     ApplePayJS.ApplePayLineItem;
  lineItems!:                                 Array<ApplePayJS.ApplePayLineItem>;

  @Input() paymentRequest!:                   PaymentRequestUiPayments;

  constructor() {}

  ngOnInit(): void {
    this.doPaymentRequestOnChange();
    console.log('Google: ', this.paymentRequestGoogle);
    console.log('Apple: ', this.paymentRequestApple);
  }

  ngOnChanges(): void {
    this.doPaymentRequestOnChange();
  }

  doPaymentRequestOnChange(): void {
    this.paymentRequestGoogle = doPaymentRequestGoogle(this.paymentRequest);
    this.paymentRequestApple  = doPaymentRequestApple(this.paymentRequest);
    this.total                = doTotalApple(this.paymentRequest);
    this.lineItems            = doLineItems(this.paymentRequest.info);

  }

}
