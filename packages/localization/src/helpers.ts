import { EN } from './config/languages'

const publicUrl = 'https://locales.pancakeswap.finance'

export const LS_KEY = 'pancakeswap_language'

export const fetchLocale = async (locale: string) => {
  const response = await fetch(`${publicUrl}/${locale}.json`)
  if (response.ok) {
    const data = await response.json()
    console.log(data)
    return data
  }

  console.error(`API: Failed to fetch locale ${locale}`, response.statusText)
  return null
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
