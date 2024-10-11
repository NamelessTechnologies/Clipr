import React, { useState } from 'react';
// import User from "../types/User";
// import { useNavigate } from "react-router-dom";

const LogIn: React.FC = () => {

    const[message, setMessage] = useState('');
    
    // const getMessages = () => {
    //     event.preventDefault();

    //     const queryString = 'https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/email/' + email;
    //     const response = await fetch(queryString);
    //     const json = await response.json() as User;
    // }

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

export default LogIn;