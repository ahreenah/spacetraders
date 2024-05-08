import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const spaceTradersApi = createApi({
  reducerPath: 'spaceTradersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.spacetraders.io/v2/'}),
  tagTypes: ['Orders', 'Agent', 'Ships'],
  endpoints: (builder) => ({

    register: builder.mutation<any, any>({
      query: ({symbol, faction, email}) => ({
        url: `register/`,
        method: 'POST',
        body: {
          symbol,
          faction,
          email
        }
      })
    }),

    getAgent: builder.query({
      query: () => ({
        url: 'my/agent/',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }),
      providesTags: ['Agent']
    }),

    getShip: builder.query({
      query: ({symbol}) => ({
        url: `my/ships/${symbol}`,
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        },
      }),
      providesTags: (_, _a, {symbol}) => {
        console.log('provide', [{type: 'Ships', id: symbol}])
        return [{type: 'Ships', id: symbol}]
      }
    }),

    orbitShip: builder.mutation({
      query: ({symbol}) => ({
        url: `my/ships/${symbol}/orbit`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        },
      }),
      invalidatesTags: (_, _a, {symbol}) => {
        console.log('invalidate', [{type: 'Ships', id: symbol}])
        return [{type: 'Ships', id: symbol}]
      }
    }),

    dockShip: builder.mutation({
      query: ({symbol}) => ({
        url: `my/ships/${symbol}/dock`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        },
      }),
      invalidatesTags: (_, _a, {symbol}) => {
        console.log('invalidate', [{type: 'Ships', id: symbol}])
        return [{type: 'Ships', id: symbol}]
      }
    }),


    getSystemWaypoints: builder.query({
      query: ({system, trait, type}) => ({
        url: `systems/${system}/waypoints`
          + (trait ? `?traits=${trait}` : '')
          + (type ? `?type=${type}` : ''),
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
    }),

    getWaypoint: builder.query({
      query: ({systemSymbol, waypointSymbol, trait}) => ({
        url: `systems/${systemSymbol}/waypoints/${waypointSymbol}`,
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
    }),

    getWaypointShipyard: builder.query({
      query: ({systemSymbol, waypointSymbol, trait}) => ({
        url: `systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`,
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
    }),

    getShips: builder.query({
      query: () => ({
        url: `my/ships`,
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }),
      providesTags: ['Ships']
    }),

    purchaseShip: builder.mutation({
      query: ({shipType, waypointSymbol}) => ({
        url: `my/ships`,
        method: 'POST',
        body: {
          shipType,
          waypointSymbol
        },
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }),
      invalidatesTags: ['Agent', 'Ships']
    }),

    getContracts: builder.query({
      query: () => ({
        url: `my/contracts`,
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }),
      providesTags: ['Orders']
    }),

    acceptContract: builder.mutation({
      query: ({id}) => ({
        url: `my/contracts/${id}/accept`,
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        },
        method: 'POST'
      }),
      invalidatesTags: ['Orders', 'Agent']
    }),

  }),
})

export const {
  useRegisterMutation,
  useGetAgentQuery,
  useGetShipQuery,
  useOrbitShipMutation,
  useDockShipMutation,
  useGetSystemWaypointsQuery,
  useGetWaypointQuery,
  useGetWaypointShipyardQuery,
  useGetShipsQuery,
  usePurchaseShipMutation,
  useGetContractsQuery,
  useAcceptContractMutation
} = spaceTradersApi
