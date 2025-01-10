import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userSlice from './usersfeatures/userSlice'
import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import { persistStore } from "redux-persist";
import { useDispatch, useSelector } from "react-redux";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const UserpersistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
    reducer: {
        user: UserpersistedReducer,
        [apiService.reducerPath]: apiService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
        ).concat(apiService.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()