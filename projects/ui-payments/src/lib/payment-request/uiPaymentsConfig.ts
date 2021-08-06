export class uiPaymentsConfig {
  versionAPIApple!: number;
  typePaymentMethod!: string;
  allowedAuthMethods!: string[];
  allowedCardNetworks!: string[];
  tokenizationSpecification?: string;
  gateway!: string;
  gatewayMerchantId?: string;
  merchantId?: string;
  merchantName?: string;
  appleMerchant?: string;
  merchantCapabilities?: string[];
}
