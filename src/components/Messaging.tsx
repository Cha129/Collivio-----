import React, { useState } from "react";
import { MessageSquare, Send, User, Search, Paperclip, MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import { Btn } from "../App";
import { cn } from "../lib/utils";

const contacts = [
  { id: "1", name: "Sara Jenkins", role: "Design Tech", online: true },
  { id: "2", name: "Daniel Koch", role: "Mentor", online: true },
  { id: "3", name: "Team: Urban Planning", role: "Project", online: false },
];

const initialMessages = [
  { id: "1", sender: "Sara Jenkins", content: "Hey! Did you check the new brief?", time: "10:20 AM", isMe: false },
  { id: "2", sender: "Me", content: "Not yet, looking at it now.", time: "10:22 AM", isMe: true },
  { id: "3", sender: "Sara Jenkins", content: "Cool, let me know if you need help with the prototypes.", time: "10:25 AM", isMe: false },
];

export default function Messaging() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), sender: "Me", content: input, time: "Just now", isMe: true }]);
    setInput("");
  };

  return (
    <div className="bg-white rounded-[40px] shadow-elegant border border-black/5 overflow-hidden flex h-[600px]">
      {/* Sidebar */}
      <aside className="w-80 border-r border-black/5 flex flex-col bg-bg/20">
        <div className="p-6 border-b border-black/5">
          <h3 className="font-display text-2xl font-bold mb-4">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2 bg-white/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-wine/10 transition-all font-sans"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {contacts.map((c) => (
            <button 
              key={c.id} 
              onClick={() => setSelectedContact(c)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-2xl transition-all",
                selectedContact.id === c.id ? "bg-white shadow-sm border border-black/5" : "hover:bg-black/5 text-muted hover:text-fg"
              )}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted">
                  <User size={20} />
                </div>
                {c.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{c.name}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 truncate">{c.role}</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="p-4 px-6 border-b border-black/5 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted">
               <User size={20} />
             </div>
             <div>
               <h4 className="font-bold text-sm leading-none">{selectedContact.name}</h4>
               <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="p-2 hover:bg-bg rounded-xl transition-colors text-muted"><MoreVertical size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-bg/10 space-y-4">
           {messages.map((m) => (
             <div key={m.id} className={cn("flex flex-col max-w-[70%]", m.isMe ? "ml-auto items-end" : "items-start")}>
                <div className={cn(
                  "p-4 rounded-3xl text-sm leading-relaxed shadow-sm",
                  m.isMe ? "bg-wine text-white rounded-tr-none" : "bg-white border border-black/5 rounded-tl-none"
                )}>
                  {m.content}
                </div>
                <span className="text-[9px] uppercase font-bold text-muted mt-1.5 px-2">{m.time}</span>
             </div>
           ))}
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-black/5 flex items-center gap-3">
           <button type="button" className="p-2 text-muted hover:text-wine transition-colors"><Paperclip size={20} /></button>
           <input 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Type a message..." 
             className="flex-1 px-4 py-3 bg-secondary rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-wine/10 transition-all font-sans"
           />
           <button 
             type="submit"
             disabled={!input.trim()}
             className="w-12 h-12 rounded-2xl bg-wine-grad text-white shadow-glow flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
           >
             <Send size={20} />
           </button>
        </form>
      </main>
    </div>
  );
}
