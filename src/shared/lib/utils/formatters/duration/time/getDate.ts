import dayjs from 'dayjs';

type DateInput = Parameters<typeof dayjs>[0];

export enum DateFormats {
  Hm = 'HH:mm',
  DMY = 'DD.MM.YYYY',
  DMYHm = 'DD.MM.YYYY HH:mm',
  DMYHms = 'DD.MM.YYYY HH:mm:ss',
  ISO = 'YYYY-MM-DDTHH:mmZ',
  YMD_API = 'YYYY-MM-DD',
}

export function getDate(date: DateInput, pattern: DateFormats): string | null {
  if (date == null) {
    return null;
  }

  const d = dayjs(date);

  if (!d.isValid()) {
    return null;
  }

  return d.format(pattern);
}
