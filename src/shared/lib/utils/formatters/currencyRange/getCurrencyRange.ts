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
  if (min == null && max == null) {
    return 'Не указана';
  }

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  if (min != null && max != null) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  }

  if (min != null) {
    return `от ${formatter.format(min)}`;
  }

  return `до ${formatter.format(max as number)}`;
}
