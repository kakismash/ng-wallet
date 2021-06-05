import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apple-pay',
  templateUrl: './apple-pay.component.html',
  styleUrls: ['./apple-pay.component.scss']
})
export class ApplePayComponent {

  // Button configuration
  @Input() buttonStyle?:              string;
  @Input() buttonType?:               string;
  @Input() buttonLocale?:             string;
  @Input() width?:                    string;
  @Input() height?:                   string;
  @Input() borderRadius?:             string;

  // Define ApplePayPaymentRequest
  @Input() paymentRequest:            ApplePayJS.ApplePayPaymentRequest = {
      countryCode: "US",
      currencyCode: "USD",
      supportedNetworks: [
          "masterCard",
          "visa"
      ],
      merchantCapabilities: [
          "supports3DS"
      ],
      total: {
          label: "My Store",
          amount: "9.99"
      }
  };

  // Define payment method.
  @Input() total:                   ApplePayJS.ApplePayLineItem = {
      label: "Subtotal",
      type: "final",
      amount: "35.00"
  };

  @Input() lineItems:               Array<ApplePayJS.ApplePayLineItem> = [
      {
          label: "Subtotal",
          type: "final",
          amount: "35.00"
      },
      {
          label: "Free Shipping",
          amount: "0.00",
          type: "pending"
      },
      {
          label: "Estimated Tax",
          amount: "3.06"
      }
  ];

  // Define shipping method.
  @Input() shippingMethods:        Array<ApplePayJS.ApplePayShippingMethod> = [
      {
          label: "Free Shipping",
          detail: "Arrives in 5 to 7 days",
          amount: "0.00",
          identifier: "FreeShipping"
      },
      {
          label: "2-hour Shipping",
          amount: "5.00"
      }
  ];


  // Define shipping contact.
  @Input() shippingContact:        ApplePayJS.ApplePayPaymentContact = {
      emailAddress: "ravipatel@example.com",
      familyName: "Patel",
      givenName: "Ravi",
      phoneNumber: "(408) 555-5555",
      addressLines: [
          "1 Infinite Loop"
      ],
      locality: "Cupertino",
      administrativeArea: "CA",
      postalCode: "95014",
      country: "United States",
      countryCode: "US"
  };


  constructor() { }

  onApplePayButtonClicked(): void {

    if (!ApplePaySession) {
        return;
    }


    // Create ApplePaySession
    const session = new ApplePaySession(3, this.paymentRequest);

    session.onvalidatemerchant = event => {
        // Call your own server to request a new merchant session.
        fetch("/authorizeMerchant")
          .then(res => res.json()) // Parse response as JSON.
          .then(merchantSession => {
            session.completeMerchantValidation(merchantSession);
          })
          .catch(err => {
            console.error("Error fetching merchant session", err);
          });
    };

    session.onpaymentmethodselected = event => {
        session.completePaymentMethodSelection(this.total, this.lineItems);
    };

    session.onshippingmethodselected = event => {
        session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS,
                                                this.total,
                                                this.lineItems);
    };

    session.onshippingcontactselected = event => {
        session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS,
                                                  this.shippingMethods,
                                                  this.total,
                                                  this.lineItems);
    };

    session.onpaymentauthorized = event => {
        session.completePayment(ApplePaySession.STATUS_SUCCESS);
    };

    session.oncancel = event => {
        // Payment cancelled by WebKit
    };

    session.begin();
  }
}
