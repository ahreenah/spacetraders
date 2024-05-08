import {Button} from "@mantine/core";
import {useGetAgentQuery, useGetWaypointQuery} from "../api";
import DraggableWindow from "./DraggableWindow";
import {useState} from "react";
import ShipyardWindow from "./ShipyardWindow";

export default function Waypoint({systemSymbol, waypointSymbol}) {
  console.log('wp:', {
    systemSymbol,
    waypointSymbol
  })
  const {data: waypoint, isLoading} = useGetWaypointQuery({
    systemSymbol,
    waypointSymbol
  })
  const [viewingTraits, setViewingTraits] = useState([])
  if (isLoading || !waypoint) return <></>
  const data = waypoint.data;
  const traits2 = ['SHIPYARD']
  return <>
    <DraggableWindow width={400} height={360} title={'waypoint'}>

      <div className='info-view'>
        <div className='content'>
          <div className='props'>
            <div>{data.type}</div>
            <div>{data.symbol}</div>
            <div>x: {data.x}, y: {data.y}</div>
            <div className="submitted">submitted by {data.chart.submittedBy} on {data.chart.submittedOn}</div>
          </div>
          <div className="orbitals">
            <div className='title'>
              Orbitals:
            </div>
            <div className='items'>
              {data.orbitals.map(i => <div>{i.symbol}</div>)}
            </div>
          </div>
          <div className='construction'>
            {data.isUnderConstruction ? 'Under construction' : 'not under construction'}
          </div>
          <div className="traits">
            <h3>traits</h3>
            {data.traits.map(({symbol, name, description}) => (
              <div className='trait'>
                <h4 className='trait-title'>
                  {name}
                  {traits2.indexOf(symbol) != -1 && (
                    <Button onClick={() => setViewingTraits(old => [
                      ...old.filter(i => i != symbol),
                      symbol
                    ])}>
                      view
                    </Button>
                  )}
                </h4>
                <div className='trait-description'>{description}</div>
              </div>
            ))}
          </div>
          {/*modifiers not shown*/}
        </div>
      </div>
    </DraggableWindow>
    {viewingTraits.indexOf('SHIPYARD') != -1 && (
      <ShipyardWindow systemSymbol={systemSymbol} waypointSymbol={waypointSymbol} />
    )}
  </>
}
