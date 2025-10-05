// components/ChatBox.jsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function ChatBox({ productId, ownerEmail, productName }) {
    const { data: session } = useSession();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationId, setConversationId] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Get or create the conversation
    useEffect(() => {
        const getConversation = async () => {
            if (!session) return;
            
            try {
                const response = await fetch('/api/chat/conversations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, ownerEmail, productName }),
                });
                const data = await response.json();

                if (data.conversationId) {
                    setConversationId(data.conversationId);
                    setIsReady(true);
                } else {
                    console.error("❌ conversationId not found in the server response.");
                }
            } catch (error) {
                console.error("Failed to initialize conversation:", error);
            }
        };
        getConversation();
    }, [session, productId, ownerEmail, productName]);

    // Listen for new messages
    useEffect(() => {
        if (!conversationId) {
            return;
        }
        
        const messagesRef = collection(db, 'conversations', conversationId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [conversationId]);
    
    // Scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !conversationId) return;

        const messagesRef = collection(db, 'conversations', conversationId, 'messages');
        try {
            await addDoc(messagesRef, {
                text: newMessage,
                senderEmail: session.user.email,
                timestamp: serverTimestamp(),
            });
            setNewMessage('');
        } catch(error) {
            console.error("Error writing message to Firestore:", error);
        }
    };
    
    // ✅ CORRECT: This check now correctly controls if the component renders
    if (!session || session.user.email === ownerEmail) {
        return null;
    }

    return (
        <div className="mt-6 border rounded-lg p-4 bg-white">
            <h3 className="font-bold text-lg mb-2">Chat with the Owner</h3>
            <div className="h-64 overflow-y-auto mb-4 p-2 bg-gray-50 rounded">
                {!isReady && <p className="text-gray-500 text-center">Initializing chat...</p>}
                {messages.map(msg => (
                    <div key={msg.id} className={`p-2 my-1 rounded-md ${msg.senderEmail === session.user.email ? 'bg-blue-200 text-right ml-auto' : 'bg-gray-200 text-left mr-auto'}`} style={{maxWidth: '80%'}}>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={isReady ? "Type your message..." : "Loading chat..."}
                    disabled={!isReady}
                    className="flex-grow border rounded-l-md p-2 disabled:bg-gray-200"
                />
                <button 
                    type="submit" 
                    disabled={!isReady}
                    className="bg-indigo-600 text-white px-4 rounded-r-md disabled:bg-gray-400"
                >
                    Send
                </button>
            </form>
        </div>
    );
}