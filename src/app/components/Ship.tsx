import {Button} from "@mantine/core";
import {useDockShipMutation, useGetAgentQuery, useGetShipQuery, useGetWaypointQuery, useOrbitShipMutation} from "../api";
import DraggableWindow from "./DraggableWindow";
import {useCallback, useState} from "react";
import ShipyardWindow from "./ShipyardWindow";

function ShipStatus({shipId, status}) {
  const [orbitShip] = useOrbitShipMutation()
  const [dockShip] = useDockShipMutation()
  
  const orbit = useCallback(() => {
    orbitShip({symbol: shipId})
  }, [orbitShip])
  
  const dock = useCallback(() => {
    dockShip({symbol: shipId})
  }, [orbitShip])
  
  return (
    <div className='orbitals with-action'>
      <div className="title">
        status
      </div>
      <div className="items">
        <div>{status}</div>
      </div>
      {status == 'DOCKED' && <Button onClick={orbit}>orbit</Button>}
      {status == 'IN_ORBIT' && <Button onClick={dock}>dock</Button>}
    </div>
  )
}

export default function Ship({shipId}) {
  console.log('wp:', {
    shipId,
  })
  const {isLoading, data: ship} = useGetShipQuery({symbol: shipId})
  if (isLoading || !ship) return <></>
  const {
    symbol,
    registration: {name, factionSymbol, role},
    nav
  } = ship.data;
  return <>
    <DraggableWindow width={400} height={360} title={'ship'}>

      <div className='info-view'>
        <div className='content'>

          Ship {symbol} <br />

          <div className='orbitals'>
            <div className="title">
              name
            </div>
            <div className="items">
              <div>{name}</div>
            </div>
          </div>

          <div className='orbitals'>
            <div className="title">
              faction
            </div>
            <div className="items">
              <div>{factionSymbol}</div>
            </div>
          </div>

          <ShipStatus shipId={shipId} status={nav.status} />

          {name} {factionSymbol}
        </div>
      </div>
    </DraggableWindow>
  </>
}
