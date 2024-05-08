import {createContext, useContext} from "react";

export const WaypointsContext = createContext({})

export const useWaypoints = () => useContext(WaypointsContext)
