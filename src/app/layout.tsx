// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Providers from './provider'
import { promptFont } from './fonts'

export const metadata = {
  title:"zTarving Dashboard",
  description:"Dashboard for zTarving Application"
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th" className={promptFont.variable}>
      
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
