import { useContext } from 'react'
import { UserContext } from 'lib/UserContext'
import User from 'Types/User'

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
