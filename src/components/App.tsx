import { ConfigProvider, message } from 'antd'
import { TabBar } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useStates } from '../hooks/useStates.ts'
import { LIGHT_THEME, DARK_THEME } from '../lib/theme.ts'
import Chat from './Chat.tsx'
import Config from './Config.tsx'
import Memo from './Memo.tsx'
import { CommentOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons'

export default function App() {
  // 全局状态
  const { isDarkMode, setIsDarkMode, setMessageApi } = useStates()

  // 消息实例
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    setMessageApi(messageApi)
    return () => setMessageApi(null)
  }, [messageApi, setMessageApi])

  // 动态设置主题
  useEffect(() => {
    const getIsDarkMode = () =>
      matchMedia('(prefers-color-scheme: dark)').matches
    const subIsDarkMode = () => setIsDarkMode(getIsDarkMode())
    matchMedia('(prefers-color-scheme: dark)').addEventListener(
      'change',
      subIsDarkMode,
    )
    return () =>
      matchMedia('(prefers-color-scheme: dark)').removeEventListener(
        'change',
        subIsDarkMode,
      )
  }, [setIsDarkMode])

  // 导航栏
  const [page, setPage] = useState<string>('chat')
  const tabs = [
    { key: 'memo', icon: <BookOutlined style={{ fontSize: '1.3rem' }} />, title: '记忆' },
    { key: 'chat', icon: <CommentOutlined style={{ fontSize: '1.3rem' }} />, title: '聊天' },
    { key: 'config', icon: <SettingOutlined style={{ fontSize: '1.3rem' }} />, title: '设置' },
  ]

  return (
    <ConfigProvider theme={isDarkMode ? DARK_THEME : LIGHT_THEME}>
      <main className='w-dvw h-dvh max-w-md mx-auto overflow-hidden flex flex-col justify-between items-center text-red-950 dark:text-white shadow-md'>
        <div className='w-full h-full overflow-hidden bg-white dark:bg-gray-950'>
          {page === 'chat' && <Chat />}
          {page === 'memo' && <Memo />}
          {page === 'config' && <Config />}
        </div>
        <div className='w-full pt-2 pb-1 bg-gray-50 dark:bg-gray-900'>
          <TabBar
            activeKey={page}
            onChange={setPage}
          >
            {tabs.map((tab) => (
              <TabBar.Item
                key={tab.key}
                icon={tab.icon}
                title={tab.title}
              />
            ))}
          </TabBar>
        </div>
      </main>
      {contextHolder}
    </ConfigProvider>
  )
}
