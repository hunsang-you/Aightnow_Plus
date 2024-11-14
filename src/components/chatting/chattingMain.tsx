'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

type Message = {
  user: string;
  content: string;
};

let socket: any;
export default function ChattingMain() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setTimeout(() => {
      socketInitializer();
    }, 100000);
  }, []);

  const socketInitializer = async () => {
    const response = await fetch('/api/chatting/socket'); // 소켓 서버 초기화 경로 확인
    socket = io({
      path: '/api/chatting/socket', // 소켓 서버 경로 설정
    });

    socket.on('message', (msg: Message) => {
      setMessages((prevMsgs) => [...prevMsgs, msg]);
    });
    console.log(response);
  };
  const sendMessage = () => {
    socketInitializer();
    console.log(1);
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
