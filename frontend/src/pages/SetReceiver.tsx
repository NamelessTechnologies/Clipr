import React, { useState } from 'react';
import User from "../types/User";
import { useNavigate } from "react-router-dom";

const SetReceiver: React.FC = () => {
    const[receiver, setReceiver] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const queryString = 'http://localhost:5001/username/' + receiver;
        const response = await fetch(queryString);
        const json = await response.json() as User;

        navigate("/Clipr/Messages", {state:[receiver, json.user_id]}); 
    };

    return (
        <>
            <div className="flex flex-row justify-center text-white p-10">
                <div className="flex justify-center flex-col mx-5">
                    <form className="bg-navbar items-center pt-5 px-10 pb-10 rounded-md shadow-lg border border-white" onSubmit={handleSubmit}>
                        <div className="flex justify-center flex-col mx-5">
                            <label className="">Username:</label>
                            <input className = "p-2 text-black mb-6 rounded-md" required value={receiver} onChange={(e) => setReceiver(e.target.value)}></input>
                            <button type="submit">Go to Messages Page</button>
                        </div>
                    </form>
                    {/* <h1 className='text-white'>{receiver}</h1> */}
                </div>
            </div>
        </>
    );
}

export default SetReceiver;