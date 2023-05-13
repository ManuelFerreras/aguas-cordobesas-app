import './globals.css'
import './normalize.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aguas Cordobesas Scrapper',
  description:
    'Aplicacion para poder hacer querys a aguas cordobesas sin tener que manualmente ingresar al sitio.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
