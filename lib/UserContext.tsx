import { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface AppContextInterface {
  role: string
  setRole: Dispatch<SetStateAction<string>>
}
export const UserContext = createContext<AppContextInterface>(
  {} as AppContextInterface
)
