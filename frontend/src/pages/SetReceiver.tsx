import React, { useState } from 'react';
import { Link } from "react-router-dom";

const SetReceiver: React.FC = () => {
    const[receiver, setReceiver] = useState('');
    return (
        <>
            <div className="flex flex-row justify-center text-white p-10">
                <div className="flex justify-center flex-col mx-5">
                    <form className="bg-navbar items-center pt-5 px-10 pb-10 rounded-md shadow-lg border border-white">
                        <div className="flex justify-center flex-col mx-5">
                            <label className="">Username:</label>
                            <input className = "p-2 text-black mb-6 rounded-md" required value={receiver} onChange={(e) => setReceiver(e.target.value)}></input>
                            <Link to="/Clipr/Messages" state={receiver}>Go to Messages Page</Link>
                        </div>
                    </form>
                    <h1 className='text-white'>{receiver}</h1>
                </div>
            </div>
        </>
    );
}

export default SetReceiver;