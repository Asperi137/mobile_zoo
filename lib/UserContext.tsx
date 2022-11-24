import { createContext, Dispatch, SetStateAction } from 'react'

export interface AppContextInterface {
  role: string
  setRole: Dispatch<SetStateAction<string>>
}
export const UserContext = createContext<AppContextInterface>(
  {} as AppContextInterface
)
