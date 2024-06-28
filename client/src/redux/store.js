import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import commentReducer from './comments/commentsSlice.js'
import postsReducer from './posts/postsSlice.js'
import themeSlice from './theme/themeSlice.js'
import userReducer from './user/userSlice.js'

// create combine reducer 
const rootReducers = combineReducers({
    user: userReducer,
    posts: postsReducer,
    comments: commentReducer,
    theme: themeSlice
})

// create persist config
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

// create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducers)


/* pass the persisted reducer, get default middleware 
and set serializableCheck to false to prevent error using redux toolkit */

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

// export using persistStore 
export const persistor = persistStore(store)