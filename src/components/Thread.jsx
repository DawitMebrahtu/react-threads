import React, {useState, useEffect} from 'react'
import {MoreHorizontal, Heart, Repeat, Send, MessageCircle, Trash2} from 'react-feather'
import {functions, database, DEV_DB_ID, VITE_COLLECTION_ID} from '../appwriteConfig'
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const Thread = ({thread, setThreads}) => {
	const [loading, setLoading] = useState(true)
	const [owner, setOwner] = useState()
	const [threadInstance, setThreadInstance] = useState(thread)

	useEffect (() =>{
		getUserInfo()
	}, [])

	const getUserInfo = async () =>{
		const payload = {
			"owner_id": thread.owner_id
		}

		const response = await functions.createExecution('64bbf89d3d4952fb7239', JSON.stringify(payload))
		const userData = JSON.parse(response.response)

		setOwner(userData)
		setLoading(false)
	}

	const handleDelete = async () =>{

		setThreads(prevState => prevState.filter(item => item.$id !== thread.$id))
		database.deleteDocument(DEV_DB_ID, VITE_COLLECTION_ID, thread.$id )
		console.log('thread was deleted!')
	}

	const toggleLike = async () =>{
		console.log('Liked')

		const users_who_liked = thread.users_who_liked
		const currentUserId = "64bb9d704e6dac9e9a0a"

		if (users_who_liked.includes(currentUserId)){
			const index = users_who_liked.indexOf(currentUserId)
			users_who_liked.splice((index,1))

		}
		else{
			users_who_liked.push(currentUserId)
		}

		const payload = {
			'users_who_liked': users_who_liked,
			'likes':users_who_liked.length
		}

		const response = await database.updateDocument(
			DEV_DB_ID,
			VITE_COLLECTION_ID,
			thread.$id,
			payload
			)

		setThreadInstance(response)
		console.log('Thread Instance: ', response)

	}
	if (loading) return

	return (
				<div className="flex p-2">
					<img className="w-10 h-10 rounded-full object-cover"
					 src={owner.profile_pic}
					 />
					<div className="w-full px-4 pb-4 border-b border-[rgba(49,49,50,1)]">
						{/* Thread Header */}
						<div className="flex justify-between ">
							<strong> {owner.name}</strong>
							<div className="flex justify-between gap-2 items-center cursor-pointer">
							 	<p className="text-[rgba(97,97,97,1)]"> <ReactTimeAgo date={new Date(thread.$createdAt).getTime()} locale="en-us" /> </p> 
								<Trash2 size={14} onClick={handleDelete} />						 
							</div>
						</div>

						{/* Thread Body */}
						<div className="py-4" style={{whiteSpace:"pre-wrap"}}>
							{thread.body}
						</div>
						
						{thread.image && (
							<img className="object-cover border border-[rgba(49,49,50,1)] rounded-md" src={thread.image} />
						)}

						<div className="flex gap-2 py-4">
							<Heart
							 onClick={toggleLike}
							 size={20}
							 className="cursor-pointer"
							  />
							<Repeat size={20} />
							<Send size={20} />
							<MessageCircle size={20} />
						</div>
						<div className="flex gap-4">
							<p className='text-[rgba(97,97,97,1)]'>5 Replies </p>
							<p> . </p>
							<p className='text-[rgba(97,97,97,1)]'> {threadInstance.likes} Likes </p>
						</div>
					</div>
				</div>
		)
}

export default Thread