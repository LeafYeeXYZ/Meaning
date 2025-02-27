import { create } from 'zustand'
import type { MessageInstance } from 'antd/es/message/interface'

type GlobalStates = {
  isDarkMode: boolean
  setIsDarkMode: (isDarkMode: boolean) => void
  messageApi: MessageInstance | null
  setMessageApi: (messageApi: MessageInstance | null) => void
}

export const useStates = create<GlobalStates>()((setState) => ({
  isDarkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  setIsDarkMode: (isDarkMode) => setState({ isDarkMode }),
  messageApi: null,
  setMessageApi: (messageApi) => setState({ messageApi }),
}))
