import {createContext, useContext, useState} from "react";

const WidowsContext = createContext({})

export const useWindowsContext = () => useContext(WidowsContext)

export const WindowsContextProvider = ({children}) => {
  const [windows, setWindows] = useState([])
  const moveUp = (id) => {
    setWindows(old => [...old.filter(i => i != id), id])
  }
  return (
    <WidowsContext.Provider value={{windows, moveUp}}>
      {children}
    </WidowsContext.Provider>
  )
}
