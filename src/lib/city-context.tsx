'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

// Ukrainian cities for autocomplete
const ALL_CITIES = [
  'Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро',
  'Запоріжжя', 'Вінниця', 'Полтава', 'Чернігів', 'Черкаси',
  'Житомир', 'Суми', 'Рівне', 'Тернопіль', 'Івано-Франківськ',
  'Луцьк', 'Ужгород', 'Хмельницький', 'Кропивницький', 'Миколаїв',
  'Херсон', 'Чернівці', 'Біла Церква', 'Краматорськ', 'Кременчук',
  'Маріуполь', 'Мелітополь', 'Нікополь', 'Бердянськ', 'Камʼянське',
]

export const POPULAR_CITIES = ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро']

const STORAGE_KEY = 'alcoplace-city-v1'

export function searchCities(query: string): string[] {
  if (!query || query.length < 1) return []
  const q = query.toLowerCase()
  return ALL_CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 8)
}

interface CityContextType {
  city: string | null
  setCity: (city: string) => void
  clearCity: () => void
}

const CityContext = createContext<CityContextType>({
  city: null,
  setCity: () => {},
  clearCity: () => {},
})

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setCityState(saved)
  }, [])

  const setCity = useCallback((c: string) => {
    setCityState(c)
    localStorage.setItem(STORAGE_KEY, c)
  }, [])

  const clearCity = useCallback(() => {
    setCityState(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <CityContext.Provider value={{ city, setCity, clearCity }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  return useContext(CityContext)
}
