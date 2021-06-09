# Wallet for Angular 

Digital Wallet Integrations for Angular.

## Requirements

It is necessary to have Google Pay Button installed.
Run `npm install @google-pay/button-angular`

## Installation

To install and run this proyect just type and execute.
```bash
npm install ng-wallet
```

## Implementation and use

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
>
</ng-wallet>
```

* **buttonColor**: *Specifies the color of the button. It is optional and the values can be "default" | "black" | "white".*
* **buttonType**: *Button type to use. It is optional and the values can be "buy" | "plain" | "donate" | "long" | "short".*
* **buttonLocale**: *This ISO 639-1 code represents the desired button language. It is optional and the value is a string.*
* **buttonSizeMode**: *Buttons will be sized according to the translated buttonType. It is optional and the values can be "static" | "fill".*
* **environment**: *The Google Pay environment to target. It is required and the values can be "TEST" | "PRODUCTION".*
* **paymentRequest**: *Request parameters that define the type of payment information requested from Google Pay. It is required and the type is PaymentDataRequest.*

## Documentation

Visit the [Google Pay developer site](https://developers.google.com/pay/api/web/overview) for more information about integrating Google Pay into your website.

## Coming Soon

* Apple Pay Button
* PayPal Button
* Microsoft Pay
