import { useEffect, useState } from "react"
import React from 'react'
const useRandomString = (defaultValue: string, min: number, max: number) => {
  const [value, setValue] = useState("¥ " + defaultValue)
  useEffect(() => {
    const timer = setInterval(() => {
      getRandomString()
    }, 500);
    return (() => clearInterval(timer))
  }, [])
  const getRandomString = () => {
    const num = (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(2)
    setValue("¥ " + num)
  }
  return value
}
export default useRandomString