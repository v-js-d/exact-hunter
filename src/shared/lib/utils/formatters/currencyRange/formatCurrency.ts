interface FormatCurrencyOptions {
  amount: number;
  currency?: string;
  locale?: string;
  maximumFractionDigits?: number;
}

export const formatCurrency = ({
  amount,
  currency = 'RUB',
  locale = 'ru-RU',
  maximumFractionDigits = 0,
}: FormatCurrencyOptions): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(amount);
