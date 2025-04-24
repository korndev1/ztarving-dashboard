'use client'

import { Colors } from '@/Constant/Colors'
import { useTranslation } from 'react-i18next'

export default function ChangeLanguage() {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div>
      <button style={{color:Colors.black}} onClick={() => changeLanguage('en')}>English</button>
      <button style={{color:Colors.black}} onClick={() => changeLanguage('th')}>ไทย</button>
    </div>
  )
}
