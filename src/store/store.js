import { configureStore } from '@reduxjs/toolkit'

import { filterReducer, sortingReducer, searchReducer } from '../reducer/reducer'

const loggerMiddleware = (store) => (next) => (action) => {
    const result = next(action)
    console.log('Middleware', store.getState())
    return result
}

const store = configureStore({
    reducer: {
        sorting: sortingReducer,
        filters: filterReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
})

export default store
