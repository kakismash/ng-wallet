import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-wallet',
  templateUrl: './ng-wallet.component.html'
})
export class NgWalletComponent {

  title = 'ng-wallet';

  //**********Button Google Configuration********//
  @Input() paymentRequest!:                   google.payments.api.PaymentDataRequest;
  @Input() environment!:                      google.payments.api.Environment;
  @Input() existingPaymentMethodRequired!:    boolean;
  @Input() buttonColor?:                      google.payments.api.ButtonColor;
  @Input() buttonType?:                       google.payments.api.ButtonType;
  @Input() buttonSizeMode?:                   google.payments.api.ButtonSizeMode;
  @Input() buttonLocale?:                     string;
  @Input() paymentDataChangedCallback?:       google.payments.api.PaymentDataChangedHandler;
  @Input() paymentAuthorizedCallback?:        google.payments.api.PaymentAuthorizedHandler;
  @Input() readyToPayChangeCallback?:         (result: any) => void;
  @Input() loadPaymentDataCallback?:          (paymentData: google.payments.api.PaymentData) => void;
  @Input() cancelCallback?:                   (reason: google.payments.api.PaymentsError) => void;
  @Input() errorCallback?:                    (error: Error) => void;

  constructor() {}

}
