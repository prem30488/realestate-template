import React from 'react';
import { ChatBox } from '@mui/x-chat';

const adapter = {
  async sendMessage({ message, signal }) {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal,
    });
    return res.body; // ReadableStream<ChatMessageChunk>
  },
};

export default function App() {
  return (
    <ChatBox
      adapter={adapter}
      initialConversations={[{ id: 'main', title: 'Assistant' }]}
      initialActiveConversationId="main"
      sx={{ height: 500 }}
    />
  );
}
