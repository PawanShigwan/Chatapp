import React, { useEffect, useRef, useState } from "react";
import useChatcontext from "../context/Chatcontext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseURL } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getmessages } from "../services/Roomservice";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Send, LogOut, Hash } from "lucide-react";

const Chatpage = () => {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 60000); // update every minute

        return () => clearInterval(interval);
    }, []);

    const { roomId, currentUser, connected, roomname, setRoomid, setcurrentUser, setConnected } =
        useChatcontext();

    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [stompClient, setStompClient] = useState(null);

    const bottomRef = useRef(null);

    useEffect(() => {
        if (!connected || !roomId) {
            navigate("/");
        }
    }, [connected, roomId, navigate]);

    useEffect(() => {
        if (!connected || !roomId) return;
        getmessages(roomId)
            .then(setMessages)
            .catch(() => toast.error("Failed to load messages"));
    }, [roomId, connected]);

    useEffect(() => {
        if (!connected || !roomId) return;
        
        // Pass a factory function to Stomp.over as required by newer stompjs versions
        const client = Stomp.over(() => new SockJS(`${baseURL}/chat`));

        client.connect({}, () => {
            setStompClient(client);
            client.subscribe(`/topic/room/${roomId}`, (msg) => {
                setMessages((prev) => [...prev, JSON.parse(msg.body)]);
            });
        });

        return () => {
            if (client) client.disconnect();
        };
    }, [roomId, connected]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim() || !stompClient) return;

        // Use publish() which is the modern STOMP standard in stompjs
        stompClient.publish({
            destination: `/app/sendMessage/${roomId}`, 
            body: JSON.stringify({
                sender: currentUser,
                content: input,
                roomId,
            })
        });
        setInput("");
    };

    const leaveRoom = () => {
        stompClient?.disconnect();
        setConnected(false);
        setRoomid("");
        setcurrentUser("");
        navigate("/");
    };

    const timeAgo = (timestamp) => {
        if (!timestamp) return "";

        const diff = Math.floor((now - new Date(timestamp)) / 1000);

        if (diff < 60) return "Just now";
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    };

    return (
        <div className="h-screen flex flex-col bg-slate-950 text-white">

            {/* HEADER */}
            <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                            <Hash size={18} />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{roomname}</CardTitle>
                            <p className="text-xs text-slate-400">Live chat room</p>
                        </div>
                    </div>

                    <Button variant="destructive" size="sm" onClick={leaveRoom}>
                        <LogOut className="w-4 h-4 mr-1" /> Leave
                    </Button>
                </div>
            </header>

            {/* MESSAGES */}
            <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((msg, i) => {
                    const isMe = msg.sender === currentUser;

                    return (
                        <div
                            key={i}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                        >
                            <div className="flex items-end gap-2 max-w-[75%]">
                                {!isMe && (
                                    <Avatar className="h-7 w-7">
                                        <AvatarImage src={`https://avatar.iran.liara.run/public/${i}`} />
                                    </Avatar>
                                )}

                                <div
                                    className={`relative rounded-2xl px-4 py-2 text-sm leading-relaxed ${isMe
                                            ? "bg-indigo-600 text-white"
                                            : "bg-slate-800 text-slate-100"
                                        }`}
                                >
                                    {!isMe && (
                                        <p className="text-xs font-semibold text-indigo-300 mb-1">
                                            {msg.sender}
                                        </p>
                                    )}

                                    <p className="pr-10">{msg.content}</p>

                                    {/* REAL-TIME TIME (SENDER ONLY) */}
                                    {isMe && (
                                        <span className="absolute bottom-1 right-2 text-[10px] text-indigo-200/70">
                                            {timeAgo(msg.timeStamp)} {/* Fix: was msg.timestamp — Java field is timeStamp */}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </main>


            {/* INPUT */}
            <footer className="sticky bottom-0 border-t border-slate-800 bg-slate-900/80 backdrop-blur p-4">
                <div className="flex gap-3">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type a message…"
                        className="bg-slate-800 border-slate-700"
                    />
                    <Button onClick={sendMessage}>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default Chatpage;
