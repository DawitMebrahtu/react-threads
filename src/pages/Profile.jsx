
import React, {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {database, DEV_DB_ID, VITE_COLLECTION_ID, COLLECTION_ID_PROFILES} from '../appwriteConfig'
import {Query} from 'appwrite'
import Thread from '../components/Thread'

const Profile = () => {
	const [loading, setLoading] = useState(true)
	const [threads, setThreads] = useState([])
	const [userProfile, setUserProfile] = useState(null)

	const id = useParams()
	useEffect( () => {
			getThreads()
			getProfile()
	}, [] )

	const getThreads = async () => {

		const response = await database.listDocuments(
			DEV_DB_ID, 
			VITE_COLLECTION_ID,
			[
				Query.orderDesc('$createdAt'),
				Query.equal('owner_id', id.id)

			]
			 )
		setThreads(response.documents)
	}

	const getProfile = async () =>{
			const data = await database.getDocument(DEV_DB_ID, COLLECTION_ID_PROFILES,id.id);
			setUserProfile(data)
			setLoading(false)

	}

	if (loading) return
	return (
			<div className="container--main mx-auto max-w-[600px]">
				<div className="flex justify-between my-10">
					<div className="py-4 ">
						<h3 className="text-3xl font-bold"> {userProfile.username} </h3>
						<p > {userProfile.username} </p>
						<div className="py-6">
							{userProfile.bio}
						</div>

						<div className="flex gap-2">
							<p className="text-[rgba(97,97,97,1)]">{userProfile.follower_count} followers </p>
							{userProfile.link && (
								<>
									<p className="text-[rgba(97,97,97,1)]">.</p>
									<a  href={userProfile.link} className="text-[rgba(97,97,97,1)]"> {userProfile.link}</a>
								</>
								)}

						</div>
					</div>
					<div className="flex flex-col justify-between">
						<img className="w-20 h-20 rounded-full object-cover"
						 src={userProfile.profile_pic} />
						 <button
		 	                  className="bg-white text-black rounded py-2 px-4 text-sm border border-black rounded-full"
						 >Follow </button>
					</div>
				</div>
				<div>
				{threads.map(thread =>(
					<Thread key={thread.$id} thread={thread} setThreads={setThreads}/>
				))}
				</div>
			</div>
		)
}

export default Profile