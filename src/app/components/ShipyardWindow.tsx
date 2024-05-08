import {Button} from "@mantine/core"
import {useAcceptContractMutation, useGetContractsQuery, useGetSystemWaypointsQuery, useGetWaypointQuery, useGetWaypointShipyardQuery, usePurchaseShipMutation} from "../api"
import DraggableWindow from "./DraggableWindow"
import {useState} from "react"
import {Form, useForm} from "../../lib/form"
import {TextField} from "../../lib/TextField"
import Waypoint from "./Waypoint"
import {Select} from "../../lib/select"
import {traits} from "../../consts"

export default function ShipyardWindow({systemSymbol, waypointSymbol}) {
  const {handle, data, errors} = useForm({})
  const {data: shipyard, isError, isLoading} = useGetWaypointShipyardQuery({
    systemSymbol,
    waypointSymbol
  })
  const [purchaseShip] = usePurchaseShipMutation()
  if (isLoading) return <></>
  return <>
    <DraggableWindow width={400} height={360} title={'Shipyard'}>
      {shipyard?.data?.ships?.map(({type, name, purchasePrice, description}) => (
        <div className='contract'>
          <div className="title">
            <div className="left">
              <div>{name}</div>
              <div>{type}</div>
            </div>
            <Button onClick={() => {
              purchaseShip({
                shipType: type,
                waypointSymbol
              })
            }}>buy for{' '}{purchasePrice}</Button>
          </div>
          <div className="description">
            {description}
          </div>
        </div>
      ))}
    </DraggableWindow>
  </>
}
