import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEmployee } from '../types/types'

const initialState: IEmployee[] = []

export const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployee: (state, {payload: favorite}: PayloadAction<IEmployee>) => {
            const isArchive = state.some(item => item.id === favorite.id)
            if (isArchive) {
                const index = state.findIndex(item => item.id === favorite.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            } else {
                state.push(favorite)
            }
        }
    }
})

export const { actions, reducer} = employeeSlice