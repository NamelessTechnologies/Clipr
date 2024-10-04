import React, { useState } from 'react';
import stelle from '../assets/Profile.png';
import { Link } from 'react-router-dom';

const CreateAccount: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [biography,setBiography] = useState('');
  const [nickname,setNickname] = useState('');
  const [pfp,setPfp] = useState('');



  const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = { Username: username, Email: email, Password: password, Biography: biography, Nickname: nickname, Pfp: pfp, }
      try {
        const response = await fetch("https://clipr-esa6hpg2cahzfud6.westus3-01.azurewebsites.net/user/", {
          body: JSON.stringify(newUser),
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        });
        console.log(response);
        if (response.status === 200){
          alert('Success!')
        }
        else{
          alert(`${response.status}: ${response.statusText}`);
        }
      } 
      catch (error) {
        alert(error);
        console.error(error);
      }
  };

  return (
    <div className="flex flex-row justify-center pt-2">
    <form onSubmit={createAccount} className="bg-navbar rounded px-20 pt-5 pb-5 mt-10 mb-4 items-center border border-x-gray-300">
      <img src={stelle} className='w-28 h-28 mx-auto'></img>
      <div className='w-full text-white text-center text-4xl mb-6'>Welcome to Clipr</div>
      <div className="w-full text-amber-500 text-center text-2xl mb-6">Create Account</div>
      <div className="mb-4">
        <label className="block text-white text-sm font-semibold mb-2">Username</label>
        <input 
          type="text" 
          className="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"
          value={username} onChange={(e) => setUsername(e.target.value)} required placeholder='Username'
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-semibold mb-2">Email</label>
        <input 
          type="email"
          className="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200" 
          value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email'
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-semibold mb-2">Password</label>
        <input 
          type="password"
          className="border-2 w-full py-2 px-3 text-black  leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"  
          value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Create a password'
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-semibold mb-2">Biography</label>
        <input 
          type="text"
          className="border w-full py-2 px-3 text-black  leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"  
          value={biography} onChange={(e) => setBiography(e.target.value)} required placeholder='Temp'
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-semibold mb-2">Nickname</label>
        <input 
          type="text"
          className="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"  
          value={nickname} onChange={(e) => setNickname(e.target.value)} required placeholder='Nickname'
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-semibold mb-2">Profile Pic</label>
        <input 
          type="text"
          className="border w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-neutral-200"  
          value={pfp} onChange={(e) => setPfp(e.target.value)} required placeholder='Temp'
        />
      </div>

      <div className='flex justify-center mt-5'>
        <button type="submit" className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded '>Submit</button>
      </div>

      <div className='flex justify-center mt-4'>
        <span className='text-white text-sm'>Already a member?</span>
        <Link to="/Clipr/LogIn" className='text-amber-500 text-sm ml-1'>Log in</Link>
      </div>
    </form>
    </div>
  );
};

export default CreateAccount;