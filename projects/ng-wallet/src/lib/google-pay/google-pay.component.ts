import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-pay',
  templateUrl: './google-pay.component.html',
  styleUrls: ['./google-pay.component.scss']
})
export class GooglePayComponent implements OnInit {

  @Input() buttonType:                  google.payments.api.ButtonType         = 'buy';
  @Input() buttonColor:                 google.payments.api.ButtonColor        = 'black';
  @Input() environment:                 google.payments.api.Environment        = 'TEST';
  @Input() buttonSizeMode:              google.payments.api.ButtonSizeMode     = 'static';
  @Input() buttonLocale:                string                                 = 'en';

  @Input() paymentRequest!:             google.payments.api.PaymentDataRequest;

  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymenDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) => {
    console.log('payment authorized', paymentData);
    return {
      transactionState: 'SUCCESS'
    };
  }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
