import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatkit from './Chatkit';

function App() {
  const [mountChatKit, setMountChatKit] = useState(true);
  useEffect(() => {
    setTimeout(() => setMountChatKit(false), 1);
    setTimeout(() => setMountChatKit(true), 10);
  }, []);
  return (
    <div className='App'>
      {!!mountChatKit && <Chatkit />}{' '}
      <button onClick={() => setMountChatKit(false)}>unmount chatkit</button>
    </div>
  );
}

export default App;
