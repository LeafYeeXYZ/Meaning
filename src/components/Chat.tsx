import { useAssistant } from '../hooks/useAI.ts'
import { DisconnectOutlined } from '@ant-design/icons'

export default function Chat() {
  const { ai } = useAssistant()
  return (
    <div className='w-full h-full overflow-hidden flex flex-col items-center justify-center gap-4 px-4'>
      {ai ? (
        <div className='flex flex-col gap-4 w-full items-center justify-center'>
          开发中
        </div>
      ) : (
        <div className='flex flex-col gap-2 w-full items-center justify-center'>
          <div className='text-lg'>
            <DisconnectOutlined /> AI 模型不可用
          </div>
          <div>请先到设置中完成配置</div>
        </div>
      )}
    </div>
  )
}
