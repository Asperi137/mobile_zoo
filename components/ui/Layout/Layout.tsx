import Header from 'components/ui/Header/Header'
import Footer from 'components/ui/Footer/Footer'
import { ReactElement } from 'react'

export default function Layout (props: {
  children: ReactElement | null | undefined
}) {
  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ flexGrow: 1 }}>
        <div className='container'>{props.children}</div>
      </div>
      <Footer />
    </div>
  )
}
