export type Language = 'kl' | 'fr' | 'en';
export type Season = 'spring' | 'fall';

export interface SeasonContent {
  description: string[];
  bottomColumns?: string[];
}

export interface ContentStrings {
  tagline: string;
  spring: SeasonContent;
  fall: SeasonContent;
  location: string;
  locationLabel: string;
  contact: string;
  inquiriesLabel: string;
  season: string;
  seasonLabel: string;
  seasonFall: string;
  qimusseriarsuaqDefinition: string;
  weatherDefinition: string;
}

export interface ContentMap {
  kl: ContentStrings;
  fr: ContentStrings;
  en: ContentStrings;
}