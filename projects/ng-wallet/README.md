# Wallet for Angular 

Digital Wallet Integrations for Angular. Availability of making payments using Google Pay and Apple Pay.

## Requirements for Google Pay 

It is necessary to have Google Pay Button installed.
Run `npm install @google-pay/button-angular`

## Requirments for Apple Pay

The requirements for using Apple Pay on your website are:
* iOS devices running iOS 11 or later.
* Safari 11 on macOS 10.13 or later.
* Your website must comply with the Apple Pay guidelines. For more information, see [Apple Pay on the Web: Acceptable Use Guidelines](https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/).
* You must have an Apple Developer Account and complete the registration. For more information, see [Configuring Your Environment](https://developer.apple.com/documentation/apple_pay_on_the_web/configuring_your_environment).
* All pages that include Apple Pay must be served over HTTPS. For more information, see [Setting Up Your Server](https://developer.apple.com/documentation/apple_pay_on_the_web/setting_up_your_server).

## Installation

To install and run this proyect just type and execute.
```bash
npm install ng-wallet
```

## Implementation and Use

Once the component has been installed we must add it to our project.
To do this in the required module we add the following line
```bash
import { NgWalletModule } from 'ng-wallet';
```

Don't forget to add it to the module imports
```bash
imports: [
  ...
  NgWalletModule
]
```

Once it is included, you have to use it and configure it to your liking.
For them in the HTML we use the selector `<ng-wallet></ng-wallet>`

## Example usage

```bash
<ng-wallet
  buttonColor="black"
  buttonType="buy"
  buttonLocale="en"
  buttonSizeMode="static"
  environment="TEST"
  paymentRequest="{
                      apiVersion: 2,
                      apiVersionMinor: 0,
                      allowedPaymentMethods: [
                        {
                          type: 'CARD',
                          parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
                          },
                          tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                              gateway: 'example',
                              gatewayMerchantId: 'exampleGatewayMerchantId'
                            }
                          }
                        }
                      ],
                      merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Demo Merchant'
                      },
                      transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: '100.00',
                        currencyCode: 'USD',
                        countryCode: 'US'
                      }
                    }"

  buttonStyle="black"
  buttonTypeApple="buy"
  lang="en"
  width="100px"
  height="30px"
  borderRadius="0pt"
  endPointApple="/authorizeMerchant"
  paymentRequestApple="{
                          countryCode: 'US',
                          currencyCode: 'USD',
                          supportedNetworks: [
                              'masterCard',
                              'visa'
                          ],
                          merchantCapabilities: [
                              'supports3DS'
                          ],
                          total: {
                              label: 'My Store',
                              amount: '9.99'
                          }
                        }"
  total="{
            label: 'Subtotal',
            type: 'final',
            amount: '35.00'
          }"
  lineItems="[
                {
                    label: 'Subtotal',
                    type: 'final',
                    amount: '35.00'
                },
                {
                    label: 'Free Shipping',
                    mount: '0.00',
                    type: 'pending'
                },
                {
                    label: 'Estimated Tax',
                    amount: '3.06'
                }
              ]"
  shippingMethods="[
                      {
                          label: 'Free Shipping',
                          detail: 'Arrives in 5 to 7 days',
                          amount: '0.00',
                          identifier: 'FreeShipping'
                      },
                      {
                          label: '2-hour Shipping',
                          amount: '5.00'
                      }
                  ]"
  shippingContact="{
                        emailAddress: 'ravipatel@example.com',
                        familyName: 'Patel',
                        givenName: 'Ravi',
                        phoneNumber: '(408) 555-5555',
                        addressLines: [
                            '1 Infinite Loop'
                        ],
                        locality: 'Cupertino',
                        administrativeArea: 'CA',
                        postalCode: '95014',
                        country: 'United States',
                        countryCode: 'US'
                    }"
>
</ng-wallet>
```

## Google Pay Button Properties 

* **buttonColor**: *Specifies the color of the button. It is optional and the values can be "default" | "black" | "white".*
* **buttonType**: *Button type to use. It is optional and the values can be "buy" | "plain" | "donate" | "long" | "short".*
* **buttonLocale**: *This ISO 639-1 code represents the desired button language. It is optional and the value is a string.*
* **buttonSizeMode**: *Buttons will be sized according to the translated buttonType. It is optional and the values can be "static" | "fill".*
* **environment**: *The Google Pay environment to target. It is required and the values can be "TEST" | "PRODUCTION".*
* **existingPaymentMethodRequired**: *When set to true (and environment is Production), the Google Pay button will only be displayed if the user already has an existing payment that they can use to make a purchase. It is optional and the type is boolean.*
* **paymentRequest**: *Request parameters that define the type of payment information requested from Google Pay. It is required and the type is PaymentDataRequest.*

## Google Pay Button Callbacks/events

* **cancelCallback**: *Invoked when a user cancels or closes the Google Pay payment sheet. Also raised as event "cancel". Invoked an error is encountered in the process of presenting and collecting payment options from the Google Pay payment sheet. errorCallback: Also raised as event "error".*
* **paymentAuthorizedCallback**: *Invoked when a user chooses a payment method. This callback should be used to validate whether or not the payment method can be used to complete a payment. This would be typically used to perform pre-authorization to ensure that the card is valid and has sufficient funds. Note that in order to use this callback paymentRequest.callbackIntents must include PAYMENT_AUTHORIZATION.*
* **paymentDataChangedCallback**: *Invoked when payment the user changes payment data options including payment method, shipping details, and contact details. This callback can be used to dynamically update transactionInfo when payment details, shipping address, or shipping options change. Note that in order to use this callback paymentRequest.callbackIntents must include either SHIPPING_ADDRESS or SHIPPING_OPTION.*
* **readyToPayChangeCallback**: *Invoked when the user's isReadyToPay state changes. This callback can be used to change the application's behaviour based on whether or not the user is ready to pay. Also raised as event "readytopaychange".*
* **loadPaymentDataCallback**: *Invoked when a user has successfully nominated payment details. This callback receives the PaymentData response which includes the PaymentMethodData that can be sent to supported payment processors. Also raised as event "loadpaymentdata".*

## Apple Pay Button Properties 

* **buttonStyle**: *A type that indicates the available appearances for an Apple Pay Button. For more information, see [ApplePayButtonStyle](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaybuttonstyle).*
* **buttonTypeApple**: *A type that indicates the button types that you can display to initiate Apple Pay transactions. For more information, see [ApplePayButton Type](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaybuttontype).*
* **lang**: *A type that indicates the languages and regions that you can specify for the Apple Pay button. For more information, see [ApplePayButtonLocale](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaybuttonlocale).*
* **width and height**: *The size of the buttons will be adjusted to the dimensions defined in the width and height.*
* **borderRadius**: *A type to apply rounded corners to the buttons.*
* **endPointApple**: *Define your own server to request a new merchant session. For more information, see [validationURL](https://developer.apple.com/documentation/apple_pay_on_the_web/applepayvalidatemerchantevent/1778026-validationurl).*
* **paymentRequestApple**: *A request for payment, which includes information about payment processing capabilities, the payment amount, and shipping information. For more information, see [ApplePayPaymentRequest](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest).*
* **total**: *A line item representing the total for the payment. For more information, see [total](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916119-total).*
* **lineItems**: *A set of line items that explain recurring payments and additional charges and discounts. For more information, see [lineItems](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916120-lineitems).*
* **shippingMethods**: *The list of shipping methods available for a payment request. For more information, see [shippingMethods](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916121-shippingmethods).*
* **shippingContact**: *The shipping contact selected by the user for this transaction. For more information, see [shippingContact](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypayment/1916097-shippingcontact).*

## Documentation

* Visit the [Google Pay developer site](https://developers.google.com/pay/api/web/overview) for more information about integrating Google Pay into your website.
* Visit [Apple Pay on the Web](https://developer.apple.com/documentation/apple_pay_on_the_web) for support Apple Pay on your website with JavaScript-based APIs.
