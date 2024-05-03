import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { Iterable } from 'immutable'
import {
    configureStore,
    createSerializableStateInvariantMiddleware,
    isPlain,
    Tuple,
} from '@reduxjs/toolkit'

import authReducer from './authSlice'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value)

const getEntries = (value) =>
    Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
    isSerializable,
    getEntries,
})

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: () => new Tuple(serializableMiddleware),
})

export const persistor = persistStore(store)
