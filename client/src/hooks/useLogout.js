import { useAuthContext } from "./useAuthContext"
import { useJobContext } from "./useJobContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: jobsDispatch } = useJobContext()

    const logout = () => {
        //update update state and delete web token to logout

        //remove user from local storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        jobsDispatch({type: 'SET_JOBS', payload:null})

    }
    return {logout}
}