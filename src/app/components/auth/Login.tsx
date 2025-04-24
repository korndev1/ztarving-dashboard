// src/app/components/auth/LoginClient.tsx

'use client'

import { useTranslation } from 'react-i18next'
import ChangeLanguage from '@/app/components/ChangeLanguage'
import { Colors } from '@/Constant/Colors'
import { useRouter } from 'next/navigation'

export default function LoginClient() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleLogin = async() => {
    router.push('/users')
  }

  return (
    <div className="bg-white h-screen flex justify-center items-center flex-col">
      <p style={{ color: Colors.primary }} className="text-[100px]">
        {t('login')}
      </p>
      <ChangeLanguage />
      <button onClick={()=>handleLogin()}>
      {t('login')}
      </button>
    </div>
  )
}
