import { doLineItems, doPaymentRequestApple, doPaymentRequestGoogle, doTotalApple, PaymentRequestUiPayments } from './payment-request/payment-request';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApplePayJS } from './apple-pay/applePay';
import { OnChanges } from '@angular/core';
import { PayRequest } from './payment-request/payRequest';
import { AuthPaymentService } from './service/auth-payment.service';
// import { Buffer } from 'node:buffer';
import { Buffer } from 'buffer';

@Component({
  selector: 'ui-payments',
  templateUrl: './ui-payments.component.html'
})
export class UiPaymentsComponent implements OnInit {

  title = 'ui-payments';

  //***********Ui-Payments Component Configuration*********//

  calls: number = 0;//this is to prevent to transactions being performed

  @Input() gateway!:                string;// either stripe or authorize.net
  @Input() gatewayMerchantId!:      string;
  @Input() credentials!:            string;
  @Input() intentEndpoint?:         string;
  @Input() completionEndpoint?:     string;
  @Input() paymentInfo!:            PayRequest; //This is for authorize.net and stripe
  @Input() publicKey!:              string; // This is Nosher's public key

  @Output() paymentSuccess:         EventEmitter<any> = new EventEmitter();
  @Output() paymentFail:            EventEmitter<any> = new EventEmitter();

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
  @Input() loadPaymentDataCallback?:          (paymentData: google.payments.api.PaymentData) => void = (result)=>{ this.loadPaymentDataGooglePay(result)};
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


  constructor(private paymentService: AuthPaymentService) {}

  ngOnInit(): void {
    // console.log('Apple: ', this.paymentRequestApple);
    this.createPaymentRequest();
  }

  ngAfterViewInit(): void {
    this.doPaymentRequestOnChange();
    console.log('Google: ', this.paymentRequestGoogle);
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

    this.paymentInfo.source = 'COMMON.GOOGLE.INAPP.PAYMENT'
    this.paymentInfo.token = Buffer.from(result.paymentMethodData.tokenizationData.token, 'utf-8').toString('base64');
    console.log(this.paymentInfo);

    if(this.calls< 1){
      this.calls++;
      this.paymentService
          .sendPaymentAuthNet('public/'+this.publicKey+'/payment', this.paymentInfo)
          .subscribe({
            next: (resp=>
              {
                console.log('AUTH.NET PAYMENT SUCCESS: '+resp);
                this.paymentSuccess.emit(resp);
              }),
            error:(err=>{
              this.paymentFail.emit(err);
            })});
    }else{
      console.log('TWO CALLS ARE PROHIBITED');
    }

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

  createPaymentRequest(): void {

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
      info: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: '20.00',
        currencyCode: 'USD',
        countryCode: 'US',
        subTotalPrice: '5.00',
        items: [
          {
            label: 'Beer',
            price: '1.99',
            quantity: 1
          },
          {
            label: 'Cheeseburger',
            price: '3.99',
            quantity: 1
          }
        ],
        taxes: [
          {
            label: 'Taxes',
            amount: '6.00'
          }
        ],
        discount: {
          label: 'Discount',
          amount: '3.44'
        }
      }
    };
  }
}
