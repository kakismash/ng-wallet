# Wallet for Angular 

Digital Wallet Integrations for Angular. Enabling the use of Authorize.net and Stripe. Availability of making payments using Google Pay and Apple Pay.

## Requirements for Google Pay 

It is necessary to have Google Pay Button installed and Stripe.
Run these command line.
```bash
npm install @google-pay/button-angular
npm install @stripe/stripe-js
npm install --save @types/stripe-v3
```


## Requirments for Apple Pay

The requirements for using Apple Pay on your website are:
* iOS devices running iOS 11 or later.
* Safari 11 on macOS 10.13 or later.
* Your website must comply with the Apple Pay guidelines. For more information, see [Apple Pay on the Web: Acceptable Use Guidelines](https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/).
* You must have an Apple Developer Account and complete the registration. For more information, see [Configuring Your Environment](https://developer.apple.com/documentation/apple_pay_on_the_web/configuring_your_environment).
* All pages that include Apple Pay must be served over HTTPS. For more information, see [Setting Up Your Server](https://developer.apple.com/documentation/apple_pay_on_the_web/setting_up_your_server). This is a requirement both in development and in production. One way to get up and running is to use a service like [ngrok](https://ngrok.com/).

## Installation

To install and run this proyect just type and execute.
```bash
npm install ui-payments
```

## Implementation and Use

Once the component has been installed we must add it to our project.
To do this in the required module we add the following line
```bash
import { UiPaymentsModule } from 'ui-payments';
```

Don't forget to add it to the module imports
```bash
imports: [
  ...
  UiPaymentsModule
]
```

Once it is included, you have to use it and configure it to your liking.
For the HTML selector used is `<ui-payments></ui-payments>`

## Example usage

**.ts File**

**PayRequest**

```bash
  // Structure of object being passed to [payRequest]
  // property of Ui-Payments
  PayRequest{
      description?:   string;
      email?:         string;
      currency?:      string;
      amount?:        number;
      tip?:           number;
      tax?:           number;
      paid?:          number;
      orderId?:       number;
      intentId?:      string;
      notify?:        boolean;
      publicId?:      string;
      storeName?:     string;
      countryCode?:   string;
      subTotalPrice?: string;
  }

  // example
  getPaymentRequest(): PayRequest {
    let paymentRequest: PayRequest = {
      amount:        123,
      currency:      'USD',
      description:   '',
      email:         'email@gmail.com',
      tip:           0,
      notify:        true,
      orderId:       '12345',
      countryCode:   'US',
      storeName:     'Cafe Central',
      tax:           115,
      subTotalPrice: '112'  // Remember this value is a string. 
                            // The component will be in charge of 
                            //converting it to number and doing the calculation.
    };
    return paymentRequest;
  }
```

## PayRequest Properties

* **amount**: Total monetary value of the transaction with an optional decimal precision of two decimal places.
* **currency**: The ISO 4217 alphabetic currency code.
* **description**: A short description of the payment to be made.
* **email**: Email of the customer who is going to make the payment.
* **tip**: Total tip monetary value of the transaction with an optional decimal precision of two decimal places.
* **notify**: Notification about the payment.
* **orderId**: The id of the order to be paid.
* **countryCode**: The ISO 3166-1 alpha-2 country code where the transaction is processed. This property is required for merchants who process transactions in European Economic Area (EEA) countries and any other countries that are subject to Strong Customer Authentication (SCA). Merchants must specify the acquirer bank country code.
* **storeName**: Name of the store to which the payment will be made.
* **tax**: Total tax monetary value of the transaction with an optional decimal precision of two decimal places.
* **subTotalPrice**: Monetary value of the items with an optional decimal precision of two decimal places.

**UiPaymentsConfig**

```bash
  // Structure of object being passed to [uiPaymentsConfig]
  // property of Ui-Payments
  UiPaymentsConfig {
    versionAPIApple:           number;
    typePaymentMethod:         string;
    allowedAuthMethods:        string[];
    allowedCardNetworks:       string[];
    tokenizationSpecification: string;
    gateway:                   string;
    gatewayMerchantId:         string;
    merchantId:                string;
    merchantName:              string;
    appleMerchant:             string;
    merchantCapabilities:      string[];
  }

  // example
  getUiPaymentsConfiguration(): UiPaymentsConfig {
    let config: UiPaymentsConfig = {
      versionAPIApple:           2,
      typePaymentMethod:         'CARD',
      allowedAuthMethods:        ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
      allowedCardNetworks:       ['VISA', 'MASTERCARD'],
      tokenizationSpecification: 'PAYMENT_GATEWAY',
      gateway:                   gateway,     // either stripe or authorize.net
      gatewayMerchantId:         '123456',
      merchantName:              'TEST',
      merchantId:                '7896321',
      appleMerchant:             '/authorizeMerchant',
      merchantCapabilities:      ['SUPPORTS_3DS'],
    }
    return config;
  }
```
#### UiPaymentsConfig Properties 

* **versionAPIApple**: An integer specifying the Apple Pay version number. For the best compatibility with operating systems and browsers, use the lowest possible version number that supports the features required. For more information, see [supportsVersion](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaysession/1778014-supportsversion).
* **typePaymentMethod**: A short identifier for the supported payment method. Only **CARD** and **PAYPAL** currently are supported entries.
* **allowedAuthMethods**: Fields supported to authenticate a card transaction. Only **PAN_ONLY** and **CRYPTOGRAM_3DS** currently are supported entries. For more information, see [Card Parameters](https://developers.google.com/pay/api/web/reference/request-objects?hl=ru#CardParameters).
* **allowedCardNetworks**: The payment networks supported by the merchant. For more information, see [supportedNetworks](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916122-supportednetworks) and [Card Parameters](https://developers.google.com/pay/api/web/reference/request-objects?hl=ru#CardParameters).
* **tokenizationSpecification**: A payment method tokenization type is supported for the given PaymentMethod. For CARD payment method, use **PAYMENT_GATEWAY** or **DIRECT**. For PAYPAL PaymentMethod, use **DIRECT** with no parameter. For more information, see [TokenizationSpecification](https://developers.google.com/pay/api/web/reference/request-objects#PaymentMethodTokenizationSpecification).
* **gateway and gatewayMerchantId**: Define the parameters properties as described by your gateway. Typical properties include the gateway's identifier, which is issued by Google, and your gateway account ID, which is provided by the gateway.
* **appleMerchant**: Define your own server to request a new merchant session. For more information, see [validationURL](https://developer.apple.com/documentation/apple_pay_on_the_web/applepayvalidatemerchantevent/1778026-validationurl).
* **merchantCapabilities**: The payment capabilities supported by the merchant on Apple Pay. The supported values for merchantCapabilities are: **SUPPORTS_3DS**, This value must be required, **SUPPORTS_CREDIT**, **SUPPORTS_DEBIT**, **SUPPORTS_EMV**. For more information, see [merchantCapabilities](https://developer.apple.com/documentation/apple_pay_on_the_web/applepaypaymentrequest/1916123-merchantcapabilities).

**.html File**
```bash
    // Authorize.net
    <ui-payments
      [publicKey]="publicId"
      [apiLoginIdAuth]="apiLoginId"
      [clientKeyAuth]="clientKey"
      [uiPaymentsConfig]="getUiPaymentsConfiguration()"
      [payRequest]="getPaymentRequest()"
      [timer]="(counter*1000)"
      (paymentSuccess)="paymentSucceeded($event)"
      (paymentFail)="paymentFailed($event)"
      [buttonColor]="colorButton"
      colorFont]="colorFont"
      >
    </ui-payments>

    // Stripe
    <ui-payments
      [publicKey]="publicId"
      [payRequest]="getPaymentRequest()"
      [uiPaymentsConfig]="getUiPaymentsConfiguration()"
      [secretKeyStripe]="secretKey"
      [publishableKeyStripe]="publishableKey"
      (paymentSuccess)="paymentSucceeded($event)"
      (paymentFail)="paymentFailed($event)"
      [buttonColor]="colorButton"
      [colorFont]="colorFont"
      >
```
#### Component Properties

* **publicKey**: Nosher's public key.
* **payRequest**: Includes information about the payment such as the payment amount, and tip. Look at the example above for the object structure.
* **apiLoginIdAuth**: This is provided by Authorize.net.
* **clientKeyAuth**: This is provided by Authorize.net.
* **timer**: Timer, using milliseconds, to close authorize.net hosted form.
* **secretKeyStripe**: The secret key provided by Stripe.
* **publishableKeyStripe**: The publishable key provided by Stripe.
* **buttonColor**: The color you would like the button to be. Both #colorcode & rgb(#,#,#) syntax work, but passed as a string.
* **colorFont**: The color you would like the button's font to be. Both #colorcode & rgb(#,#,#) syntax work, but passed as a string.

## Documentation

* Visit the [Google Pay developer site](https://developers.google.com/pay/api/web/overview) for more information about integrating Google Pay into your website.
* Visit [Apple Pay on the Web](https://developer.apple.com/documentation/apple_pay_on_the_web) for support Apple Pay on your website with JavaScript-based APIs.

## Button Preview
![Button Preview](https://github.com/kakismash/ui-payments/blob/main/ui-payments-preview.jpg)
