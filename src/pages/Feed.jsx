import React, {useState, useEffect, useRef} from 'react'
import {Image} from 'react-feather'
import Thread from '../components/Thread'
import {database, storage, DEV_DB_ID, VITE_COLLECTION_ID, BUCKET_ID_IMAGES} from '../appwriteConfig'
import {Query, ID} from 'appwrite'
import {useAuth} from '../context/AuthContext'

const Feed = () => {
	const [threads, setThreads] = useState([])
	const [threadBody, setThreadBody] = useState('')
	const [threadImage, setThreadImage] = useState(null)
	const {user} = useAuth()

	const fileRef = useRef(null)

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

	const handleThreadSubmit = async (e) => {
		e.preventDefault()

		const payload = {
			"owner_id": user.$id,
			"body": threadBody,
			"image": threadImage
		}

		const response = await database.createDocument(
			DEV_DB_ID,
			VITE_COLLECTION_ID,
			ID.unique(),
			payload

			)

		//console.log('Response: ', response)
		setThreads(prevState => [response, ...prevState])
		setThreadBody('')
		setThreadImage(null)

	}

	const handleClick = async (e) => {
		fileRef.current.click()
		handleFileChange(e)
	}

	const handleFileChange = async (e) =>{
		const fileObj = e.target.files && e.target.files[0];

		if (!fileObj) return

		const response = await storage.createFile(
			BUCKET_ID_IMAGES,
			ID.unique(),
			fileObj
			)
		console.log("UPLOADED FILE: ", response)

		const imagePreview = storage.getFilePreview(BUCKET_ID_IMAGES, response.$id)
		setThreadImage(imagePreview.href)
	}
	return (


			<div className="container--main mx-auto max-w-[600px]">
				<div className="p-4"> 
				  <form onSubmit={handleThreadSubmit}>
					    <textarea className="rounded p-4 w-full bg-[rgba(29,29,29,1)]"
					      required
					      name="body"
					      placeholder="Say something ..."
					      value={threadBody}
					      onChange={(e)=> {setThreadBody(e.target.value)}}
					    />
					    <img src={threadImage} />
						<input

						 type='file'
						 ref={fileRef}
						 style={{display:"none"}}
						 onChange={handleFileChange}
						  />
						<div className="flex justify-between item-center py-2 border-y border-[rgba(49,49,50,1)] ">
							<Image onClick={handleClick} className="cursor-pointer" size={24}/>
							<input className="bg-white text-black rounded py-2 px-4 text-sm border border-black" type="submit" value="Post" />
						</div>
				  </form>
				</div>

				{threads.map(thread =>(
					<Thread key={thread.$id} thread={thread} setThreads={setThreads}/>
				))}

			</div>
		)
}

export default Feed