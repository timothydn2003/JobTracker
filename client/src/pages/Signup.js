import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
const Signup = () => {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const {signup,error,isLoading} = useSignup()

    const handleSubmit = async(e) => {
        e.preventDefault()
        await signup(email,password)
    }
    return(
        <form className="signup">
            <h3>Sign Up</h3>
            <label>Email:</label>
            <input 
            className="forminput"
            type= "email"
            onChange={(e) => setEmail(e.target.value)}
            value = {email}
            />
            <label>Password:</label>
            <input 
            className="forminput"
            type= "password"
            onChange={(e) => setPassword(e.target.value)}
            value = {password}
            />
            <button displayed = {isLoading} className="formbtn" onClick={handleSubmit}>Sign Up</button>
            {error&& <div className="error">{error}</div>}
        </form>
    )
}
export default Signup