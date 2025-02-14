import { RootState } from './store'

export const selectors = {
    getEmployee: (state: RootState) => {
        return state.employee
    }
}