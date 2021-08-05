import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import API from '../APIClient'

export const AscentsContext = createContext()

export const AscentsContextProvider = ({ children }) => {
  const [ascentList, setAscentList] = useState([])
  const [filteredAscentList, setFilteredAscentList] = useState([])

  // Fetch the user's ascent list
  useEffect(() => {
    const source = axios.CancelToken.source()
    // Get all the ascents
    API.get(`/ascents`)
      .then(({ data }) => setAscentList(data))
      .catch(window.console.error)
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
