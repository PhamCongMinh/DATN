import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from '../store/store'
import '../styles/globals.css'
import '../styles/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <Provider store={store}>
      <Component key={router.asPath} {...pageProps} />
    </Provider>
  )
}
