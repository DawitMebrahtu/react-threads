import React, {useRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router'

import {useAuth} from '../context/AuthContext'

const Login = () =>{
    const loginForm = useRef(null)

    const {loginUser, user} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user){
          console.log('Navigating from Login')
          navigate('/')
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault(e)

        const email = loginForm.current.email.value
        const password = loginForm.current.password.value

        loginUser({email, password})
        navigate('/')

    }

	return(
          <div className="container mx-auto max-w-[400px] rounded-md border border-[rgba(49,49,50,1)] p-4">
            <form onSubmit={handleSubmit} ref={loginForm}>
                <div className="field--wrapper py-2">
                  <label>Email:</label>
                  <input 
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  className="w-full p-2 rounded-sm bg-[rgba(29,29,29,1)]"

                  />
                </div>

                <div  className="field--wrapper py-2">
                  <label>Password:</label>
                  <input 
                  required
                  type="password"
                  name="password"
                  placeholder="Enter password..."
                  className="w-full p-2 rounded-sm bg-[rgba(29,29,29,1)]"

                  />
                </div>

                <div className="field--wrapper py-2">

                  <input 
                  type="submit"
                  value="Login"
                  className="bg-white text-black rounded py-2 px-4 text-sm border border-black"
                  />

                </div>
            </form>

            <p>Dont have an account? Register <Link to="/register">here</Link></p>
          </div>
		)

}
export default Login;