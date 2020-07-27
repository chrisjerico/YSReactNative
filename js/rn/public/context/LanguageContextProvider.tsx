import React, { createContext, useState, useContext, useEffect } from 'react'
import { OCHelper } from '../define/OCHelper/OCHelper'
const LanguageContext = createContext({
  currcentLanguagePackage: undefined,
})
export const LanguageContextProvider = ({ children }) => {
  const [languagePackage, setLanguagePackage] = useState()
  const init = async () => {
    const languageObject = await OCHelper.call("LanguageHelper.shared.kvs")
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