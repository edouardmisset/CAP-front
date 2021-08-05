import { ToastProvider } from 'react-toast-notifications'
import { AscentsContextProvider } from './contexts/AscentsContext'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

export default function App() {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-right">
      {/* <CurrentUserContextProvider> */}
      <AscentsContextProvider>
        <Header />
        <Main />
        <Footer />
      </AscentsContextProvider>
      {/* </CurrentUserContextProvider> */}
    </ToastProvider>
  )
}
