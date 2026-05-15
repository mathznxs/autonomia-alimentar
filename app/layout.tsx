import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/cart-provider'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Autonomia Alimentar | Alimentacao Saudavel para Idosos',
  description: 'Refeicoes nutritivas e personalizadas entregues na sua casa. Promovemos independencia, seguranca alimentar e qualidade de vida para idosos.',
  keywords: ['alimentacao idosos', 'refeicoes saudaveis', 'nutricao terceira idade', 'comida para idosos', 'delivery alimentacao'],
  openGraph: {
    title: 'Autonomia Alimentar',
    description: 'Alimentacao saudavel e pratica para a terceira idade',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <CartProvider>
          {children}
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
