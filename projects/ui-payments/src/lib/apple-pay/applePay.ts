// Type definitions for Apple Pay JS 1.0
// Project: https://developer.apple.com/reference/applepayjs
// Definitions by: Martin Costello <https://martincostello.com/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export declare namespace ApplePayJS {

  /**
   * Defines a line item in a payment request - for example, total, tax, discount, or grand total.
   */
  interface ApplePayLineItem {

      /**
       * A short, localized description of the line item.
       */
      label: string;

      /**
       * The line item's amount.
       */
      amount: string;

      /**
       * A value that indicates if the line item is final or pending.
       */
      type?: string;
  }

  /**
   * Represents the result of authorizing a payment request and contains encrypted payment information.
   */
  interface ApplePayPayment {

      /**
       * The encrypted token for an authorized payment.
       */
      token: ApplePayPaymentToken;

      /**
       * The billing contact selected by the user for this transaction.
       */
      billingContact?: ApplePayPaymentContact;

      /**
       * The shipping contact selected by the user for this transaction.
       */
      shippingContact?: ApplePayPaymentContact;
  }

  /**
   * The Apple​Pay​Payment​Authorized​Event class defines the attributes contained by the ApplePaySession.onpaymentauthorized callback function.
   */
  abstract class ApplePayPaymentAuthorizedEvent extends Event {

      /**
       * The payment token used to authorize a payment.
       */
      readonly payment: ApplePayPayment;
  }

  /**
   * Encapsulates contact information needed for billing and shipping.
   */
  interface ApplePayPaymentContact {

      /**
       * An email address for the contact.
       */
      emailAddress: string;

      /**
       * The contact's family name.
       */
      familyName: string;

      /**
       * The contact's given name.
       */
      givenName: string;

      /**
       * A phone number for the contact.
       */
      phoneNumber: string;

      /**
       * The address for the contact.
       */
      addressLines: string[];

      /**
       * The city for the contact.
       */
      locality: string;

      /**
       * The state for the contact.
       */
      administrativeArea: string;

      /**
       * The zip code, where applicable, for the contact.
       */
      postalCode: string;

      /**
       * The colloquial country name for the contact.
       */
      country: string;

      /**
       * The contact's ISO country code.
       */
      countryCode: string;
  }

  /**
   * Contains information about an Apple Pay payment card.
   */
  interface ApplePayPaymentMethod {

      /**
       * A string, suitable for display, that describes the card.
       */
      displayName: string;

      /**
       * A string, suitable for display, that is the name of the payment network backing the card.
       * The value is one of the supported networks specified in the supported​Networks property of the Apple​Pay​Payment​Request.
       */
      network: string;

      /**
       * A value representing the card's type of payment.
       */
      type: string;

      /**
       * The payment pass object associated with the payment.
       */
      paymentPass: ApplePayPaymentPass;
  }

  /**
   * The Apple​Pay​Payment​Method​Selected​Event class defines the attributes contained by the ApplePaySession.onpaymentmethodselected callback function.
   */
  abstract class ApplePayPaymentMethodSelectedEvent extends Event {

      /**
       * The card used to complete a payment.
       */
      readonly paymentMethod: ApplePayPaymentMethod;
  }

  /**
   * Represents a provisioned payment card for Apple Pay payments.
   */
  interface ApplePayPaymentPass {

      /**
       * The unique identifier for the primary account number for the payment card.
       */
      primaryAccountIdentifier: string;

      /**
       * A version of the primary account number suitable for display in your UI.
       */
      primaryAccountNumberSuffix: string;

      /**
       * The unique identifier for the device-specific account number.
       */
      deviceAccountIdentifier?: string;

      /**
       * A version of the device account number suitable for display in your UI.
       */
      deviceAccountNumberSuffix?: string;

      /**
       * The activation state of the pass.
       */
      activationState: string;
  }

  /**
   * Encapsulates a request for payment, including information about payment processing capabilities, the payment amount, and shipping information.
   */
  export interface ApplePayPaymentRequest {

      /**
       * The merchant's two-letter ISO 3166 country code.
       */
      countryCode: string;

      /**
       * The three-letter ISO 4217 currency code for the payment.
       */
      currencyCode: string;

      /**
       * A set of line items that explain recurring payments and/or additional charges.
       */
      lineItems?: ApplePayLineItem[];

      /**
       * The payment capabilities supported by the merchant.
       * The value must at least contain ApplePayMerchantCapability.supports3DS.
       */
      merchantCapabilities: string[];

      /**
       * The payment networks supported by the merchant.
       */
      supportedNetworks: string[];

      /**
       * A line item representing the total for the payment.
       */
      total: ApplePayLineItem;

      /**
       * Billing contact information for the user.
       */
      billingContact?: ApplePayPaymentContact;

      /**
       * The billing information that you require from the user in order to process the transaction.
       */
      requiredBillingContactFields?: string[];

      /**
       * The shipping information that you require from the user in order to fulfill the order.
       */
      requiredShippingContactFields?: string[];

      /**
       * Shipping contact information for the user.
       */
      shippingContact?: ApplePayPaymentContact;

      /**
       * A set of shipping method objects that describe the available shipping methods.
       */
      shippingMethods?: ApplePayShippingMethod[];

      /**
       * How the items are to be shipped.
       */
      shippingType?: string;

      /**
       * Optional user-defined data.
       */
      applicationData?: string;
  }

  /**
   * Contains the user's payment credentials.
   */
  interface ApplePayPaymentToken {

      /**
       * An object containing the encrypted payment data.
       */
      paymentData: any;

      /**
       * Information about the card used in the transaction.
       */
      paymentMethod: ApplePayPaymentMethod;

      /**
       * A unique identifier for this payment.
       */
      transactionIdentifier: string;
  }

  /**
   * The Apple​Pay​Shipping​Contact​Selected​Event class defines the attributes contained by the ApplePaySession.onshippingcontactselected callback function.
   */
  abstract class ApplePayShippingContactSelectedEvent extends Event {

      /**
       * The shipping address selected by the user.
       */
      readonly shippingContact: ApplePayPaymentContact;
  }

  /**
   * Defines a shipping method for delivering physical goods.
   */
  interface ApplePayShippingMethod {

      /**
       * A short description of the shipping method.
       */
      label: string;

      /**
       * A further description of the shipping method.
       */
      detail?: string;

      /**
       * The amount associated with this shipping method.
       */
      amount: string;

      /**
       * A client-defined identifier.
       */
      identifier?: string;
  }

  /**
   * The Apple​Pay​Shipping​Method​Selected​Event class defines the attribute contained by the ApplePaySession.onshippingmethodselected callback function.
   */
  abstract class ApplePayShippingMethodSelectedEvent extends Event {

      /**
       * The shipping method selected by the user.
       */
      readonly shippingMethod: ApplePayShippingMethod;
  }

  /**
   * The Apple​Pay​Validate​Merchant​Event class defines the attributes contained by the ApplePaySession.onvalidatemerchant callback function.
   */
  abstract class ApplePayValidateMerchantEvent extends Event {

      /**
       * The URL used to validate the merchant server.
       */
      readonly validationURL: string;
  }

  abstract class Event {

      readonly bubbles: boolean;

      cancelBubble: boolean;

      readonly cancelable: boolean;

      readonly composed: boolean;

      readonly currentTarget: EventTarget;

      readonly defaultPrevented: boolean;

      readonly eventPhase: number;

      readonly isTrusted: boolean;

      returnValue: boolean;

      readonly srcElement: EventTarget;

      readonly target: EventTarget;

      readonly timeStamp: string;

      readonly type: string;

      composedPath(): Node[];

      initEvent(type?: string, bubbles?: boolean, cancelable?: boolean): void;

      preventDefault(): void;

      stopImmediatePropagation(): void;

      stopPropagation(): void;

      static readonly AT_TARGET: number;

      static readonly BLUR: number;

      static readonly BUBBLING_PHASE: number;

      static readonly CAPTURING_PHASE: number;

      static readonly CHANGE: number;

      static readonly CLICK: number;

      static readonly DBLCLICK: number;

      static readonly DRAGDROP: number;

      static readonly FOCUS: number;

      static readonly KEYDOWN: number;

      static readonly KEYPRESS: number;

      static readonly KEYUP: number;

      static readonly MOUSEDOWN: number;

      static readonly MOUSEDRAG: number;

      static readonly MOUSEMOVE: number;

      static readonly MOUSEOUT: number;

      static readonly MOUSEOVER: number;

      static readonly MOUSEUP: number;

      static readonly NONE: number;

      static readonly SELECT: number;
  }
}
