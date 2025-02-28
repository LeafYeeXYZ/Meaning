import { create } from 'zustand'
import OpenAI from 'openai'

type AIState = {
  ai: OpenAI | null
  model: string
  endpoint: string
  apiKey: string
  setModel: (model: string) => void
  setEndpoint: (endpoint: string) => void
  setApiKey: (apiKey: string) => void
}

let timer: ReturnType<typeof setTimeout> | null = null
const DELAY = 1000

const defaultModel = localStorage.getItem('aiModel') ?? 'deepseek-chat'
const defaultEndpoint =
  localStorage.getItem('aiEndpoint') ?? 'https://api.deepseek.com/v1'
const defaultApiKey = localStorage.getItem('aiApiKey') ?? ''

async function getAI(
  endpoint: string,
  apiKey: string,
  model: string,
): Promise<OpenAI | null> {
  try {
    if (!endpoint || !apiKey || !model) {
      return null
    }
    const ai = new OpenAI({
      baseURL: endpoint,
      apiKey,
      dangerouslyAllowBrowser: true,
    })
    const models = (await ai.models.list()).data
    if (!models.some((m) => m.id === model)) {
      return null
    }
    return ai
  } catch {
    return null
  }
}

export const useAssistant = create<AIState>()((set, get) => {
  getAI(defaultEndpoint, defaultApiKey, defaultModel)
    .then((ai) => {
      set({ ai })
    })
    .catch(() => {})
  return {
    ai: null,
    model: defaultModel,
    endpoint: defaultEndpoint,
    apiKey: defaultApiKey,
    setModel: (model) => {
      localStorage.setItem('aiModel', model)
      set({ model })
      if (timer) {
        clearTimeout(timer)
      }
      const { endpoint, apiKey } = get()
      timer = setTimeout(async () => {
        const ai = await getAI(endpoint, apiKey, model)
        set({ ai })
      }, DELAY)
    },
    setEndpoint: (endpoint) => {
      localStorage.setItem('aiEndpoint', endpoint)
      set({ endpoint })
      if (timer) {
        clearTimeout(timer)
      }
      const { apiKey, model } = get()
      timer = setTimeout(async () => {
        const ai = await getAI(endpoint, apiKey, model)
        set({ ai })
      }, DELAY)
    },
    setApiKey: (apiKey) => {
      localStorage.setItem('aiApiKey', apiKey)
      set({ apiKey })
      if (timer) {
        clearTimeout(timer)
      }
      const { endpoint, model } = get()
      timer = setTimeout(async () => {
        const ai = await getAI(endpoint, apiKey, model)
        set({ ai })
      }, DELAY)
    },
  }
})
