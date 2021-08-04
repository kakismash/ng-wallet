import { doLineItems, doPaymentRequestApple, doPaymentRequestGoogle, doTotalApple, PaymentRequestUiPayments } from './payment-request/payment-request';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApplePayJS } from './apple-pay/applePay';
import { OnChanges } from '@angular/core';
import { PayRequest } from './payment-request/payRequest';
import { AuthPaymentService } from './service/auth-payment.service';
// import { Buffer } from 'node:buffer';
import { Buffer } from 'buffer';
import { Order } from './payment-request/order';
import { Item } from './payment-request/item';

@Component({
  selector: 'ui-payments',
  templateUrl: './ui-payments.component.html'
})
export class UiPaymentsComponent implements OnInit {

  title = 'ui-payments';

  //***********Ui-Payments Component Configuration*********//

  attempt: number = 0;//this is to prevent to transactions being performed

  @Input() gateway!:                string;// either stripe or authorize.net
  @Input() gatewayMerchantId!:      string;
  @Input() credentials!:            string;
  @Input() intentEndpoint?:         string;
  @Input() completionEndpoint?:     string;
  @Input() payRequest!:             PayRequest; //This is for authorize.net and stripe
  @Input() publicKey!:              string; // This is Nosher's public key/public id
  @Input() buttonColor!:            string;
  @Input() colorFont!:              string;
  @Input() order!:                  Order;

  @Output() paymentSuccess:         EventEmitter<any> = new EventEmitter();
  @Output() paymentFail:            EventEmitter<any> = new EventEmitter();

  //***********Stripe Configuration*********//

  @Input() secretKeyStripe!: string;
  @Input() publishableKeyStripe!: string;

  //***********Authorize.net Configuration*********//

  @Input() apiLoginIdAuth!:             string;//"5dJ6eN8V"
  @Input() clientKeyAuth!:              string;//"9Q25f799AVFeY4j2d2hJ29C253q2BJrLKet2uJPhaQVnL9KG7Jdcb8jrGhuGEvbR";
  @Input() timer!:                      number;

  //**********Button Google Configuration********//

  @Input() buttonColorGoogle:                 google.payments.api.ButtonColor                      = 'black';
  @Input() buttonTypeGoogle:                  google.payments.api.ButtonType                       = 'pay';
  @Input() buttonSizeMode:                    google.payments.api.ButtonSizeMode                   = 'fill';
  @Input() buttonLocaleGoogle:                string                                               = 'en';
  @Input() environment:                       google.payments.api.Environment                      = 'TEST';
  @Input() existingPaymentMethodRequired:     boolean                                              = false;
  @Input() paymentDataChangedCallback?:       google.payments.api.PaymentDataChangedHandler;
  @Input() paymentAuthorizedCallback?:        google.payments.api.PaymentAuthorizedHandler;
  @Input() readyToPayChangeCallback?:         (result: any) => void;
  @Input() loadPaymentDataCallback?:          (paymentData: google.payments.api.PaymentData) => void = (result)=>{ this.loadPaymentDataGooglePay(result)};
  @Input() cancelCallback?:                   (reason: google.payments.api.PaymentsError) => void;
  @Input() errorCallback?:                    (error: Error) => void = (error)=>{this.googleButtonError(error)};

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

  paymentRequest!:                   PaymentRequestUiPayments;//this is for GooglePay & ApplePay


  constructor(private paymentService: AuthPaymentService) {}

  ngOnInit(): void {
    // console.log('Apple: ', this.paymentRequestApple);
    if(this.gateway !== 'stripe'){
      this.createPaymentRequest().then(()=>{
        this.doPaymentRequestOnChange();
        console.log('Google: ', this.paymentRequestGoogle);
      });
    };
  }

  doPaymentRequestOnChange(): void {
    this.paymentRequestGoogle = doPaymentRequestGoogle(this.paymentRequest);
    // this.paymentRequestApple  = doPaymentRequestApple(this.paymentRequest);
    // this.total                = doTotalApple(this.paymentRequest);
    this.lineItems            = doLineItems(this.paymentRequest.info);

  }

  emitSuccessPayment(message: any): void {
    this.paymentSuccess.emit(message);
  }

  emitFailedPayment(message: any): void {
    this.paymentFail.emit(message);
  }

  loadPaymentDataGooglePay(result: any): void {
    //this gets a json form google containing the card info and a processing token
    console.log(result)
    this.payRequest.source = 'COMMON.GOOGLE.INAPP.PAYMENT'
    this.payRequest.token = Buffer.from(result.paymentMethodData.tokenizationData.token, 'utf-8').toString('base64');

    this.sendGooglePayment();
  }

  sendGooglePayment(): void {
    this.paymentService
        .sendPaymentAuthNet('public/'+this.publicKey+'/payment', this.payRequest)
        .subscribe({
          next: (resp=>
            {
              console.log('AUTH.NET PAYMENT SUCCESS: '+resp);
              this.paymentSuccess.emit(resp);
            }),
          error:(err=>{
            this.paymentFail.emit(err);
            this.attempt = 0;
          })
        });
  }

  getGateway(): string {
    let gateway: string = ''

    switch (this.gateway) {
      case 'stripe':
        gateway = 'stripe'
        break;

      case 'auth.net' || 'authorize.net':
        gateway = 'authorizenet'
        break;

      default:
        throw new Error("PLEASE PROVIDE GATEWAY");
    }

    return gateway;
  }

  async createPaymentRequest(): Promise<void> {
    /**
     * This is used to create the payment request that will be sent to google or apple
     * Google: https://developers.google.com/pay/api/web/reference/request-objects
     */

    this.paymentRequest = {
      versionAPIApple: 2,
      typePaymentMethod: 'CARD',
      allowedAuthMethods: [
        'PAN_ONLY', 'CRYPTOGRAM_3DS'
      ],
      allowedCardNetworks: [
        'VISA', 'MASTERCARD'
      ],
      TokenizationSpecification: 'PAYMENT_GATEWAY',
      gateway: this.getGateway(),
      gatewayMerchantId: this.gatewayMerchantId, // AUTHORIZE.NET payment gateway id 790103
      merchantId: '790103',
      merchantName: 'TEST',
      appleMerchant: '/authorizeMerchant',
      merchantCapabilities: ['SUPPORTS_3DS'],
      // billingAddressRequired: true,
      // billingFormat: 'FULL',
      info: {
        id: this.order.id,
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: String(this.payRequest.amount),
        currencyCode: this.order.currencyCode,
        countryCode: 'US',
        subTotalPrice: this.order.subTotalPrice,
        taxes: [
          {
            label: 'Taxes',
            amount: String(this.order.tax)
          }
        ]
      }
    };
  }

  googleButtonError(error: any): void {
    console.log(error);
  }
}
