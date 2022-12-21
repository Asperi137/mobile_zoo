import FormConnect from 'components/ui/FormConnect/FormConnect'
import { UserContext } from 'lib/UserContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export default function Index () {
  return (
    <div>
      <FormConnect />
    </div>
  )
}
