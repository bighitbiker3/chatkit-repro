import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

const chatManager = new ChatManager({
  instanceLocator: 'v1:us1:921dce0e-27a0-4861-8807-9f459d0a891a',
  userId: 'el',
  tokenProvider: new TokenProvider({
    url:
      'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/921dce0e-27a0-4861-8807-9f459d0a891a/token',
  }),
});

const Chatkit = () => {
  const chatKitUserRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    console.log('mounting');
    return () => {
      console.log('unmounting');
      chatManager.disconnect();
    };
  }, []);

  // Connect and sub
  useEffect(() => {
    const configureChatKit = async () => {
      const chatKitUser = await chatManager.connect();
      chatKitUserRef.current = chatKitUser;
      const room = chatKitUser.rooms[0];
      setCurrentRoom(room);

      await chatKitUser.subscribeToRoomMultipart({
        roomId: room.id,
        hooks: { onMessage: message => onMessageHook(message) },
        messageLimit: 0,
      });
    };
    configureChatKit();
  }, []);

  const onMessageHook = message => {
    console.log('firing onMessageHook');
  };

  const handleInput = e => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    chatKitUserRef.current.sendMessage({ roomId: currentRoom.id, text: inputValue });
  };

  return (
    <div>
      <input value={inputValue} onChange={handleInput} placeholder='Send Message' />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatkit;
