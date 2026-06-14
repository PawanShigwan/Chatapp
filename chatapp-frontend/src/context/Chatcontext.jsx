import { createContext, useContext, useState } from "react";

const Chatcontext=createContext();

export const Chatprovider=({children})=>{
    const [roomId,setRoomid]=useState("");
    const [roomname,setRoomname]=useState("");
    const [currentUser,setcurrentUser]=useState("");
    const [connected,setConnected]=useState(false);

    return (
        <Chatcontext.Provider
        value={{roomId,currentUser,connected,roomname,setRoomname,setRoomid,setcurrentUser,setConnected}}>
            {children}
        </Chatcontext.Provider>
    );
};

const useChatcontext=()=>useContext(Chatcontext);
export default useChatcontext;