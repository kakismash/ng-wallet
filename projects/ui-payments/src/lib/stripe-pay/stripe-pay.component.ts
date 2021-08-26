import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {
  PaymentIntent,
  StripeCardElementOptions,
  StripeElementsOptions } from '@stripe/stripe-js';
import { PayRequest } from '../payment-request/payRequest';
import { StripePaymentService } from '../service/stripe-payment.service';
import { Platform } from '@angular/cdk/platform';


@Component({
  selector: 'stripe-pay',
  templateUrl: './stripe-pay.component.html',
  styleUrls: ['./stripe-pay.component.scss']
})
export class StripePayComponent implements AfterViewInit {
  @ViewChild('walletDiv', {static: false}) walletDivRef?: ElementRef;
  @ViewChild('cardDiv', {static: false}) cardDivRef?: ElementRef;

  @Input() payRequest:        PayRequest = new PayRequest();
  @Input() publicId!:         string;
  @Input() secretKey!:        string;
  @Input() publishableKey!:   string;
  @Input() colorButton!:      string;
  @Input() colorFont!:        string;

  @Output() paymentSuccess:   EventEmitter<any> = new EventEmitter();
  @Output() paymentFailed:    EventEmitter<any> = new EventEmitter();

  wallet?:                    boolean = false;
  // walletButtonType?:          string;
  paymentType?:               string = undefined;
  reference?:                 string;
  paymentIntent!:             PaymentIntent;
  stripe!:                    stripe.Stripe;
  stripeElements!:            stripe.elements.Elements;
  cardElement!:               stripe.elements.Element;
  elementsOptions:            StripeElementsOptions = {locale: 'en'};

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  readyToPay!:                boolean; // make this into a boolean
  disablePayButton!:          boolean;

  constructor(private stripePaymentService: StripePaymentService, private platform: Platform) {}

  ngAfterViewInit(): void {
    // if (this.platform.SAFARI) {
    //   console.log('Browser SAFARI');
    //   this.walletButtonType = 'applepay';
    // } else if(this.platform.BLINK) {
    //   console.log('Browser CHROME');
    //   this.walletButtonType = 'googlepay';
    // }
    this.stripe = Stripe(this.publishableKey);
    this.getIntent();
  }

  getIntent(){

    console.log('getIntent: ' +  Math.round(this.payRequest.amount) + ' active tip ' + this.payRequest.tip);

    const request: PayRequest = {intentId: this.paymentIntent?.id,
                                  orderId: this.payRequest.orderId,
                                  amount: Math.round(this.payRequest.amount*100),
                                  tip: Math.round(this.payRequest.tip*100),
                                  currency: this.payRequest.currency,
                                  description: this.payRequest.description,
                                  email: this.payRequest.email,
                                  notify: this.payRequest.notify,
                                  offline: this.payRequest.offline,
                                  token: this.publicId,
                                  source: this.payRequest.source,
                                  countryCode: this.payRequest.countryCode
                                };

    this.checkoutDestroy();
    this.stripePaymentService
        .payIntent(this.publicId,
                   request)
        .subscribe({
          next: (res => { // Set up Stripe Elements
            this.paymentIntent = res as unknown as PaymentIntent;
            this.reference = res.reference;
            this.stripeElements = this.stripe.elements();
            this.walletCheckout(this.paymentIntent);
          }),
          error: (error => {
            this.readyToPay = false;
            console.log(error);
            this.paymentFailed.emit(error);
          })
        });
  }


  walletCheckout(intent: PaymentIntent) {
    const v = Number(this.payRequest.amount * 100).toString();
    const paymentRequest = this.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        //The name of the store is being passed through the description (temporary) - crsmejia
        label: this.payRequest.description,
        amount: parseInt(v, 10)
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    const elements     = this.stripe.elements();
    const walletButton = elements.create('paymentRequestButton',
                                         {paymentRequest, });

    // Check the availability of the Payment Request API first.
    paymentRequest.canMakePayment()
                  .then((result: any) => {
      if (result) {
        // this.wallet = true;
        walletButton.mount('#walletDiv');
        this.wallet = true;
        console.log('FOUND WALLET');
        this.walletListener(intent,
                            paymentRequest);
      } else {
        this.wallet = false;
        this.showCC();
      //   // document.getElementById('walletDiv')
      //   //         .style
      //   //         .display = 'none';
      //   walletButton.unmount();
      }
    });
  }

  walletListener(intent: PaymentIntent,
                 request: any): void {

    const stripeObj = this.stripe;
    const vm = this;

    request.on('paymentmethod', (ev: { paymentMethod: { id: any; }; complete: (arg0: string) => void; }) => {

      // Confirm the PaymentIntent without handling potential next actions (yet).
      stripeObj.confirmCardPayment(intent.client_secret ? intent.client_secret : '',
                                   {payment_method: ev.paymentMethod.id},
                                   {handleActions: false})
               .then((res: any) => {

        if (res.error) {
          console.log(res.error);
          ev.complete('fail');
          vm.paymentFailed.emit(res);
        } else if(res && res.paymentIntent) {

          // Report to the browser that the confirmation was successful, prompting
          // it to close the browser payment method collection interface.
          ev.complete('success');
          console.log('Status: ' + res.paymentIntent.status);

          // Check if the PaymentIntent requires any actions and if so let Stripe.js
          // handle the flow. If using an API version older than "2019-02-11" instead
          // instead check for: `paymentIntent.status === "requires_source_action"`.
          if (res.paymentIntent.status === 'requires_action') {

            // Let Stripe.js handle the rest of the payment flow.
            if(intent.client_secret !== null){

              stripeObj.confirmCardPayment(intent.client_secret)
              .then((result: any) => {
                if (result.error) {
                  vm.paymentFailed.emit(res);
                } else {
                  vm.paymentSuccess.emit(res);
                }
              });

            }

          } else {
            vm.paymentSuccess.emit(res);
          }
        }
      });
    });

    request.on('invalid_request_error', (ev: any) => {
      alert('Unexpected error');
      console.log(ev);
    });
  }

  cardCheckout(): void{

    const style: any = {base: {color: '#32325d',
                               fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                               fontSmoothing: 'antialiased',
                               fontSize: '16px',
                               '::placeholder': {color: '#aab7c4'}},
                        invalid: {color: '#fa755a',
                                  iconColor: '#fa755a'}};

    if (this.cardElement === undefined){
      this.cardElement = this.stripeElements
                             .create('card',
                                     {style});
    }

    if(this.cardDivRef){
      console.log('rendered')
      this.cardElement
          .mount(this.cardDivRef.nativeElement);
    }else{
      console.log('NOT rendered')
    }

    this.disablePayButton = false;

    this.cardElement
        .on('change',
            function(event: any) {

        if (event.error) {

        }

      }.bind(this)
    );
  }

  pay(): void{

    this.disablePayButton = true;

    if(this.paymentIntent && this.paymentIntent.client_secret){
      this.stripe
          .confirmCardPayment(this.paymentIntent.client_secret,
                              {payment_method: {card: this.cardElement}})
          .then((res: any) => {

        if (res.error){
          this.paymentFailed.emit(res);
          this.disablePayButton = false;
        } else{
          this.paymentSuccess.emit(res);
        }
      });
    }
  }

  checkoutDestroy(){
    if (this.cardElement !== undefined){
      this.cardElement.unmount();
      // this.cardElement = undefined;
    }
  }

  showWallet(): void {
    this.paymentType = 'wallet';
    this.walletCheckout(this.paymentIntent);
    this.checkoutDestroy();
  }

  hideWallet() {
    this.paymentType = undefined;
  }

  showCC(): void {
    this.paymentType = 'cc';
    if(this.cardDivRef){
      this.cardCheckout();
    }
  }

}
