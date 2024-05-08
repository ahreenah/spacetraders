
import {Button} from "@mantine/core"
import {useAcceptContractMutation, useGetContractsQuery, useGetShipsQuery} from "../api"
import DraggableWindow from "./DraggableWindow"
import {useCallback, useState} from "react"
import Ship from "./Ship"

export default function ShipsWindow() {
  const {data: contracts} = useGetShipsQuery({})
  const [accept] = useAcceptContractMutation()
  const [shown, setShown] = useState([])
  const show =  useCallback((v)=>{
    setShown(old=>[...old, v])
  },[setShown])
  if (!contracts) return <></>
  return <>
    <DraggableWindow width={400} height={360} title={'ships'}>
      {/*JSON.stringify(contracts)*/}
      {contracts.data.map(({
        symbol,
        crew,
        reactor,
        registration,
        engine,
        nav,
      }) => (
        <div className='ship-item' role='button' onClick={() => show(symbol)}>
          {symbol} ({registration.role})
          <div className="route">
            <div>
              <div className="">
                {nav.route.origin.symbol}
              </div>
              <div>
                ({nav.route.departureTime})
              </div>
            </div>
            <div className='arrow'>-{'>'}</div>
            <div>
              <div className="">
                {nav.route.destination.symbol}
              </div>
              <div>
                ({nav.route.arrival})
              </div>
            </div>
          </div>
          <div className="props">
            <div className="crew">
              <div>crew:</div>
              <div>
                <div>{crew.current} / {crew.capacity}</div>
                <div>morale:{crew.morale}</div>
                <div>wages:{crew.wages}</div>
              </div>
            </div>
            <div className="reactor">
              <div>{reactor.symbol}</div>
              <div>{reactor.name}</div>
              <div>condition:{reactor.condition}</div>
              <div>integrity:{reactor.integrity}</div>
              <div>power:{reactor.powerOutput}</div>
            </div>
            <div className="engine">
              <div>{engine.symbol}</div>
              <div>{engine.name}</div>
              <div>condition:{engine.condition}</div>
              <div>integrity:{engine.integrity}</div>
              <div>speed:{engine.speed}</div>
            </div>
          </div>
        </div>
      )
      )}
    </DraggableWindow>
    {shown.map(i => (
      <Ship shipId={i} />
    ))}
  </>
}
