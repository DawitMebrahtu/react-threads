import {createContext, useState, useEffect, useContext} from 'react';
import {account, database, COLLECTION_ID_PROFILES, DEV_DB_ID} from "../appwriteConfig.js"
import {useNavigate} from 'react-router';


const AuthContext = createContext()


export const AuthProvider = ({children}) =>{
		const [loading, setLoading] = useState(true)
		const [user, setUser] = useState(null)

		const navigate = useNavigate()

		useEffect(() => {
			setLoading(false)
			getUserOnLoad()
		}, [])


		const getUserOnLoad = async() =>{
			try{
				console.log('RRRREEEEAAAACCHHIINNGG')

				let accountDetails = await account.get()

				const profile = await database.getDocument(DEV_DB_ID, COLLECTION_ID_PROFILES,accountDetails.$id);
				//console.log('Profile Is: ', profile)

				accountDetails['profile'] = profile
				//console.log('Account Detail Is: ', accountDetails)

				setUser(accountDetails)

			}
			catch(error){

			}
		}
		const loginUser = async (userInfo) =>{
			console.log('User Info: ', userInfo)
			try{
				let response = await account.createEmailSession(
					userInfo.email, userInfo.password)
				//console.log('Login Response', response)
				const accountDetails = await account.get()
				//console.log('Login Account', accountDetails)

				setUser(accountDetails)
			}catch(error){
				console.log('Login Error', error)
			}

		}
		const logoutUser = async () => {
			console.log('logout sclicked')
			account.deleteSession('current')
			setUser(null)
			navigate('/')
		}

		const contextData = {
			user,
			loginUser,
			logoutUser
		}

	return (
			<AuthContext.Provider value={contextData}>
				{loading ? <p>Loading ... </p> : children}
			</AuthContext.Provider>
		)
}


export const useAuth = ()=> {return useContext(AuthContext)}
export default AuthContext;

