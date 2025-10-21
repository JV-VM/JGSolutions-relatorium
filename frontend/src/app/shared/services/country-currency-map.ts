import { Injectable } from '@angular/core';

export interface CountryCurrencyConfig {
  locale: string;
  currency: string;
  dateLocale?: string;
  dateFormat?: string; // 🔹 Added format pattern
}

@Injectable({ providedIn: 'root' })
export class CountryCurrencyMap {
  private readonly map: Record<string, CountryCurrencyConfig> = {
    BR: { locale: 'pt-BR', currency: 'BRL', dateLocale: 'pt-BR', dateFormat: 'dd/mm/yyyy' },
    US: { locale: 'en-US', currency: 'USD', dateLocale: 'en-US', dateFormat: 'mm/dd/yyyy' },
    AR: { locale: 'es-AR', currency: 'ARS', dateLocale: 'es-AR', dateFormat: 'dd/mm/yyyy' },
    CL: { locale: 'es-CL', currency: 'CLP', dateLocale: 'es-CL', dateFormat: 'dd/mm/yyyy' },
    MX: { locale: 'es-MX', currency: 'MXN', dateLocale: 'es-MX', dateFormat: 'dd/mm/yyyy' },
    PT: { locale: 'pt-PT', currency: 'EUR', dateLocale: 'pt-PT', dateFormat: 'dd/mm/yyyy' },
    CA: { locale: 'en-CA', currency: 'CAD', dateLocale: 'en-CA', dateFormat: 'yyyy-mm-dd' },
    GB: { locale: 'en-GB', currency: 'GBP', dateLocale: 'en-GB', dateFormat: 'dd/mm/yyyy' },
    FR: { locale: 'fr-FR', currency: 'EUR', dateLocale: 'fr-FR', dateFormat: 'dd/mm/yyyy' },
    DE: { locale: 'de-DE', currency: 'EUR', dateLocale: 'de-DE', dateFormat: 'dd.mm.yyyy' },
    IT: { locale: 'it-IT', currency: 'EUR', dateLocale: 'it-IT', dateFormat: 'dd/mm/yyyy' },
    ES: { locale: 'es-ES', currency: 'EUR', dateLocale: 'es-ES', dateFormat: 'dd/mm/yyyy' },
    AU: { locale: 'en-AU', currency: 'AUD', dateLocale: 'en-AU', dateFormat: 'dd/mm/yyyy' },
    IN: { locale: 'hi-IN', currency: 'INR', dateLocale: 'hi-IN', dateFormat: 'dd/mm/yyyy' },
    JP: { locale: 'ja-JP', currency: 'JPY', dateLocale: 'ja-JP', dateFormat: 'yyyy/mm/dd' },
    CN: { locale: 'zh-CN', currency: 'CNY', dateLocale: 'zh-CN', dateFormat: 'yyyy-mm-dd' },
    RU: { locale: 'ru-RU', currency: 'RUB', dateLocale: 'ru-RU', dateFormat: 'dd.mm.yyyy' },
    ZA: { locale: 'en-ZA', currency: 'ZAR', dateLocale: 'en-ZA', dateFormat: 'yyyy/mm/dd' },
    KR: { locale: 'ko-KR', currency: 'KRW', dateLocale: 'ko-KR', dateFormat: 'yyyy.mm.dd' },
    SE: { locale: 'sv-SE', currency: 'SEK', dateLocale: 'sv-SE', dateFormat: 'yyyy-mm-dd' },
    NO: { locale: 'nb-NO', currency: 'NOK', dateLocale: 'nb-NO', dateFormat: 'dd.mm.yyyy' },
    DK: { locale: 'da-DK', currency: 'DKK', dateLocale: 'da-DK', dateFormat: 'dd-mm-yyyy' },
    FI: { locale: 'fi-FI', currency: 'EUR', dateLocale: 'fi-FI', dateFormat: 'dd.mm.yyyy' },
    BE: { locale: 'nl-BE', currency: 'EUR', dateLocale: 'nl-BE', dateFormat: 'dd/mm/yyyy' },
    NL: { locale: 'nl-NL', currency: 'EUR', dateLocale: 'nl-NL', dateFormat: 'dd-mm-yyyy' },
    CH: { locale: 'de-CH', currency: 'CHF', dateLocale: 'de-CH', dateFormat: 'dd.mm.yyyy' },
    AT: { locale: 'de-AT', currency: 'EUR', dateLocale: 'de-AT', dateFormat: 'dd.mm.yyyy' },
    IE: { locale: 'en-IE', currency: 'EUR', dateLocale: 'en-IE', dateFormat: 'dd/mm/yyyy' },
    NZ: { locale: 'en-NZ', currency: 'NZD', dateLocale: 'en-NZ', dateFormat: 'dd/mm/yyyy' },
    SG: { locale: 'en-SG', currency: 'SGD', dateLocale: 'en-SG', dateFormat: 'dd/mm/yyyy' },
    MY: { locale: 'ms-MY', currency: 'MYR', dateLocale: 'ms-MY', dateFormat: 'dd/mm/yyyy' },
    TH: { locale: 'th-TH', currency: 'THB', dateLocale: 'th-TH', dateFormat: 'dd/mm/yyyy' },
    ID: { locale: 'id-ID', currency: 'IDR', dateLocale: 'id-ID', dateFormat: 'dd/mm/yyyy' },
    VN: { locale: 'vi-VN', currency: 'VND', dateLocale: 'vi-VN', dateFormat: 'dd/mm/yyyy' },
    PH: { locale: 'fil-PH', currency: 'PHP', dateLocale: 'fil-PH', dateFormat: 'mm/dd/yyyy' },
    PK: { locale: 'ur-PK', currency: 'PKR', dateLocale: 'ur-PK', dateFormat: 'dd/mm/yyyy' },
  };

  /** Returns all configurations */
  getMap(): Record<string, CountryCurrencyConfig> {
    return this.map;
  }

  /** Returns configuration for a specific country (fallback to US) */
  getConfig(code: string): CountryCurrencyConfig {
    return this.map[code] || this.map['US'];
  }
}
