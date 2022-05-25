import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { translate, changeLanguageConfig } from '../localization';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as RNLocalize from "react-native-localize";
import { LanguageContext } from '../context/language.context';

const WelcomeScreen: React.FC = () => {
  // changeLanguageConfig();
  changeLanguageConfig("fr")
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'Sinhala', value: 'si' },
  ]);
  // const [language, setLanguage] = useState("");
  // const [language, setLanguage] =  (LanguageContext);
  const { userLanguage } = useContext(LanguageContext);
  const isMounted = useRef(true)
  useEffect(() => {
    // if (userLanguage) {
    console.log("lan " + userLanguage.lan)
    changeLanguageConfig(userLanguage.lan ?? "en");
    // }
  }, [userLanguage]);

  const setAppLanguage = (lan: string) => {
    userLanguage.lan = lan;
    console.log(userLanguage.lan)
    changeLanguageConfig(lan)

  };

  return (

    <View style={styles.container} >
      <Text
        style={[
          styles.sectionTitle
        ]}>
        Please select your language
      </Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={item => setAppLanguage(item.value as string)}
      />
      <Text style={styles.welcomeText} >
        {translate("welcome")}
      </Text>
    </View>

  )
}
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black'
  },
  welcomeText: {
    fontSize: 16,
    color: 'black'
  }
})
