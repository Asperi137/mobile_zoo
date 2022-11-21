import 'styles/globals.css'
import { AppProps } from 'next/app'
import Layout from 'components/ui/Layout/Layout'
import { UserContext } from 'lib/UserContext'
import { useState } from 'react'
import IsConnected from 'lib/isConnected'

export default function App ({ Component, pageProps }: AppProps) {
  const [role, setRole] = useState(IsConnected())
  return (
    <UserContext.Provider value={{ role, setRole }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}
