import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function ContactMessagesPanel() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ContactMessage[] = [];
      snapshot.forEach(doc => {
        msgs.push({ id: doc.id, ...doc.data() } as ContactMessage);
      });
      setMessages(msgs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <aside className="w-full md:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 h-full overflow-y-auto p-6">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Contact Messages</h2>
      {loading ? (
        <div className="text-slate-500 dark:text-slate-300">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-slate-500 dark:text-slate-300">No messages yet.</div>
      ) : (
        <ul className="space-y-4">
          {messages.map(msg => (
            <li key={msg.id} className="bg-slate-50 dark:bg-black rounded-lg p-4 shadow">
              <div className="font-semibold text-slate-800 dark:text-white">{msg.name} <span className="text-xs text-slate-500 dark:text-slate-300">({msg.email})</span></div>
              <div className="text-slate-700 dark:text-slate-200 mt-2">{msg.message}</div>
              {msg.createdAt && (
                <div className="text-xs text-slate-400 dark:text-slate-400 mt-2">
                  {new Date(msg.createdAt.seconds * 1000).toLocaleString()}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
