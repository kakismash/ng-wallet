import { ApplePayJS } from "./applePay";



/**
 * A session object for managing the payment process on the web.
 */
 export declare class ApplePaySession extends EventTarget {

  /**
   * Creates a new instance of the ApplePaySession class.
   * @param version - The version of the ApplePay JS API you are using.
   * @param paymentRequest - An Apple​Pay​Payment​Request object that contains the information that is displayed on the Apple Pay payment sheet.
   */
  constructor(version: number, paymentRequest: ApplePayJS.ApplePayPaymentRequest);

  /**
   * A callback function that is automatically called when the payment UI is dismissed with an error.
   */
  oncancel: (event: ApplePayJS.Event) => void;

  /**
   * A callback function that is automatically called when the user has authorized the Apple Pay payment, typically via TouchID.
   */
  onpaymentauthorized: (event: ApplePayJS.ApplePayPaymentAuthorizedEvent) => void;

  /**
   * A callback function that is automatically called when a new payment method is selected.
   */
  onpaymentmethodselected: (event: ApplePayJS.ApplePayPaymentMethodSelectedEvent) => void;

  /**
   * A callback function that is called when a shipping contact is selected in the payment sheet.
   */
  onshippingcontactselected: (event: ApplePayJS.ApplePayShippingContactSelectedEvent) => void;

  /**
   * A callback function that is automatically called when a shipping method is selected.
   */
  onshippingmethodselected: (event: ApplePayJS.ApplePayShippingMethodSelectedEvent) => void;

  /**
   * A callback function that is automatically called when the payment sheet is displayed.
   */
  onvalidatemerchant: (event: ApplePayJS.ApplePayValidateMerchantEvent) => void;

  /**
   * Indicates whether or not the device supports Apple Pay.
   * @returns true if the device supports making payments with Apple Pay; otherwise, false.
   */
  static canMakePayments(): boolean;

  /**
   * Indicates whether or not the device supports Apple Pay and if the user has an active card in Wallet.
   * @param merchantIdentifier - The merchant ID received when the merchant enrolled in Apple Pay.
   * @returns true if the device supports Apple Pay and there is at least one active card in Wallet; otherwise, false.
   */
  static canMakePaymentsWithActiveCard(merchantIdentifier: string): Promise<boolean>;

  /**
   * Displays the Set up Apple Pay button.
   * @param merchantIdentifier - The merchant ID received when the merchant enrolled in Apple Pay.
   * @returns A boolean value indicating whether setup was successful.
   */
  static openPaymentSetup(merchantIdentifier: string): Promise<boolean>;

  /**
   * Verifies if a web browser supports a given Apple Pay JS API version.
   * @param version - A number representing the Apple Pay JS API version being checked. The initial version is 1.
   * @returns A boolean value indicating whether the web browser supports the given API version. Returns false if the web browser does not support the specified version.
   */
  static supportsVersion(version: number): boolean;

  /**
   * Aborts the current Apple Pay session.
   */
  abort(): void;

  /**
   * Begins the merchant validation process.
   */
  begin(): void;

  /**
   * Call after the merchant has been validated.
   * @param merchantSession - An opaque message session object.
   */
  completeMerchantValidation(merchantSession: any): void;

  /**
   * Call when a payment has been authorized.
   * @param status - The status of the payment.
   */
  completePayment(status: number): void;

  /**
   * Call after a payment method has been selected.
   * @param newTotal - An Apple​Pay​Line​Item dictionary representing the total price for the purchase.
   * @param newLineItems - A sequence of Apple​Pay​Line​Item dictionaries.
   */
  completePaymentMethodSelection(newTotal: ApplePayJS.ApplePayLineItem, newLineItems: ApplePayJS.ApplePayLineItem[]): void;

  /**
   * Call after a shipping contact has been selected.
   * @param status - The status of the shipping contact update.
   * @param newShippingMethods - A sequence of ApplePayShippingMethod dictionaries.
   * @param newTotal - An Apple​Pay​Line​Item dictionary representing the total price for the purchase.
   * @param newLineItems - A sequence of Apple​Pay​Line​Item dictionaries.
   */
  completeShippingContactSelection(
      status: number,
      newShippingMethods: ApplePayJS.ApplePayShippingMethod[],
      newTotal: ApplePayJS.ApplePayLineItem,
      newLineItems: ApplePayJS.ApplePayLineItem[]): void;

  /**
   * Call after the shipping method has been selected.
   * @param status - The status of the shipping method update.
   * @param newTotal - An Apple​Pay​Line​Item dictionary representing the total price for the purchase.
   * @param newLineItems - A sequence of Apple​Pay​Line​Item dictionaries.
   */
  completeShippingMethodSelection(status: number, newTotal: ApplePayJS.ApplePayLineItem, newLineItems: ApplePayJS.ApplePayLineItem[]): void;

  /**
   * The requested action succeeded.
   */
  static readonly STATUS_SUCCESS: number;

  /**
   * The requested action failed.
   */
  static readonly STATUS_FAILURE: number;

  /**
   * The billing address is not valid.
   */
  static readonly STATUS_INVALID_BILLING_POSTAL_ADDRESS: number;

  /**
   * The shipping address is not valid.
   */
  static readonly STATUS_INVALID_SHIPPING_POSTAL_ADDRESS: number;

  /**
   * The shipping contact information is not valid.
   */
  static readonly STATUS_INVALID_SHIPPING_CONTACT: number;

  /**
   * The PIN information is not valid. Cards on the China Union Pay network may require a PIN.
   */
  static readonly STATUS_PIN_INCORRECT: number;

  /**
   * The maximum number of tries for a PIN has been reached and the user has been locked out. Cards on the China Union Pay network may require a PIN.
   */
  static readonly STATUS_PIN_LOCKOUT: number;

  /**
   * The required PIN information was not provided. Cards on the China Union Pay payment network may require a PIN to authenticate the transaction.
   */
  static readonly STATUS_PIN_REQUIRED: number;
}
