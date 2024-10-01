import React, { useState } from 'react';

const LogIn: React.FC = () => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const attemptLogIn = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // put query/checking logic here

    }


    return (
        <div className="flex justify-center">
            <form onSubmit={attemptLogIn} className="bg-slate-200 p-2 rounded-md shadow-lg">
                <div className="flex justify-center">
                    <h1 className="font-bold p-2 text-xl">Log In To Account</h1>
                </div>

                <div className="bg-slate-400 p-3 rounded-sm shadow-md">
                    <label className="text-lg">Email:</label><br></br>
                    <input className = "p-2" type='email' required value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br><br></br>
                    <label className="text-lg">Password:</label><br></br>
                    <input className = "p-2" type='password' required value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>
                </div>

                <div className='flex justify-right pt-2'>
                    <button className="bg-blue-300 hover:bg-blue-500 rounded-xl pl-3 pr-3 ml-auto" type="submit">Log In</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn;