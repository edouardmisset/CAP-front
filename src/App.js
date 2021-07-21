import { ToastProvider } from 'react-toast-notifications'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

export default function App() {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={3000}
      placement="bottom-center"
    >
      {/* <CurrentUserContextProvider> */}
      <Header />
      <Main />
      <Footer />
      {/* </CurrentUserContextProvider> */}
    </ToastProvider>
  )
}
