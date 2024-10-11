import React, { useState } from 'react';
import { useLocation, Link } from "react-router-dom";

const Messages: React.FC =  () => {

    const [currentUser,setCurrentUser] = useState(localStorage.getItem("user") || '');
    var userInfo = JSON.parse(currentUser);
    const[message, setMessage] = useState('');
    const location = useLocation();
    const second_user = location.state;
    console.log(userInfo['user_id']);
    console.log(second_user)

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-screen p-5 pl-20">
                <h1 className="text-white text-3xl">2's Username</h1>
            </div>

            <div className=' text-white bg-slate-700 flex flex-col justify-center w-3/5 h-4/5 px-10 pb-5'>
                <div className="border-b-2 pb-2 pt-4">
                    <h1 className="text-2xl">User 1</h1>
                    <p>Hello User 2!</p>
                </div>
                <div className="border-b-2 pb-2 pt-4">
                    <h1 className="text-2xl">User 2</h1>
                    <p>Hey whats up</p>
                </div>
            </div>

            <form className='flex justify-center pt-7 w-screen'>
                <div className='flex flex-col justify-center w-1/3 pr-5'>
                    <input className='p-2 rounded-xl' value={message} onChange={(e) => setMessage(e.target.value)}>
                    </input>
                </div>
                <div className='bg-blue-100 rounded-md'>
                    <button className='p-2' type='submit'> Send Message </button>
                </div>
            </form>
        </div>
    )
}

export default Messages;