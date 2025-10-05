import { NextResponse } from "next/server";
import { collection, query, where, getDocs, addDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request) {
    const session = await getServerSession(authOptions);
    if(!session?.user?.email){
        return NextResponse.json({error:"Unauthorised"},{status:401});
    }

    try {
    const conversationsRef = collection(db, 'conversations');
    // Query for conversations where the user's email is in the 'participants' array
    const q = query(
      conversationsRef,
      where('participants', 'array-contains', userEmail),
      orderBy('updatedAt', 'desc') // Show the most recently active chats first
    );

    const querySnapshot = await getDocs(q);

    const conversations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ conversations });

  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

    const { productId, ownerEmail, productName } = await request.json();
    const buyerEmail = session.user.email;

    if (ownerEmail === buyerEmail) {
        return NextResponse.json({ error: "You cannot start a chat with yourself." }, { status: 400 });
    }

    const conversationsRef = collection(db, 'conversations');
    const q = query(conversationsRef,
        where('productId', '==', productId),
        where('buyerEmail', '==', buyerEmail)
    );

    try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const conversationDoc = querySnapshot.docs[0];
            return NextResponse.json({ conversationId: conversationDoc.id });
        } else {
            const newConversation = await addDoc(conversationsRef,{
                productId,
                productName,
                ownerEmail,
                buyerEmail,
                participants:[ownerEmail,buyerEmail],
                updatedAt:serverTimestamp(),
                createdAt:serverTimestamp(),
            });
            return NextResponse.json({conversationId:newConversation.id});
        }
    }catch(error){
        console.error("Error finding or creating conversation:",error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}