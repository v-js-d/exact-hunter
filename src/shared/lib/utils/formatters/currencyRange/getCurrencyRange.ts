import { TextFallBack } from '../../../../config/TextFallBack';

import { formatCurrency } from './formatCurrency';

interface CurrencyRangeOptions {
  min?: number | null;
  max?: number | null;
  currency?: string;
}

export function getCurrencyRange({
  min,
  max,
  currency = 'RUB',
}: CurrencyRangeOptions): string {
  switch (true) {
    case min != null && max != null:
      return `${formatCurrency({
        amount: min,
        currency,
      })} - ${formatCurrency({
        amount: max,
        currency,
      })}`;
    case min != null:
      return `от ${formatCurrency({
        amount: min,
        currency,
      })}`;
    case max != null:
      return `до ${formatCurrency({
        amount: max,
        currency,
      })}`;
    default:
      return TextFallBack.common.notSpecified;
  }
}
