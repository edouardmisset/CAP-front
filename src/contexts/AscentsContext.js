import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import API from '../APIClient'

// Create a context for the ascent data
export const AscentsContext = createContext()

export const AscentsContextProvider = ({ children }) => {
  const [ascentList, setAscentList] = useState([])
  const [filteredAscentList, setFilteredAscentList] = useState([])

  const { addToast } = useToasts()

  // Fetch the user's ascent list
  useEffect(() => {
    const source = axios.CancelToken.source()
    // Get all the ascents
    API.get(`/ascents`)
      .then(({ data }) => setAscentList(data))
      .catch((err) => {
        addToast('An error occured while fetching your ascent list.', {
          appearance: 'warning',
        })
        window.console.error(err)
      })
    // Cancels the request when the component unmounts
    return () => {
      if (source) {
        source.cancel('request cancelled')
      }
    }
  }, [])

  return (
    <AscentsContext.Provider
      value={{
        ascentList,
        filteredAscentList,
        setFilteredAscentList,
      }}
    >
      {children}
    </AscentsContext.Provider>
  )
}
