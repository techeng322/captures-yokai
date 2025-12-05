import type { Metadata } from 'next'
import { Providers } from './providers'
import '../shared/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Yokai Monitoring Dashboard',
  description: 'Real-time monitoring of spiritual energy anomalies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

