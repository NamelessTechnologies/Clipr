import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Message from '../types/Message';
import MessageBox from '../components/MessageBox';

const Messages: React.FC =  () => {
    const url = 'http://localhost:5001/';

    const [currentUser, setCurrentUser] = useState(localStorage.getItem("user") || '');
    var userInfo = JSON.parse(currentUser);
    const[message, setMessage] = useState('');
    const[convoMessages, setMessages] = useState<Message[]>([]); 
    const location = useLocation();
    const second_user = location.state;

    useEffect(()=>{
        fetchMessages();
    },[])

    // console.log(userInfo['user_id']);
    // console.log("second user: " + second_user[1])

    // gets all messages for current conversation
    const fetchMessages = async () => {
        try {
            const response = await fetch(url + `conversation?User_1=${userInfo['user_id']}&User_2=${second_user[1]}`);
            const json = await response.json();
            const messages: Message[] = [];
            json.forEach((media: any) => {
                const NewMessage: Message = {
                    id: media.id,
                    convo_id: media.convo_id,
                    content: media.content,
                    datesent: media.datesent,
                    user_id: media.user_id
                };        
                messages.push(NewMessage);
            });
            setMessages(messages); 
        } catch (error) {
            console.error(error);
            throw new Error("Error getting messages for convo");
        }
    }

    // saves message sent by current user in database
    const postMessage = async () => {
        const newMessage = { Convo_id: 1, Content: message, Datesent: new Date(), User_id:  JSON.parse(currentUser)['user_id']}

        try {
            const response = await fetch(url + "conversation/message", {
              body: JSON.stringify(newMessage),
              method: "POST",
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            });
            console.log(response);
            if (response.status === 200){
              console.log("message posted to database!")
            }
            else{
                console.log("message not posted to database")
            }
          } 
          catch (error) {
            alert(error);
            console.error(error);
          }
    }

    // waits for postMessage() to complete before calling fetchMessages() function
    const messagePipeline = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            await postMessage();
            await fetchMessages();
          } catch (error) {
            console.error('Error in executing functions:', error);
          }
    }

    convoMessages.forEach((msg: Message) => {
        console.log(msg.content);
    });


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-screen p-5 pl-20">
                <h1 className="text-white text-3xl">{second_user[0]}</h1>
            </div>

            <div className=' text-white bg-navbar flex flex-col justify-center w-3/5 h-4/5 px-10 pb-5'>
                            
                {convoMessages.map((msg) => (
                        <MessageBox username={msg.user_id == userInfo['user_id'] ?  userInfo['username'] : second_user[0]} content={msg.content} />
                    ))}

            </div>

            <form className='flex justify-center pt-7 w-screen' onSubmit={messagePipeline}>
                <div className='flex flex-col justify-center w-1/3 pr-5'>
                    <input className='p-2 rounded-xl' value={message} onChange={(e) => setMessage(e.target.value)}>
                    </input>
                </div>
                <div className='bg-blue-100 rounded-md'>
                    <button className='p-2 bg-navbar text-white border-white border-2' type='submit'> Send Message </button>
                </div>
            </form>
        </div>
    )
}

export default Messages;