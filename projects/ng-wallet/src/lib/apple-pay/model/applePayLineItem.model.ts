export type ApplePayLineItemType = 'final' | 'pending';

export class ApplePayLineItem {
  type?:        ApplePayLineItemType;
  label?:       string;
  amount?:      string;
};
