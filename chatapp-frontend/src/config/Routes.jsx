import React from "react";
import { Routes, Route } from "react-router";
import App from "../App";
import Chatpage from "../components/Chatpage";
import AuthPage from "../components/AuthPage";
import JoinCreateChat from "../components/JoinCreateChat";

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<JoinCreateChat />} />
                <Route path="/chat" element={<Chatpage />} />
                <Route path="/*" element={<h1>Error</h1>} />
            </Routes>
        </div>
    );
};
export default AppRoutes;