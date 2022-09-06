import {useState} from 'react'
import {useJobContext} from '../hooks/useJobContext'
import { useAuthContext } from '../hooks/useAuthContext'

const Form = () => {
    const{dispatch} = useJobContext()
    const{user} = useAuthContext()
    
    const[title,setTitle] = useState("");
    const[company,setCompany] = useState("");
    const[date,setDate] = useState("");
    const[link,setLink] = useState("");
    const[error,setError] = useState("");


    const submitted = async(e) => {
        e.preventDefault();

        if(!user){
            setError('You must be logged in.')
            return
        }

        const job = {title,company,date,link};
        
        //send a POST request
        const response = await fetch('/api/jobs', {
            method: 'POST',
            body: JSON.stringify(job),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setCompany('')
            setLink('')
            setDate('')
            setError(null);
            console.log("New Job Added",json)
            dispatch({type: 'CREATE_JOB', payload: json})
        }
    }
    return(
        <form className='create' onSubmit={submitted}>
            <h3>Add a New Job</h3>

            <label>Position Title:</label>
            <input
            className='form-input'
            type= "text"
            onChange={(e) => setTitle(e.target.value)}
            value = {title}
            />
            <label>Company Name:</label>
            <input
            className='form-input'
            type= "text"
            onChange={(e) => setCompany(e.target.value)}
            value = {company}
            />
            <label>Link to Posting: </label>
            <input
            className='form-input'
            type= "text"
            onChange={(e) => setLink(e.target.value)}
            value = {link}
            />
            <label>Date Applied:</label>
            <input
            className='form-input'
            type= "text"
            onChange={(e) => setDate(e.target.value)}
            value = {date}
            />
            <button className='submitbtn'><b>Add Job</b></button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}
export default Form;