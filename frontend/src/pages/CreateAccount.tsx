import React, { useState } from 'react';

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
    <form onSubmit={createAccount} className="bg-yellow-500 shadow-md rounded px-20 pt-6 pb-8 mb-4 items-center">
      <div className="w-full text-gray-700 text-center text-2xl pb-2">Create Account</div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
        <input 
          type="text" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input 
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input 
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Biography</label>
        <input 
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
          value={biography} 
          onChange={(e) => setBiography(e.target.value)} 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nickname</label>
        <input 
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
          value={nickname} 
          onChange={(e) => setNickname(e.target.value)} 
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Profile Pic</label>
        <input 
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  
          value={pfp} 
          onChange={(e) => setPfp(e.target.value)} 
          required
        />
      </div>
      <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
    </form>
    </div>
  );
};

export default CreateAccount;