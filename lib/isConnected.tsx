import { useContext } from 'react'
import { UserContext } from 'lib/UserContext'
import User from 'Types/User'

export default function IsConnected (user?: User) {
  const { role, setRole } = useContext(UserContext)

  async function connection (role: string) {
    setRole(role)
  }

  if (user) connection(user.role)

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
