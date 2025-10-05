// File: app/components/ConversationListItem.jsx

'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function ConversationListItem({ conversation }) {
  const { data: session } = useSession();
  const { productName, ownerEmail, buyerEmail, productId, id: conversationId } = conversation;

  if (!session) return null;

  // Determine who the "other user" is in the conversation
  const otherUserEmail = session.user.email === ownerEmail ? buyerEmail : ownerEmail;

  return (
    <Link href={`/products/${productId}`} legacyBehavior>
      <a className="flex items-center p-4 bg-white border-b hover:bg-gray-50 transition">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center">
          {/* Simple initial icon */}
          <span className="text-xl font-bold">{productName.charAt(0)}</span>
        </div>
        <div className="ml-4 flex-grow">
          <div className="font-bold text-gray-800">{productName}</div>
          <div className="text-sm text-gray-600">Chat with: {otherUserEmail}</div>
        </div>
      </a>
    </Link>
  );
}