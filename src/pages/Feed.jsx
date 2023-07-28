import React, {useState, useEffect} from 'react'
import Thread from '../components/Thread'
import {database, DEV_DB_ID, VITE_COLLECTION_ID} from '../appwriteConfig'
import {Query} from 'appwrite'


const Feed = () => {
	const [threads, setThreads] = useState([])

	useEffect( () => {
		getThreads()
	}, [] )

	const getThreads = async () => {
		const response = await database.listDocuments(
			DEV_DB_ID, 
			VITE_COLLECTION_ID,
			[
				Query.orderDesc('$createdAt')
			]
			 )
		setThreads(response.documents)
	}

	return (
			<div className="container--main mx-auto max-w-[600px]">
				{threads.map(thread =>(
					<Thread key={thread.$id} thread={thread}/>
				))}

			</div>
		)
}

export default Feed