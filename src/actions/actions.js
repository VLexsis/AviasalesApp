import { createAction } from '@reduxjs/toolkit'

//экшены для Sorting
export const setCheapest = createAction('SET_CHEAPEST')
export const setFastest = createAction('SET_FASTEST')
export const setOptimal = createAction('SET_OPTIMAL')

//экшены для Filters
export const setNonstop = createAction('SET_NONSTOP')
export const setAll = createAction('SET_ALL')
export const setOneTransfer = createAction('SET_ONETRANSFER')
export const setTwoTransfers = createAction('SET_TWOTRANSFERS')
export const setThreeTransfers = createAction('SET_THREETRANSFERS')
export const setNone = createAction('SET_NONE')

export const clearTickets = createAction('tickets/clearTickets')
