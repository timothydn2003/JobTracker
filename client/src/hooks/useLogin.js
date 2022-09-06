import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
export const useLogin = () => {
    const[error,setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const{dispatch} = useAuthContext()

    const login = async (email,password) => {
        setIsLoading(true)
        setError(null)


        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
            //save to local storage to keep them signed in
            localStorage.setItem('user', JSON.stringify(json))

            //update auth context
            dispatch({type:'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    return {login,isLoading,error}
}