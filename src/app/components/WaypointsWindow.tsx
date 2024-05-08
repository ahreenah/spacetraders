import {Button} from "@mantine/core"
import {useAcceptContractMutation, useGetContractsQuery, useGetSystemWaypointsQuery, useGetWaypointQuery} from "../api"
import DraggableWindow from "./DraggableWindow"
import {useState} from "react"
import {Form, useForm} from "../../lib/form"
import {TextField} from "../../lib/TextField"
import Waypoint from "./Waypoint"
import {Select} from "../../lib/select"
import {traits, waypointTypes} from "../../consts"
import {useWaypoints} from "../context/waypoints"

export default function WaypointsWindow() {
  const {handle, data, errors} = useForm({})
  const {data: waypoints, isError} = useGetSystemWaypointsQuery({
    system: data.system,
    trait: data.trait,
    type: data.type
  }, {
    skip: !data.system// || !data.traits
  })
  const [shown, setShown] = useState([])
  const [contextWaypoints, setContextWaypoints] = useWaypoints()
  const showOnMap = () => {
    setContextWaypoints(waypoints?.data)
  }
  return <>
    <DraggableWindow width={800} height={360} title={'waypoints'}>
      {/*JSON.stringify(contracts)*/}
      <Form handle={handle}>
        <div className="search-filters">
          <div className="long">
            <TextField name='system' label='system' />
          </div>
          <Select label='trait' options={traits} name='trait' />
          <Select label='type' options={waypointTypes} name='type' />
        </div>
        <Button onClick={showOnMap}>show</Button>
      </Form>
      {isError
        ? 'Not found'
        :
        waypoints?.data.map(({
          symbol, type, x, y
        }) => (
          <div className="contract" onClick={() => {
            setShown(v => [...v, {
              systemSymbol: symbol.split('-')[0] + '-' + symbol.split('-')[1],
              waypointSymbol: symbol
            }])
          }}>
            {symbol}({type})
            x:{x} y:{y}
          </div>
        )
        )}
    </DraggableWindow>
    {shown.map(i => (
      <Waypoint systemSymbol={i.systemSymbol} waypointSymbol={i.waypointSymbol} />
    ))}
  </>
}
