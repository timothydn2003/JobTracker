import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
const Navbar= () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()
    const handleClick = () => {
        logout()
    }
    return(
        <header>
            <div className="container">
                <Link to = '/'>
                    <h1>Job Tracker</h1>
                </Link>
              <nav>
             {user&& <div className='email-btn'>
                <h4>Logged in as: <span className='email'>{user.email}</span></h4><button className = "logoutbtn" onClick={handleClick}>Log out</button>
              </div>}
                {!user && <div className = "formlinks">
                <Link to = '/login'>Login</Link>
                <Link to = '/signup'>Sign Up</Link>
            </div>}
              </nav>

            </div>
        </header>
    )
}
export default Navbar