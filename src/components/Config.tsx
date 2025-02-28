import { useAssistant } from '../hooks/useAI.ts'
import { Input } from 'antd'
import { Loading3QuartersOutlined, SmileOutlined } from '@ant-design/icons'

export default function Config() {
  const { ai, model, apiKey, endpoint, setModel, setApiKey, setEndpoint } =
    useAssistant()
  return (
    <div className='w-full h-full overflow-hidden flex flex-col items-center justify-center gap-4 px-4'>
      <div className='flex flex-col gap-2 w-full'>
        <div className='text-sm'>AI 模型 API 端点</div>
        <div>
          <Input
            placeholder='API 端点'
            defaultValue={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='text-sm'>AI 模型 API 密钥</div>
        <div>
          <Input.Password
            placeholder='API 密钥'
            defaultValue={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='text-sm'>AI 模型 ID</div>
        <div>
          <Input
            placeholder='模型 ID'
            defaultValue={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <div className='text-sm'>AI 模型状态</div>
        <div
          style={{ color: ai ? 'green' : 'gray' }}
          className='border py-[0.3rem] px-2 rounded-md flex items-center justify-center'
        >
          {ai ? (
            <span>
              <SmileOutlined /> 可用
            </span>
          ) : (
            <span>
              <Loading3QuartersOutlined spin /> 加载中
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
