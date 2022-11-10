import '../styles/globals.css'
import { AppProps } from 'next/app'
//composant
import Layout from '../../backzoo/components/ui/Layout/Layout';


export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}