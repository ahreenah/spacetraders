import {Button} from "@mantine/core";
import {useGetAgentQuery, useGetWaypointQuery} from "../api";
import ContractsWindow from "../components/ContractsWindow";
import DraggableWindow from "../components/DraggableWindow";
import Waypoint from "../components/Waypoint";
import WaypointsWindow from "../components/WaypointsWindow";
import {useState} from "react";
import useAuthRequired from "../hooks/useAuthRequired";
import ShipsWindow from "../components/ShipsWindow";
import SceneView from "../components/SceneView";
import {WaypointsContext} from "../context/waypoints";

export default function Main() {
  useAuthRequired()
  const {data: agent, isLoading: isLoadingAgent} = useGetAgentQuery({})
  let hqSystemSymbol, hqWaypointSymbol;
  const [contractsShown, setContractsShown] = useState(false);
  const [shipsShown, setShipsShown] = useState(false)
  if (!isLoadingAgent) {
    hqSystemSymbol = agent.data.headquarters.split('-')[0] + '-' + agent.data.headquarters.split('-')[1]
    hqWaypointSymbol = agent.data.headquarters// + '-' + agent.data.headquarters.split('-')[2]
  }
  const [waypoints, setWaypoints] = useState([])

  return <>
    <WaypointsContext.Provider value={[waypoints, setWaypoints]}>
    <header className='game-header'>
      <div className='right-buttons'>
        {agent && <>
          <Button onClick={() => setShipsShown(true)}>
            ships: {agent.data.shipCount}
          </Button>
          hq: {agent.data.headquarters}{' '}
          credits:{agent.data.credits}
        </>
        }
        <Button onClick={() => {setContractsShown(true)}}>Contracts</Button>
      </div>
    </header>
    Welcome
    {JSON.stringify(agent)}
    <Waypoint systemSymbol={hqSystemSymbol} waypointSymbol={hqWaypointSymbol} />
    <WaypointsWindow />
    {shipsShown && <ShipsWindow />}
    {contractsShown && <ContractsWindow />}
    <SceneView />

    </WaypointsContext.Provider>
  </>
}
