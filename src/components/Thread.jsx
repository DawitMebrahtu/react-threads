import React, {useState, useEffect} from 'react'
import {MoreHorizontal, Heart, Repeat, Send, MessageCircle} from 'react-feather'
import {functions} from '../appwriteConfig'
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

const Thread = ({thread}) => {
	const [loading, setLoading] = useState(true)
	const [owner, setOwner] = useState()

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
							<div className="flex justify-between gap-2">
							 	<p className="text-[rgba(97,97,97,1)]"> <ReactTimeAgo date={new Date(thread.$createdAt).getTime()} locale="en-us" /> </p> 
								<MoreHorizontal />						 
							</div>
						</div>

						{/* Thread Body */}
						<div className="py-4">
							<span>{thread.body}</span>
						</div>
						<div className="flex gap-2 py-4">
							<Heart size={20} />
							<Repeat size={20} />
							<Send size={20} />
							<MessageCircle size={20} />
						</div>
						<div className="flex gap-4">
							<p className='text-[rgba(97,97,97,1)]'>5 Replies </p>
							<p> . </p>
							<p className='text-[rgba(97,97,97,1)]'> 3 Likes </p>
						</div>
					</div>
				</div>
		)
}

export default Thread