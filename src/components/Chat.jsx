import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebseConfig'


const Chat = ({room}) => {

    const [newMessage, setNewMessage] = useState('')

    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, "messages")

    useEffect(()=>{
        const querryMessages = query(messagesRef, where("room", '==', room),orderBy("createdAt"))
        const unsubscribe = onSnapshot(querryMessages,(snapshot)=>{
           // console.log("New Message");
           let messages = []
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages)
        })
        return ()=> unsubscribe()
    },[])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(newMessage);
        if(newMessage === ''){
            return
        }

        const result = await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        })
        console.log(result);
        

        setNewMessage("")
    }

  return (
    <div>
        <div>
            <h1 className='my-4'>Welcome to : <span className='text-warning'>{room.toUpperCase()}</span></h1>
        </div>
        <div className='border p-3 shadow border-black' style={{textAlign: 'left'}}>
            {" "}
            {messages.map((message)=>(
                <div key={message?.id} className='border rounded p-1 mb-2'>
                    <span><span className='text-bold text-white'>{message.user}:</span> {message.text}</span>
                </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className='p-2'>
            <div className='my-2'>
                <input value={newMessage} type="text" className='from-control rounded p-1' placeholder="Send your message..." onChange={(e)=>setNewMessage(e.target.value)}/>
            </div>
            <div className='my-3'>
                <button className='btn' style={{backgroundColor: "blue"}} type='submit'>Send</button>
            </div>
        </form>
    </div>
  )
}

export default Chat