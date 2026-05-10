import { ConfigProvider } from 'antd'
import { HomePage } from './pages/home/components/HomePage/index'

const portfolioTheme = {
  token: {
    colorPrimary: '#ae682e',
    colorLink: '#d4995c',
    colorInfo: '#ae682e',
  },
}

function App() {
  return (
    <ConfigProvider theme={portfolioTheme}>
      <HomePage />
    </ConfigProvider>
  )
}

export default App
