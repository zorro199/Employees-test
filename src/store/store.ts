import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as employeeReducer } from "./employee.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./api/employeeApi";


const reducers = combineReducers({
    employee: employeeReducer,
    [api.reducerPath]: api.reducer
})

export const store = () => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(api.middleware)
    })
}

export type RootState = ReturnType<typeof reducers>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector