import {Button} from "@mantine/core"
import {useAcceptContractMutation, useGetContractsQuery} from "../api"
import DraggableWindow from "./DraggableWindow"

export default function ContractsWindow() {
  const {data: contracts} = useGetContractsQuery({})
  const [accept] = useAcceptContractMutation()
  if (!contracts) return <></>
  return <>
    <DraggableWindow width={400} height={360} title={'contracts'}>
      {/*JSON.stringify(contracts)*/}
      {contracts.data.map(({
        accepted,
        deadlineToAccept,
        factionSymbol,
        fulfilled,
        id,
        terms: {
          deadline,
          payment,
          deliver
        },
        type}) => (
        <div className='contract'>
          <div className='top-section'>
            <h3>tasks</h3>
            {accepted
              ? <Button disabled>Accepted</Button>
              : <Button onClick={() => accept({id})}>Accept</Button>
            }
          </div>
          {deliver.map(({tradeSymbol, destinationSymbol, unitsRequired, unitsFulfilled, accepted, fulfi}) => (
            <div className='task'>
              deliver {unitsRequired}{' '}
              {tradeSymbol} to {destinationSymbol} ({unitsFulfilled}/{unitsRequired})
            </div>
          ))}
          <div className='param'>
            <div className='title'>
              faction
            </div>
            <div className='value'>
              {factionSymbol}
            </div>
          </div>
          <div className='param'>
            <div className='title'>
              deadline
            </div>
            <div className='value'>
              {deadline}
            </div>
          </div>
          <div className='param'>
            <div className='title'>
              accept untis
            </div>
            <div className='value'>
              {deadlineToAccept}
            </div>
          </div>
          <div className='status-row param'>
            <div className='title'>
              Status:
            </div>
            <div>

              {accepted ? 'acccepted' : 'not accepted'}
            </div>
            <div>

              {fulfilled ? 'fulfilled' : 'not fulfilled'}
            </div>
          </div>
          <div className="payment-row param">
            <div className='title'>
              payment
            </div>
            <div className='condition'>
              <div>on Accepted</div>
              <div>{payment.onAccepted}</div>
            </div>
            <div className="condition">
              <div>on fulfilled</div>
              <div>{payment.onFulfilled} </div>
            </div>
          </div>
        </div>
      )
      )}
    </DraggableWindow>
  </>
}
