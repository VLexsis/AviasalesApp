import { createReducer } from '@reduxjs/toolkit'

import {
    setCheapest,
    setFastest,
    setOptimal,
    setAll,
    setNonstop,
    setOneTransfer,
    setTwoTransfers,
    setThreeTransfers,
    setNone,
    clearTickets,
} from '../actions/actions'
import { fetchSearchId, fetchTickets } from '../api/api'

const initialFetchState = {
    searchId: null,
    tickets: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    stop: false,
}

export const searchReducer = createReducer(initialFetchState, (builder) => {
    builder
        .addCase(fetchSearchId.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(fetchSearchId.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.searchId = action.payload
        })
        .addCase(fetchSearchId.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(fetchTickets.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(fetchTickets.fulfilled, (state, action) => {
            state.tickets = [...state.tickets, ...action.payload.tickets]
            state.stop = action.payload.stop
            if (action.payload.stop) {
                state.status = 'succeeded'
            } else {
                state.status = 'loading_more'
            }
        })
        .addCase(fetchTickets.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
        .addCase(clearTickets, (state) => {
            state.status = 'idle'
        })
})

// Начальное состояние для сортировки
const initialSortingState = {
    sorting: 'cheapest', // Сортировка
}

// Начальное состояние для фильтров
const initialFilterState = {
    all: false, // Все фильтры
    nonStop: false, // Без пересадок
    oneTransfer: false, // 1 пересадка
    twoTransfers: false, // 2 пересадки
    threeTransfers: false, // 3 пересадки
}

// Функция для проверки, активны ли все фильтры
const checkFiltersAll = (state) => {
    const { nonStop, oneTransfer, twoTransfers, threeTransfers } = state
    return nonStop && oneTransfer && twoTransfers && threeTransfers
}

// Редьюсер для сортировки
export const sortingReducer = createReducer(initialSortingState, (builder) => {
    builder
        .addCase(setCheapest, (state) => {
            state.sorting = 'cheapest'
        })
        .addCase(setFastest, (state) => {
            state.sorting = 'fastest'
        })
        .addCase(setOptimal, (state) => {
            state.sorting = 'optimal'
        })
})

// Редьюсер для фильтров
export const filterReducer = createReducer(initialFilterState, (builder) => {
    builder
        .addCase(setAll, (state) => {
            state.all = true
            state.nonStop = true
            state.oneTransfer = true
            state.twoTransfers = true
            state.threeTransfers = true
        })
        .addCase(setNone, (state) => {
            state.all = false
            state.nonStop = false
            state.oneTransfer = false
            state.twoTransfers = false
            state.threeTransfers = false
        })
        .addCase(setNonstop, (state) => {
            state.nonStop = !state.nonStop
            state.all = checkFiltersAll(state)
        })
        .addCase(setOneTransfer, (state) => {
            state.oneTransfer = !state.oneTransfer
            state.all = checkFiltersAll(state)
        })
        .addCase(setTwoTransfers, (state) => {
            state.twoTransfers = !state.twoTransfers
            state.all = checkFiltersAll(state)
        })
        .addCase(setThreeTransfers, (state) => {
            state.threeTransfers = !state.threeTransfers
            state.all = checkFiltersAll(state)
        })
})
