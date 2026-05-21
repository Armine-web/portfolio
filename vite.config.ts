import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const didApiKey = env.VITE_DID_API_KEY ?? ''
  const telegramBotToken = env.VITE_TELEGRAM_BOT_TOKEN ?? ''

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/telegram/bot': {
          target: 'https://api.telegram.org',
          changeOrigin: true,
          rewrite: (path) => {
            const endpoint = path.replace(/^\/api\/telegram\/bot/, '') || '/sendMessage'
            return `/bot${telegramBotToken}${endpoint}`
          },
        },
        '/api/d-id': {
          target: 'https://api.d-id.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/d-id/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (didApiKey) {
                const token = Buffer.from(`${didApiKey}:`, 'utf8').toString('base64')
                proxyReq.setHeader('Authorization', `Basic ${token}`)
              }
            })
          },
        },
      },
    },
  }
})
