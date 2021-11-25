export class PayRequest {
  offline!: boolean;
  notify!: boolean;
  intentId!: string;
  orderId!: string;
  amount!: number;
  tip!: number;
  currency!: string; // default to USD; Stripe requires lower case
  description!: string;
  email!: string;
  token!: string;
  source!: string; //google, apple, card
  tax?: number;
  paid?: number;
  publicId?: string;
  storeName?: string;
  countryCode!: string;
  subTotalPrice?: string;
}
