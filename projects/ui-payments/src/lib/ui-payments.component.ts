import { doLineItems, doPaymentRequestApple, doPaymentRequestGoogle, doTotalApple, PaymentRequestUiPayments } from './payment-request/payment-request';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplePayJS } from './apple-pay/applePay';
import { OnChanges } from '@angular/core';
import { PayRequest } from './payment-request/payRequest';
import { StripePaymentService } from './service/stripe-payment.service';
import { PaymentIntent, Stripe } from '@stripe/stripe-js';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';

@Component({
  selector: 'ui-payments',
  templateUrl: './ui-payments.component.html'
})
export class UiPaymentsComponent implements OnInit, OnChanges {

   /**TODO:
    * Change the way the paymentRequest property is structured
    * Create input fields for every item under info that is under the paymentRequest
    * Create the event emiiters for successful payments and failed payments
    * create input fields for the endpoints regarding stripe and authorize.net
    * LOOK INTO HOW GOOGLE PAY AND APPLE PAY WORK WITH THE PAYMENTREQUEST FIELD
    * */

  title = 'ui-payments';

  //***********Ui-Payments Component Configuration*********//

  @Input() paymentType!:                      string;
  @Input() credentials!:                      string;
  @Input() intentEndpoint?:                   string;
  @Input() completionEndpoint?:               string;
  @Input() paymentInfo!:                      PayRequest; //This is for authorize.net and stripe
  @Input() publicKey!:                        string;
  @Input() apiLoginId!:                       string;//"5dJ6eN8V"
  @Input() clientKey!:                        string;//"9Q25f799AVFeY4j2d2hJ29C253q2BJrLKet2uJPhaQVnL9KG7Jdcb8jrGhuGEvbR";

  @Output() paymentSuccess:                   EventEmitter<string> = new EventEmitter();
  @Output() paymentFail:                      EventEmitter<string> = new EventEmitter();

  readyToPay: boolean = false;

  //***********Stripe Configuration*********//

  wallet!: boolean;
  paymentIntent!: PaymentIntent;
  reference!: string;
  // stripe!: stripe.Stripe;
  // stripeElements!: stripe.elements.Elements;
  // cardElement!: stripe.elements.Element;
  // elementsOptions: StripeElementsOptions = {locale: 'en'};
  // cardOptions: StripeCardElementOptions = {
  //   style: {
  //     base: {
  //       iconColor: '#666EE8',
  //       color: '#31325F',
  //       fontWeight: '300',
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSize: '18px',
  //       '::placeholder': {
  //         color: '#CFD7E0',
  //       },
  //     },
  //   },
  // };


  //***********Authorize.net Configuration*********//

  //**********Button Google Configuration********//
  @Input() buttonColorGoogle:                 google.payments.api.ButtonColor                      = 'black';
  @Input() buttonTypeGoogle:                  google.payments.api.ButtonType                       = 'buy';
  @Input() buttonSizeMode:                    google.payments.api.ButtonSizeMode                   = 'static';
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

  constructor(private stripePaymentService: StripePaymentService) {}

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

  // ready(ready: boolean): void {
  //   this.getIntent();
  //   this.readyToPay = ready;
  // }

  // getIntent(){

  //   console.log('getIntent: ' +  Math.round(this.paymentInfo.amount * 100) + ' active tip ' + this.paymentInfo.tip);

  //   // const request: PayRequest = {intentId: this.paymentIntent?.id,
  //   //                               orderId: this.order.id,
  //   //                               amount: Math.round(this.paymentForm.value.total * 100),
  //   //                               tip: Math.round(this.paymentForm.value.tip * 100),
  //   //                               currency: 'usd',
  //   //                               description: this.name,
  //   //                               email: this.paymentForm.controls.email.value,
  //   //                               notify: this.notify};

  //   // this.checkoutDestroy();
  //   this.stripePaymentService
  //       .payIntent(this.credentials,
  //                  this.paymentInfo)
  //       .subscribe({
  //         next: (res => { // Set up Stripe Elements
  //         this.paymentIntent = res as unknown as PaymentIntent;
  //         this.reference = res.reference;
  //         this.stripeElements = this.stripe.elements();
  //         this.walletCheckout(this.paymentIntent);
  //         }),
  //         error: (error => {
  //         this.readyToPay = false;
  //         // this.snackBar
  //         //     .open(error.error,
  //         //                     'Dismiss',
  //         //                     {duration: 5000});
  //         })
  //   });
  // }

  // walletCheckout(intent: PaymentIntent) {
  //   const v = Number(this.paymentForm.value.total * 100).toString();
  //   const paymentRequest = this.stripe.paymentRequest({
  //     country: 'US',
  //     currency: 'usd',
  //     total: {
  //       label: this.paymentInfo.description,//this should be the stores name not a description
  //       amount: parseInt(v, 10)
  //     },
  //     requestPayerName: true,
  //     requestPayerEmail: true,
  //   });

  //   const elements     = this.stripe.elements();
  //   const walletButton = elements.create('paymentRequestButton',
  //                                        {paymentRequest, });

  //   // Check the availability of the Payment Request API first.
  //   paymentRequest.canMakePayment()
  //                 .then(result => {

  //     if (result) {
  //       this.wallet = true;
  //       walletButton.mount('#walletDiv');
  //       this.walletListener(intent,
  //                           paymentRequest);
  //     } else {
  //       this.wallet = false;
  //       document.getElementById('walletDiv')
  //               .style
  //               .display = 'none';

  //       this.cardCheckout();
  //     }
  //   });
  // }

}
