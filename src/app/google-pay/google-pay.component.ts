import { environment } from './../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-pay',
  templateUrl: './google-pay.component.html',
  styleUrls: ['./google-pay.component.scss']
})
export class GooglePayComponent implements OnInit {

  @Input() buttonType:      any  = 'buy';
  @Input() buttonColor:     any  = 'black';
  @Input() environment:     any  = 'TEST';

  @Input() paymentRequest!: google.payments.api.PaymentDataRequest;

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
