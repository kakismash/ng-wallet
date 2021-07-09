# Wallet for Angular 

Digital Wallet integrations for Angular.

## Necessary Dependencies

It is necessary to have Google Pay Button installed.
Run `npm install @google-pay/button-angular`

## Installation

To install and run this proyect just type and execute.
`npm install ui-payments`

## Implementation and use

Once the component has been installed we must add it to our project.
To do this in the required module we add the following line
`import { UiPaymentsModule } from 'ui-payments';`

Don't forget to add it to the module imports
`imports: [UiPaymentsModule]`

Once it is included, you have to use it and configure it to your liking.
For them in the HTML we use the selector `<lib-ui-payments></lib-ui-payments>`

## Example usage

`<lib-ui-payments
  [buttonColor]="buttonColor"
  [buttonType]="buttonType"
  [buttonLocale]="buttonLocale"
  [buttonSizeMode]="buttonSizeMode"
  [environment]="environment"
  [paymentRequest]="paymentRequest"
</lib-ui-payments>`

* buttonColor: Specifies the color of the button. It is optional and the values can be "default" | "black" | "white"
* buttonType: Button type to use. It is optional and the values can be "buy" | "plain" | "donate" | "long" | "short"
* buttonLocale: This ISO 639-1 code represents the desired button language. It is optional and the value is a string.
* buttonSizeMode: Buttons will be sized according to the translated buttonType. It is optional and the values can be "static" | "fill".
* environment: The Google Pay environment to target. It is required and the values can be "TEST" | "PRODUCTION".
* paymentRequest: Request parameters that define the type of payment information requested from Google Pay. It is required and the type is PaymentDataRequest.

## Button preview

![](/button-preview.jpg)

## Documentation

Visit the [Google Pay developer site](https://developers.google.com/pay/api/web/overview) for more information about integrating Google Pay into your website.

