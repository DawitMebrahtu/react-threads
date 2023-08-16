import React from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

const Header = () =>{
	const {user, logoutUser} = useAuth()
	return(
		<div className="text-center">
			{user ? (
					<div>
						<strong>Hello {user.name} </strong>
					 	<button className="bg-white text-black rounded py-2 px-4 text-sm border border-black" onClick={logoutUser}> Logout </button>
					</div>
				 ): (
				 	<Link to="/login" className="bg-white text-black rounded py-2 px-4 text-sm border border-black"> Login </Link>
				 )}
		</div>	
		)
}

export default Header