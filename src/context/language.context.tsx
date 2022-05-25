import React, { useState, createContext, useContext, useEffect } from 'react';
import { changeLanguageConfig, translationGetters } from '../localization';
import en from '../translations/en.json';
import fr from '../translations/fr.json';
import si from '../translations/si.json'

const LANGUAGES = {
    "en": "en",
    "fr": "fr",
    "si": "si"
};


// export const LanguageContext = createContext({
//     userLanguage: 'en',
//     setLanguage: LANGUAGES.en,
// });
export interface ILanguageContext {
    userLanguage: {
        lan?: string;
    };
}

export const LanguageContext = React.createContext<ILanguageContext>({
    userLanguage: {},
});
interface Props {
    children: React.ReactNode
}
// it provides the language context to app
export const LanguageProvider: React.FC<Props> = ({ children }) => {
    const [userLanguage, setUserLanguage] = useState<{ lan?: string }>({});
    
    const provider = {
        userLanguage,
        setLanguage: 'si',
        userLanguageChange: (lang: string) => {
            console.log("provider lang " + lang)
            // setUserLanguage(lang);
            changeLanguageConfig(lang);
            //   window.localStorage.setItem('rcml-lang', newLanguage);
        }
    };

    return (
        <LanguageContext.Provider value={{ userLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};