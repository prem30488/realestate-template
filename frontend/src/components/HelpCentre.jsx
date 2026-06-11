import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { ChatBox } from '@mui/x-chat';

const STORAGE_KEYS = {
    messages: 'helpcenter_messages',
    conversations: 'helpcenter_conversations',
};

const DEFAULT_CONVERSATIONS = [{ id: 'main', title: 'Assistant' }];

function loadFromStorage(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw);
    } catch {
        // ignore parse errors
    }
    return fallback;
}

function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore quota errors
    }
}

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

export default function HelpCentre() {
    // Rehydrate from localStorage on first render only
    const initialMessages = useMemo(
        () => loadFromStorage(STORAGE_KEYS.messages, []),
        []
    );
    const initialConversations = useMemo(
        () => loadFromStorage(STORAGE_KEYS.conversations, DEFAULT_CONVERSATIONS),
        []
    );

    return (
        <Box sx={{ pt: '100px', pb: 8, minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <ChatBox
                adapter={adapter}
                initialMessages={initialMessages}
                initialConversations={initialConversations}
                initialActiveConversationId="main"
                onMessagesChange={(msgs) => saveToStorage(STORAGE_KEYS.messages, msgs)}
                onConversationsChange={(convs) => saveToStorage(STORAGE_KEYS.conversations, convs)}
                sx={{ height: 500 }}
            />
        </Box>
    );
}
