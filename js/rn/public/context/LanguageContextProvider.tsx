import React, { createContext, useState, useContext, useEffect } from 'react'
import { OCHelper } from '../define/OCHelper/OCHelper'
import {Platform, PlatformAndroidStatic, PlatformIOSStatic} from "react-native";
const LanguageContext = createContext({
  currcentLanguagePackage: undefined,
})
export const LanguageContextProvider = ({ children }) => {
  const [languagePackage, setLanguagePackage] = useState()
  const init = async () => {
    let languageObject = null;
    switch (Platform.OS) {
      case 'ios':
        languageObject = await OCHelper.call("LanguageHelper.shared.kvs")
        break;
      case 'android':
        //TODO Android

        break;
    }
    console.log(JSON.stringify(languageObject))
    setLanguagePackage(languageObject)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <LanguageContext.Provider value={{ currcentLanguagePackage: languagePackage }}>
      {children}
    </LanguageContext.Provider>
  )
}
export const useLanguageContext = () => {
  const value = useContext(LanguageContext)
  return value
}
