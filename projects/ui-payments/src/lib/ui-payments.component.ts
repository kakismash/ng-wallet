import { doLineItems, doPaymentRequestApple, doPaymentRequestGoogle, doTotalApple, PaymentRequestUiPayments } from './payment-request/payment-request';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplePayJS } from './apple-pay/applePay';
import { OnChanges } from '@angular/core';
import { PayRequest } from './payment-request/payRequest';


@Component({
  selector: 'ui-payments',
  templateUrl: './ui-payments.component.html'
})
export class UiPaymentsComponent implements OnInit, OnChanges {

  title = 'ui-payments';

  //***********Ui-Payments Component Configuration*********//

  @Input() paymentType!:            string;
  @Input() credentials!:            string;
  @Input() intentEndpoint?:         string;
  @Input() completionEndpoint?:     string;
  @Input() paymentInfo!:            PayRequest; //This is for authorize.net and stripe
  @Input() publicKey!:              string;

  @Output() paymentSuccess:         EventEmitter<string> = new EventEmitter();
  @Output() paymentFail:            EventEmitter<string> = new EventEmitter();

  //***********Stripe Configuration*********//

  wallet!: boolean;
  reference!: string;


  //***********Authorize.net Configuration*********//

  @Input() apiLoginId!:             string;//"5dJ6eN8V"
  @Input() clientKey!:              string;//"9Q25f799AVFeY4j2d2hJ29C253q2BJrLKet2uJPhaQVnL9KG7Jdcb8jrGhuGEvbR";
  @Input() buttonColorAuth!:        string;
  @Input() timer!:                  number;

  //**********Button Google Configuration********//
  @Input() buttonColorGoogle:                 google.payments.api.ButtonColor                      = 'black';
  @Input() buttonTypeGoogle:                  google.payments.api.ButtonType                       = 'buy';
  @Input() buttonSizeMode:                    google.payments.api.ButtonSizeMode                   = 'fill';
  @Input() buttonLocaleGoogle:                string                                               = 'en';
  @Input() environment:                       google.payments.api.Environment                      = 'TEST';
  @Input() existingPaymentMethodRequired:     boolean                                              = false;
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

  @Input() paymentRequest!:                   PaymentRequestUiPayments;//this is for GooglePay & ApplePay

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

  emitSuccessPayment(message: any): void {
    this.paymentSuccess.emit(message);
  }

  emitFailedPayment(message: any): void {
    this.paymentFail.emit(message);
  }
}
