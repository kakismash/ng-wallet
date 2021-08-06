import { doLineItems, doPaymentRequestApple, doPaymentRequestGoogle, doTotalApple, PaymentRequestUiPayments } from './payment-request/payment-request';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ApplePayJS } from './apple-pay/applePay';
import { OnChanges } from '@angular/core';
import { PayRequest } from './payment-request/payRequest';
import { AuthPaymentService } from './service/auth-payment.service';
// import { Buffer } from 'node:buffer';
import { Buffer } from 'buffer';
import { Info } from './payment-request/info';
import { Item } from './payment-request/item';
import { uiPaymentsConfig } from './payment-request/uiPaymentsConfig';

@Component({
  selector: 'ui-payments',
  templateUrl: './ui-payments.component.html'
})
export class UiPaymentsComponent implements OnInit {

  title = 'ui-payments';

  //***********Ui-Payments Component Configuration*********//

  @Input() credentials!:            string;
  @Input() intentEndpoint?:         string;
  @Input() completionEndpoint?:     string;
  @Input() payRequest:              PayRequest = new PayRequest(); //This is for authorize.net and stripe
  @Input() publicKey!:              string; // This is Nosher's public key/public id
  @Input() buttonColor!:            string;
  @Input() colorFont!:              string;
  @Input() uiPaymentsConfig!:       uiPaymentsConfig;

  @Output() paymentSuccess:         EventEmitter<any> = new EventEmitter();
  @Output() paymentFail:            EventEmitter<any> = new EventEmitter();

  //***********Stripe Configuration*********//

  @Input() secretKeyStripe!:            string;
  @Input() publishableKeyStripe!:       string;

  //***********Authorize.net Configuration*********//

  @Input() apiLoginIdAuth!:             string;
  @Input() clientKeyAuth!:              string;
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
  @Input() readyToPayChangeCallback?:         (result: any) => void = (result)=>{this.googleReadyToPay(result)};
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

  paymentRequest!:                            PaymentRequestUiPayments;//this is for GooglePay & ApplePay


  constructor(private paymentService: AuthPaymentService) {
  }

  ngOnInit(): void {
    // console.log('Apple: ', this.paymentRequestApple);
    if (this.uiPaymentsConfig.gateway !== 'stripe') {
      this.loadAcceptScript();
    }
    if (this.uiPaymentsConfig.gateway !== 'stripe') {

      this.createPaymentRequest()
          .then(()=>{
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
          })
        });
  }

  private getGateway(): string {
    let gateway: string = ''

    switch (this.uiPaymentsConfig.gateway) {
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

  private getGatewayMerchantId(): string {
    let id = ''

    if(this.uiPaymentsConfig.gatewayMerchantId){
      id = this.uiPaymentsConfig.gatewayMerchantId;
    }else{
      throw new Error("Please provide the gateway merchant id");
    }

    return id;
  }

  private getMerchantId(): string {
    let id = ''

    if(this.uiPaymentsConfig.merchantId){
      id = this.uiPaymentsConfig.merchantId;
    }else{
      throw new Error("Please provide the merchant id");
    }

    return id;
  }

  private getMerchantName(): string {
    let name = ''

    if(this.uiPaymentsConfig.merchantName){
      name = this.uiPaymentsConfig.merchantName;
    }else{
      throw new Error("Please provide the merchant name");
    }

    return name;
  }

  private getAppleMerchant(): string {
    let merchant = '';

    if (this.uiPaymentsConfig.appleMerchant) {
      merchant = this.uiPaymentsConfig.appleMerchant;
    } else {
      throw new Error("Please provide an Apple Merchant");
    }

    return merchant;
  }

  private getMerchantCapa(): string[] {
    let mercCapa: string[] = [];

    if(this.uiPaymentsConfig.merchantCapabilities){
      mercCapa = this.uiPaymentsConfig.merchantCapabilities;
    } else {
      throw new Error("Please provide Merchant Capabilities");
    }

    return mercCapa;
  }

  private async createPaymentRequest(): Promise<void> {
    /**
     * This is used to create the payment request that will be sent to google or apple
     * Google: https://developers.google.com/pay/api/web/reference/request-objects
     */

    this.paymentRequest = {
      versionAPIApple: this.uiPaymentsConfig.versionAPIApple,
      typePaymentMethod: this.uiPaymentsConfig.typePaymentMethod,
      allowedAuthMethods: this.uiPaymentsConfig.allowedAuthMethods,
      allowedCardNetworks: this.uiPaymentsConfig.allowedCardNetworks,
      TokenizationSpecification: this.uiPaymentsConfig.tokenizationSpecification,
      gateway: this.getGateway(),
      gatewayMerchantId: this.getGatewayMerchantId(),
      merchantId: this.getMerchantId(), // This is an id obtained from Google once this component is approved
      merchantName: this.getMerchantName(),
      appleMerchant: this.getAppleMerchant(),
      merchantCapabilities: this.getMerchantCapa(),
      // billingAddressRequired: true,
      // billingFormat: 'FULL',
      info: {
        id: this.payRequest.orderId, // optional
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total', // optional
        totalPrice: String(this.payRequest.amount),
        currencyCode: this.payRequest.currency,
        countryCode: this.payRequest.countryCode,// optional
        taxes: [
          {
            label: 'Taxes',
            amount: String(this.payRequest.tax)
          }
        ]
      }
    };
  }

  googleButtonError(error: any): void {
    console.log('GOOGLE PAY ERROR');
    console.log(error);
  }

  googleReadyToPay(ready: any): void {
    console.log('READY TO PAY');
    console.log(ready);
  }

  private loadAcceptScript(): void {
    const node = document.createElement('script');
    node.src = 'https://jstest.authorize.net/v3/AcceptUI.js';
    node.defer = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}


/**
 * paymentRequest: PaymentRequestNGWallet = {
    versionAPIApple: 2,
    typePaymentMethod: 'CARD',
    allowedAuthMethods: [
      'PAN_ONLY', 'CRYPTOGRAM_3DS'
    ],
    allowedCardNetworks: [
      'VISA', 'MASTERCARD'
    ],
    typeTokenization: 'PAYMENT_GATEWAY',
    gateway: 'example',
    gatewayMerchantId: 'exampleGatewayMerchantId',
    merchantId: '12345678901234567890',
    merchantName: 'Demo Merchant',
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
}
 */
