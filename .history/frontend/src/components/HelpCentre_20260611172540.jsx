import React from 'react';
import { ChatBox } from '@mui/x-chat';

const adapter = {
    async sendMessage({ message, conversation, signal }) {
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const body = { message };
        if (conversation && conversation.id) body.conversationId = conversation.id;

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
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
