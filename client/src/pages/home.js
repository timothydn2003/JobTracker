import { useEffect, useState } from "react";
import JobDetails from '../components/JobDetails'
import Form from '../components/Form'
import {useJobContext} from '../hooks/useJobContext'
import {useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
    const{jobs,dispatch} =  useJobContext()
    const{user} = useAuthContext()


    const[company, setCompany] = useState("");
        useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch('/api/jobs', {
                headers:{
                    'Authorization': `Bearer ${user.token}`
                },
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_JOBS', payload: json})
            }
        }

        if(user){
            fetchJobs()
        }
    }, [dispatch,user])

    const filteredList = jobs?.filter((job) =>{
        return job.company.toLowerCase().includes(company.toLowerCase());
    })
    return(
        <div className="home">
            <div className="jobs">
            <input className="search"
            placeholder="Search using company"
            onChange={(e) => setCompany(e.target.value)}
            />
            <h3>Jobs Applied: {jobs?.length}</h3>
                {filteredList && filteredList.map((job) => (
                    <div className="jobCard">
                        <JobDetails key={job._id} job={job}/>
                    </div>
                ))}
            </div>
            <Form/>
        </div>
    )
}

export default Home;

