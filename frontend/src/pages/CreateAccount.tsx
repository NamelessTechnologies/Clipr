import React, { useState } from 'react';

const CreateAccount: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted with value:', inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateAccount;