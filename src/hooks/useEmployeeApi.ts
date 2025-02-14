import { useGetEmployeeQuery } from "../store/api/employeeApi"
import { selectors } from "../store/selectors"
import { useAppSelector } from "../store/store"


export const useEmployeeApi = () => {
    const getEmployee = useAppSelector(selectors.getEmployee)
    const { data, isFetching } = useGetEmployeeQuery(null)
    return {data, isFetching, getEmployee}
}