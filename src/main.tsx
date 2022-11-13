import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

const colorTheme = {
  colors: {
    blue: '#272c48',
    orange: '#ed5a14',
    black: '#272c48',
    cyan: '#00fcf7',
    red: '#c22d13',
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={colorTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
