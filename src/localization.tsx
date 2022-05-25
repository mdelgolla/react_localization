import i18n from 'i18n-js';
import memoize from 'lodash';
import React, { createContext, useState } from 'react';
import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import en from '../src/translations/en.json';
import fr from '../src/translations/fr.json';
import si from '../src/translations/si.json'

export const translationGetters: any = {
  "en": () => require('../src/translations/en.json'),
  "si": () => require('../src/translations/si.json'),
  "fr": () => require('../src/translations/fr.json'),
};

export const translate = memoize.memoize(
  (key, config?) => i18n.t(key, config),
  (key, config?) => (config ? key + JSON.stringify(config) : key),
);
export const LANGUAGES = {
  en,
  si,
  fr
};

const LANG_CODES = Object.keys(LANGUAGES);

export const changeLanguageConfig = (lan?: string) => {
  // fallback if no available language fits
  const fallback = { languageTag: lan??"si", isRTL: false };

  const { languageTag, isRTL } = fallback;
    // RNLocalize.findBestAvailableLanguage(LANG_CODES) ||
   
  translate.cache.clear;
  // update layout direction
  I18nManager.forceRTL(isRTL);

  // set i18n-js config
  console.log("language " + languageTag)
  i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  i18n.locale = languageTag;
};



