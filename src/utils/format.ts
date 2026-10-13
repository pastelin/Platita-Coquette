import { storeConfig } from '../config/store';

export function formatPrice(price: number | null): string {
  if (price === null) return 'Consultar precio';
  return new Intl.NumberFormat(storeConfig.locale, {
    style: 'currency',
    currency: storeConfig.currency,
    maximumFractionDigits: 0,
  }).format(price);
}
