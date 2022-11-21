import { useContext } from 'react'
import { UserContext } from 'lib/UserContext'

const API_adr = process.env.API_adr

export default function IsConnected () {
  const { role } = useContext(UserContext)
  if (
    role === 'admin' ||
    role === 'veterinaire' ||
    role === 'soigneur' ||
    role === 'responssableZone'
  ) {
    return role
  }
  return ''
}
