
import {useJobContext } from '../hooks/useJobContext'
import { useAuthContext } from '../hooks/useAuthContext'
const JobDetails = ({ job }) => {
    const {dispatch} = useJobContext()
    const{user} = useAuthContext()
    const deleteJob = async () => {
        if(!user){

            return
        }

        const response = await fetch('/api/jobs/' + job._id, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if(response.ok){
            dispatch({type: 'DELETE_JOB', payload: json})
        }
    }
    return(
        <div className="job-details">
                <h3>{job.company}</h3>
                <p><strong>Position: </strong><span className="jobTitle">{job.title}</span></p>
                <p><strong>Date Applied: </strong>{job.date}</p>
    
                <p><strong><a className='jobLink' href= {job.link} target ="_blank"> Link to job posting</a></strong></p>
                <button onClick={deleteJob} className='deletebtn'><b>Delete</b></button>

        </div>

    )
}




export default JobDetails




