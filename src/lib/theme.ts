import { type ThemeConfig, theme } from 'antd'

export const LIGHT_THEME: ThemeConfig = {
  token: {
    colorPrimary: '#ff8080',
    colorText: '#4c0519',
  },
}

export const DARK_THEME: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#ff8080',
    colorText: '#ffffff',
  },
}
