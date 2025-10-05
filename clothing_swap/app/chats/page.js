// File: app/chats/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import ConversationListItem from '../components/ConversationListItem';

export default function ChatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if the user is not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    if (status === 'authenticated') {
      const fetchConversations = async () => {
        try {
          const response = await fetch('/api/chat/my-conversations');
          const data = await response.json();
          if (response.ok) {
            setConversations(data.conversations);
          }
        } catch (error) {
          console.error("Failed to fetch conversations:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchConversations();
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return <p className="text-center mt-10">Loading your chats...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg mt-10">
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold">My Chats</h1>
          </div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(convo => (
                <ConversationListItem key={convo.id} conversation={convo} />
              ))
            ) : (
              <p className="p-4 text-gray-500">You have no active chats.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}