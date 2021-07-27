import { Component, Input, OnInit } from '@angular/core';
import { Stripe, PaymentIntent, StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';

@Component({
  selector: 'lib-stripe-pay',
  templateUrl: './stripe-pay.component.html',
  styleUrls: ['./stripe-pay.component.scss']
})
export class StripePayComponent implements OnInit {

  @Input() wallet!: boolean;
  @Input() paymentIntent!: PaymentIntent;
  @Input() reference!: string;
  // @Input() stripe!: stripe.Stripe;
  // @Input() stripeElements!: stripe.elements.Elements;
  // @Input() cardElement!: stripe.elements.Element;
  @Input() elementsOptions: StripeElementsOptions = {locale: 'en'};
  @Input() colorButton!: string;
    // stripe!: stripe.Stripe;
  // stripeElements!: stripe.elements.Elements;
  // cardElement!: stripe.elements.Element;
  // elementsOptions: StripeElementsOptions = {locale: 'en'};

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
  paymentInfo: any;
  stripePaymentService: any;
  readyToPay!: boolean;//make this into a boolean
  paymentForm: any;
  disablePayButton!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

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
  // credentials(credentials: any, paymentInfo: any) {
  //   throw new Error('Method not implemented.');
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
  // walletListener(intent: PaymentIntent, paymentRequest: stripe.paymentRequest.StripePaymentRequest) {
  //   throw new Error('Method not implemented.');
  // }
  // cardCheckout() {
  //   throw new Error('Method not implemented.');
  // }
  pay(): void{

    // this.disablePayButton = true;
    // this.stripe
    //     .confirmCardPayment(this.paymentIntent.client_secret,
    //                         {payment_method: {card: this.cardElement}})
    //     .then(res => {

    //   if (res.error){
    //     this.paymentFailed(res);
    //     this.disablePayButton = false;
    //   } else{
    //     this.paymentSucceeded(res);
    //   }
    // });
  }


}
