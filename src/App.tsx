import { App as AntApp, ConfigProvider } from 'antd'
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
      <AntApp>
        <HomePage />
      </AntApp>
    </ConfigProvider>
  )
}

export default App
